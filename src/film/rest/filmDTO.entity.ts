/* eslint-disable max-classes-per-file */
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

/**
 * Das Modul besteht aus der Entity-Klasse.
 * @packageDocumentation
 */

import {
    IsArray,
    IsISO8601,
    IsInt,
    IsOptional,
    IsPositive,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';
import { AbbildungDTO } from './abbildungDTO.entity.js';
import { ApiProperty } from '@nestjs/swagger';
import { type FilmArt } from '../entity/film.entity.js';
import { TitelDTO } from './titelDTO.entity.js';
import { Type } from 'class-transformer';

export const MAX_RATING = 5;

/**
 * Entity-Klasse für Bücher ohne TypeORM und ohne Referenzen.
 */
export class FilmDtoOhneRef {
    @IsInt()
    @Min(0)
    @Max(MAX_RATING)
    @ApiProperty({ example: 5, type: Number })
    readonly rating: number | undefined;

    @IsPositive()
    @ApiProperty({ example: 1, type: Number })
    // statt number ggf. Decimal aus decimal.js analog zu BigDecimal von Java
    readonly preis!: number;

    @IsOptional()
    @ApiProperty({ example: '1234567890000', type: String })
    readonly barcode!: string;

    @Min(1)
    @ApiProperty({ example: 1, type: Number })
    readonly fassung: number | undefined;

    @IsOptional()
    @ApiProperty({ example: 'Horror', type: String })
    readonly genre: string[] | undefined;

    @IsOptional()
    @ApiProperty({ example: 'BLUERAY', type: String })
    readonly filmart: FilmArt | undefined;

    @IsISO8601({ strict: true })
    @IsOptional()
    @ApiProperty({ example: '2021-01-31' })
    readonly release: Date | string | undefined;
}

/**
 * Entity-Klasse für Filme ohne TypeORM.
 */
export class FilmDTO extends FilmDtoOhneRef {
    @ValidateNested()
    @Type(() => TitelDTO)
    @ApiProperty({ type: TitelDTO })
    readonly titel!: TitelDTO; // NOSONAR

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AbbildungDTO)
    @ApiProperty({ type: [AbbildungDTO] })
    readonly abbildungen: AbbildungDTO[] | undefined;

    // AbbildungDTO
}
/* eslint-enable max-classes-per-file */
