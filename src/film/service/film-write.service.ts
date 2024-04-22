/**
 * Das Modul besteht aus der Klasse {@linkcode FilmWriteService} für die
 * Schreiboperationen im Anwendungskern.
 * @packageDocumentation
 */

import { type DeleteResult, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
    IsbnExistsException,
    VersionInvalidException,
    VersionOutdatedException,
} from './exceptions.js';
import { Abbildung } from '../entity/abbildung.entity.js';
import { Film } from '../entity/film.entity.js';
import { FilmReadService } from './film-read.service.js';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../../mail/mail.service.js';
import { Titel } from '../entity/titel.entity.js';
import { getLogger } from '../../logger/logger.js';

/** Typdefinitionen zum Aktualisieren eines Filmes mit `update`. */
export interface UpdateParams {
    /** ID des zu aktualisierenden Filmes. */
    readonly id: number | undefined;
    /** Film-Objekt mit den aktualisierten Werten. */
    readonly film: Film;
    /** Fassung für die aktualisierenden Werte. */
    readonly fassung: string;
}

/**
 * Die Klasse `filmWriteService` implementiert den Anwendungskern für das
 * Schreiben von Bücher und greift mit _TypeORM_ auf die DB zu.
 */
@Injectable()
export class FilmWriteService {
    private static readonly VERSION_PATTERN = /^"\d{1,3}"/u;

    readonly #repo: Repository<Film>;

    readonly #readService: FilmReadService;

    readonly #mailService: MailService;

    readonly #logger = getLogger(FilmWriteService.name);

    constructor(
        @InjectRepository(Film) repo: Repository<Film>,
        readService: FilmReadService,
        mailService: MailService,
    ) {
        this.#repo = repo;
        this.#readService = readService;
        this.#mailService = mailService;
    }

    /**
     * Ein neuer Film soll angelegt werden.
     * @param film Der neu abzulegende Film
     * @returns Die ID des neu angelegten Films
     * @throws IsbnExists falls die ISBN-Nummer bereits existiert
     */
    async create(film: Film): Promise<number> {
        this.#logger.debug('create: film=%o', film);
        await this.#validateCreate(film);

        const filmDb = await this.#repo.save(film); // implizite Transaktion
        this.#logger.debug('create: film=%o', filmDb);

        await this.#sendmail(filmDb);

        return filmDb.id!;
    }

    /**
     * Ein vorhandener Film soll aktualisiert werden. "Destructured" Argument
     * mit id (ID des zu aktualisierenden Films), film (zu aktualisierendes Film)
     * und fassung (Fassung für optimistische Synchronisation).
     * @returns Die neue Fassung gemäß optimistischer Synchronisation
     * @throws NotFoundException falls kein Film zur ID vorhanden ist
     * @throws VersionInvalidException falls die Fassung ungültig ist
     * @throws VersionOutdatedException falls die Fassung veraltet ist
     */
    // https://2ality.com/2015/01/es6-destructuring.html#simulating-named-parameters-in-javascript
    async update({ id, film, fassung }: UpdateParams): Promise<number> {
        this.#logger.debug(
            'update: id=%d, film=%o, fassung=%s',
            id,
            film,
            fassung,
        );
        if (id === undefined) {
            this.#logger.debug('update: Keine gueltige ID');
            throw new NotFoundException(`Es gibt kein Film mit der ID ${id}.`);
        }

        const validateResult = await this.#validateUpdate(film, id, fassung);
        this.#logger.debug('update: validateResult=%o', validateResult);
        if (!(validateResult instanceof Film)) {
            return validateResult;
        }

        const filmNeu = validateResult;
        const merged = this.#repo.merge(filmNeu, film);
        this.#logger.debug('update: merged=%o', merged);
        const updated = await this.#repo.save(merged); // implizite Transaktion
        this.#logger.debug('update: updated=%o', updated);

        return updated.fassung!;
    }

    /**
     * Ein Film wird asynchron anhand seiner ID gelöscht.
     *
     * @param id ID des zu löschenden Films
     * @returns true, falls der Film vorhanden war und gelöscht wurde. Sonst false.
     */
    async delete(id: number) {
        this.#logger.debug('delete: id=%d', id);
        const film = await this.#readService.findById({
            id,
            mitAbbildungen: true,
        });

        let deleteResult: DeleteResult | undefined;
        await this.#repo.manager.transaction(async (transactionalMgr) => {
            // Der Film zur gegebenen ID mit Titel und Abb. asynchron loeschen

            // TODO "cascade" funktioniert nicht beim Loeschen
            const titelId = film.titel?.id;
            if (titelId !== undefined) {
                await transactionalMgr.delete(Titel, titelId);
            }
            const abbildungen = film.abbildungen ?? [];
            for (const abbildung of abbildungen) {
                await transactionalMgr.delete(Abbildung, abbildung.id);
            }

            deleteResult = await transactionalMgr.delete(Film, id);
            this.#logger.debug('delete: deleteResult=%o', deleteResult);
        });

        return (
            deleteResult?.affected !== undefined &&
            deleteResult.affected !== null &&
            deleteResult.affected > 0
        );
    }

    async #validateCreate({ barcode }: Film): Promise<undefined> {
        this.#logger.debug('#validateCreate: isbn=%s', barcode);
        if (await this.#repo.existsBy({ barcode })) {
            throw new IsbnExistsException(barcode!);
        }
    }

    async #sendmail(film: Film) {
        const subject = `Neuer Film ${film.id}`;
        const titel = film.titel?.titel ?? 'N/A';
        const body = `Der Film mit dem Titel <strong>${titel}</strong> ist angelegt`;
        await this.#mailService.sendmail({ subject, body });
    }

    async #validateUpdate(
        film: Film,
        id: number,
        fassungStr: string,
    ): Promise<Film> {
        this.#logger.debug(
            '#validateUpdate: film=%o, id=%s, fassungStr=%s',
            film,
            id,
            fassungStr,
        );
        if (!FilmWriteService.VERSION_PATTERN.test(fassungStr)) {
            throw new VersionInvalidException(fassungStr);
        }

        const fassung = Number.parseInt(fassungStr.slice(1, -1), 10);
        this.#logger.debug(
            '#validateUpdate: film=%o, fassung=%d',
            film,
            fassung,
        );

        const filmDb = await this.#readService.findById({ id });

        // nullish coalescing
        const fassungDb = filmDb.fassung!;
        if (fassung < fassungDb) {
            this.#logger.debug('#validateUpdate: fassungDb=%d', fassung);
            throw new VersionOutdatedException(fassung);
        }
        this.#logger.debug('#validateUpdate: filmDb=%o', filmDb);
        return filmDb;
    }
}
