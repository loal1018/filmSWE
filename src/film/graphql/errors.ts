/*
 * Copyright (C) 2023 - present Juergen Zimmermann, Hochschule Karlsruhe
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
 * Das Modul besteht aus den Klassen für die Fehlerbehandlung bei GraphQL.
 * @packageDocumentation
 */

import { GraphQLError } from 'graphql';

// https://www.apollographql.com/docs/apollo-server/data/errors
/**
 * Error-Klasse für GraphQL, die einen Response mit `errors` und
 * code `BAD_USER_INPUT` produziert.
 */
export class BadUserInputError extends GraphQLError {
    // eslint-disable-next-line unicorn/custom-error-definition
    constructor(message: string, exception?: Error) {
        super(message, {
            originalError: exception,
            extensions: {
                // https://www.apollographql.com/docs/apollo-server/data/errors/#bad_user_input
                code: 'BAD_USER_INPUT',
            },
        });
    }
}
