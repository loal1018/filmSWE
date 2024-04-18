
/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Florian Goebel, Hochschule Karlsruhe
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

// Nest unterstützt verschiedene Werkzeuge fuer OR-Mapping
// https://docs.nestjs.com/techniques/database
//  * TypeORM     https://typeorm.io
//  * Sequelize   https://sequelize.org
//  * Knex        https://knexjs.org

// TypeORM unterstützt die Patterns
//  * "Data Mapper" und orientiert sich an Hibernate (Java), Doctrine (PHP) und Entity Framework (C#)
//  * "Active Record" und orientiert sich an Mongoose (JavaScript)

// TypeORM unterstützt u.a. die DB-Systeme
//  * Postgres
//  * MySQL
//  * SQLite durch sqlite3 und better-sqlite3
//  * Oracle
//  * Microsoft SQL Server
//  * SAP Hana
//  * Cloud Spanner von Google

/**
 * Das Modul besteht aus der Entity-Klasse.
 * @packageDocumentation
 */

import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import { Abbildung } from './abbildung.entity.js';
import { ApiProperty } from '@nestjs/swagger';
import { DecimalTransformer } from './decimal-transformer.js';
import { Titel } from './titel.entity.js';
import { dbType } from '../../config/db.js';

/**
 * Alias-Typ für gültige Strings bei der Art eines Buches.
 */
export type FilmArt = 'DVD' | 'BLUERAY';

/**
 * Entity-Klasse zu einem relationalen Tabelle
 */
// https://typeorm.io/entities
@Entity()
export class Film {
    // https://typeorm.io/entities#primary-columns
    // default: strategy = 'increment' (SEQUENCE, GENERATED ALWAYS AS IDENTITY, AUTO_INCREMENT)
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @VersionColumn()
    readonly fassung: number | undefined;

    @Column()
    @ApiProperty({ example: '4-011470212981', type: String })
    readonly barcode!: string;

    @Column('int')
    @ApiProperty({ example: 5, type: Number })
    readonly rating: number | undefined;

    @Column('varchar')
    @ApiProperty({ example: 'BLUERAY', type: String })
    readonly filmart: FilmArt | undefined;

    @Column('decimal', {
        precision: 8,
        scale: 2,
        transformer: new DecimalTransformer(),
    })
    @ApiProperty({ example: 1, type: Number })
    // statt number ggf. Decimal aus decimal.js analog zu BigDecimal von Java
    readonly preis!: number;

    @Column('decimal', {
        precision: 4,
        scale: 3,
        transformer: new DecimalTransformer(),
    })

    @Column('date')
    @ApiProperty({ example: '2021-01-31' })
    // TypeORM unterstuetzt *NICHT* das Temporal-API (ES2022)
    readonly release: Date | string | undefined;

    // https://typeorm.io/entities#simple-array-column-type
    // nicht "readonly": null ersetzen durch []
    @Column('simple-array')
    genre: string[] | null | undefined;

    // undefined wegen Updates
    @OneToOne(() => Titel, (titel) => titel.film, {
        cascade: ['insert', 'remove'],
    })
    readonly titel: Titel | undefined;

    // undefined wegen Updates
    @OneToMany(() => Abbildung, (abbildung) => abbildung.film, {
        cascade: ['insert', 'remove'],
    })
    readonly abbildungen: Abbildung[] | undefined;

    // https://typeorm.io/entities#special-columns
    // https://typeorm.io/entities#column-types-for-postgres
    // https://typeorm.io/entities#column-types-for-mysql--mariadb
    // https://typeorm.io/entities#column-types-for-oracle
    // https://typeorm.io/entities#column-types-for-sqlite--cordova--react-native--expo
    @CreateDateColumn({
        type: dbType === 'sqlite' ? 'datetime' : 'timestamp',
    })
    readonly erzeugt: Date | undefined;

    @UpdateDateColumn({
        type: dbType === 'sqlite' ? 'datetime' : 'timestamp',
    })
    readonly aktualisiert: Date | undefined;

    public toString = (): string =>
        JSON.stringify({
            id: this.id,
            fassung: this.fassung,
            barcode: this.barcode,
            rating: this.rating,
            filmart: this.filmart,
            preis: this.preis,
            release: this.release,
            genre: this.genre,
            erzeugt: this.erzeugt,
            aktualisiert: this.aktualisiert,
        });
}
