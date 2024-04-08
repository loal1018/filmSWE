/*
 * Copyright (C) 2024 - present Juergen Zimmermann, Hochschule Karlsruhe
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

// https://github.com/tonivj5/typeorm-naming-strategies/blob/master/src/snake-naming.strategy.ts
// https://gist.github.com/recurrence/b6a4cb04a8ddf42eda4e4be520921bd2

// eslint-disable-next-line max-classes-per-file
import { DefaultNamingStrategy, type NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils.js';

export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    override tableName(
        // eslint-disable-next-line unicorn/no-keyword-prefix
        className: string,
        userSpecifiedName: string | undefined,
    ) {
        return userSpecifiedName ?? snakeCase(className);
    }

    override columnName(
        propertyName: string,
        customName: string | undefined,
        embeddedPrefixes: string[],
    ) {
        return (
            snakeCase([...embeddedPrefixes, ''].join('_')) +
            (customName ?? snakeCase(propertyName))
        );
    }

    override relationName(propertyName: string) {
        return snakeCase(propertyName);
    }

    override joinColumnName(
        relationName: string,
        referencedColumnName: string,
    ) {
        return snakeCase(`${relationName}_${referencedColumnName}`);
    }

    // eslint-disable-next-line max-params
    override joinTableName(
        firstTableName: string,
        secondTableName: string,
        firstPropertyName: string,
        _: string,
    ) {
        return snakeCase(
            `${firstTableName}_${firstPropertyName.replaceAll(
                '.',
                '_',
            )}_${secondTableName}`,
        );
    }

    override joinTableColumnName(
        tableName: string,
        propertyName: string,
        columnName?: string,
    ) {
        return snakeCase(`${tableName}_${columnName ?? propertyName}`);
    }

    // eslint-disable-next-line unicorn/no-keyword-prefix
    classTableInheritanceParentColumnName(
        parentTableName: any,
        parentTableIdPropertyName: any,
    ) {
        return snakeCase(`${parentTableName}_${parentTableIdPropertyName}`);
    }

    eagerJoinRelationAlias(alias: string, propertyPath: string) {
        return `${alias}__${propertyPath.replace('.', '_')}`;
    }
}

// https://github.com/tonivj5/typeorm-naming-strategies/blob/master/src/snake-naming.strategy.ts
// https://github.com/typeorm/typeorm/blob/master/src/naming-strategy/DefaultNamingStrategy.ts
// https://github.com/typeorm/typeorm/blob/master/sample/sample12-custom-naming-strategy/naming-strategy/CustomNamingStrategy.ts
export class OracleNamingStrategy extends SnakeNamingStrategy {
    override tableName(targetName: string, userSpecifiedName: string): string {
        return super.tableName(targetName, userSpecifiedName).toUpperCase();
    }

    override columnName(
        propertyName: string,
        customName: string,
        embeddedPrefixes: string[],
    ) {
        return super
            .columnName(propertyName, customName, embeddedPrefixes)
            .toUpperCase();
    }

    override relationName(propertyName: string) {
        return super.relationName(propertyName).toUpperCase();
    }

    override joinColumnName(
        relationName: string,
        referencedColumnName: string,
    ) {
        return super
            .joinColumnName(relationName, referencedColumnName)
            .toUpperCase();
    }

    // eslint-disable-next-line max-params
    override joinTableName(
        firstTableName: string,
        secondTableName: string,
        firstPropertyName: string,
        secondPropertyName: string,
    ) {
        return super
            .joinTableName(
                firstTableName,
                secondTableName,
                firstPropertyName,
                secondPropertyName,
            )
            .toUpperCase();
    }

    override joinTableColumnName(
        tableName: string,
        propertyName: string,
        columnName?: string | undefined,
    ) {
        return super
            .joinTableColumnName(tableName, propertyName, columnName)
            .toUpperCase();
    }

    // eslint-disable-next-line unicorn/no-keyword-prefix
    override classTableInheritanceParentColumnName(
        parentTableName: any,
        parentTableIdPropertyName: any,
    ) {
        return super
            .classTableInheritanceParentColumnName(
                parentTableName,
                parentTableIdPropertyName,
            )
            .toUpperCase();
    }

    override eagerJoinRelationAlias(alias: string, propertyPath: string) {
        return super.eagerJoinRelationAlias(alias, propertyPath).toUpperCase();
    }
}
