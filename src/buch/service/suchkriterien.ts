/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
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
 * Das Modul besteht aus der Klasse {@linkcode FilmReadService}.
 * @packageDocumentation
 */

import { type FilmArt } from './../entity/film.entity.js';

/**
 * Typdefinition für `FilmReadService.find()`und `QueryBuilder.build()`
 */
export interface Suchkriterien {
    readonly barcode?: string;
    readonly rating?: number;
    readonly filmart?: FilmArt;
    readonly preis?: number;
    readonly rabatt?: number;
    readonly release?: string;
    readonly dvd?: string;
    readonly bluray?: string;
    readonly titel?: string;
}
