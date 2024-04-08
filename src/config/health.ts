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

/**
 * Das Modul enthält die Konfigurations-Information für Health.
 * @packageDocumentation
 */

import { config } from './app.js';
import { loggerDefaultValue } from './logger.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const prettyPrint: string | undefined = config.health?.prettyPrint;

/**
 * Das Konfigurationsobjekt für Health.
 */
// "as const" fuer readonly
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
export const healthConfig = {
    prettyPrint:
        prettyPrint !== undefined && prettyPrint.toLowerCase() === 'true',
} as const;

if (!loggerDefaultValue) {
    console.debug('healthConfig: %o', healthConfig);
}
