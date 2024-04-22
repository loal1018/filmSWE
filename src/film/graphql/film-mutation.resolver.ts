/*
 * Copyright (C) 2021 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
// eslint-disable-next-line max-classes-per-file
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard, Roles } from 'nest-keycloak-connect';
import { IsInt, IsNumberString, Min } from 'class-validator';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { type Abbildung } from '../entity/abbildung.entity.js';
import { type Film } from '../entity/film.entity.js';
import { FilmDTO } from '../rest/filmDTO.entity.js';
import { FilmWriteService } from '../service/film-write.service.js';
import { HttpExceptionFilter } from './http-exception.filter.js';
import { type IdInput } from './film-query.resolver.js';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
import { type Titel } from '../entity/titel.entity.js';
import { getLogger } from '../../logger/logger.js';

// Authentifizierung und Autorisierung durch
//  GraphQL Shield
//      https://www.graphql-shield.com
//      https://github.com/maticzav/graphql-shield
//      https://github.com/nestjs/graphql/issues/92
//      https://github.com/maticzav/graphql-shield/issues/213
//  GraphQL AuthZ
//      https://github.com/AstrumU/graphql-authz
//      https://www.the-guild.dev/blog/graphql-authz

export interface CreatePayload {
    readonly id: number;
}

export interface UpdatePayload {
    readonly version: number;
}

export class FilmUpdateDTO extends FilmDTO {
    @IsNumberString()
    readonly id!: string;

    @IsInt()
    @Min(0)
    readonly version!: number;
}
@Resolver()
// alternativ: globale Aktivierung der Guards https://docs.nestjs.com/security/authorization#basic-rbac-implementation
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseTimeInterceptor)
export class FilmMutationResolver {
    readonly #service: FilmWriteService;

    readonly #logger = getLogger(FilmMutationResolver.name);

    constructor(service: FilmWriteService) {
        this.#service = service;
    }

    @Mutation()
    @Roles({ roles: ['admin', 'user'] })
    async create(@Args('input') filmDTO: FilmDTO) {
        this.#logger.debug('create: filmDTO=%o', filmDTO);

        const film = this.#filmDtoToFilm(filmDTO);
        const id = await this.#service.create(film);
        // TODO BadUserInputError
        this.#logger.debug('createFilm: id=%d', id);
        const payload: CreatePayload = { id };
        return payload;
    }

    @Mutation()
    @Roles({ roles: ['admin', 'user'] })
    async update(@Args('input') filmDTO: FilmUpdateDTO) {
        this.#logger.debug('update: film=%o', filmDTO);

        const film = this.#filmUpdateDtoToFilm(filmDTO);
        const fassungStr = `"${filmDTO.version.toString()}"`;

        const versionResult = await this.#service.update({
            id: Number.parseInt(filmDTO.id, 10),
            film,
            fassung: fassungStr,
        });
        // TODO BadUserInputError
        this.#logger.debug('updateFilm: versionResult=%d', versionResult);
        const payload: UpdatePayload = { version: versionResult };
        return payload;
    }

    @Mutation()
    @Roles({ roles: ['admin'] })
    async delete(@Args() id: IdInput) {
        const idStr = id.id;
        this.#logger.debug('delete: id=%s', idStr);
        const deletePerformed = await this.#service.delete(idStr);
        this.#logger.debug('deleteFilm: deletePerformed=%s', deletePerformed);
        return deletePerformed;
    }

    #filmDtoToFilm(filmDTO: FilmDTO): Film {
        const titelDTO = filmDTO.titel;
        const titel: Titel = {
            id: undefined,
            titel: titelDTO.titel,
            untertitel: titelDTO.untertitel,
            film: undefined,
        };
        const abbildungen = filmDTO.abbildungen?.map((abbildungDTO) => {
            const abbildung: Abbildung = {
                id: undefined,
                beschriftung: abbildungDTO.beschriftung,
                contentType: abbildungDTO.contentType,
                film: undefined,
            };
            return abbildung;
        });
        const film: Film = {
            id: undefined,
            fassung: undefined,
            barcode: filmDTO.barcode,
            rating: filmDTO.rating,
            preis: filmDTO.preis,
            genre: filmDTO.genre,
            filmart: filmDTO.filmart,
            release: filmDTO.release,
            titel,
            abbildungen,
            erzeugt: new Date(),
            aktualisiert: new Date(),
        };

        // Rueckwaertsverweis
        film.titel!.film = film;
        return film;
    }

    #filmUpdateDtoToFilm(filmDTO: FilmUpdateDTO): Film {
        return {
            id: undefined,
            fassung: undefined,
            barcode: filmDTO.barcode,
            rating: filmDTO.rating,
            preis: filmDTO.preis,
            genre: filmDTO.genre,
            filmart: filmDTO.filmart,
            release: filmDTO.release,
            titel: undefined,
            abbildungen: undefined,
            erzeugt: undefined,
            aktualisiert: new Date(),
        };
    }

    // #errorMsgCreateFilm(err: CreateError) {
    //     switch (err.type) {
    //         case 'IsbnExists': {
    //             return `Die ISBN ${err.isbn} existiert bereits`;
    //         }
    //         default: {
    //             return 'Unbekannter Fehler';
    //         }
    //     }
    // }

    // #errorMsgUpdateFilm(err: UpdateError) {
    //     switch (err.type) {
    //         case 'FilmNotExists': {
    //             return `Es gibt kein Film mit der ID ${err.id}`;
    //         }
    //         case 'VersionInvalid': {
    //             return `"${err.version}" ist keine gueltige Versionsnummer`;
    //         }
    //         case 'VersionOutdated': {
    //             return `Die Versionsnummer "${err.version}" ist nicht mehr aktuell`;
    //         }
    //         default: {
    //             return 'Unbekannter Fehler';
    //         }
    //     }
    // }
}
