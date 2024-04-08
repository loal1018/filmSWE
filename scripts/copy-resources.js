/*
 * Copyright (C) 2017 - present Juergen Zimmermann, Hochschule Karlsruhe
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
import fs from 'node:fs';
import path from 'node:path';

const { cpSync, existsSync, mkdirSync } = fs;
const { join } = path

// BEACHTE: "assets" innerhalb von nest-cli.json werden bei "--watch" NICHT beruecksichtigt
// https://docs.nestjs.com/cli/monorepo#global-compiler-options

const src = 'src';
const dist = 'dist';
if (!existsSync(dist)) {
    mkdirSync(dist);
}

// DB-Skripte, PEM-Dateien fuer TLS und GraphQL-Schema kopieren
const resourcesSrc = join(src, 'config', 'resources');
const resourcesDist = join(dist, src, 'config', 'resources');
mkdirSync(resourcesDist, { recursive: true });
cpSync(resourcesSrc, resourcesDist, { recursive: true });
