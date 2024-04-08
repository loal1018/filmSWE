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

import fs from 'node:fs'
import path from 'node:path';
import rehypeSlug from 'rehype-slug';
// Syntaxbaum (AST) "hast" in einen String konvertieren
import rehypeStringify from 'rehype-stringify'
// Markdown einlesen und in einen Syntaxbaum (AST) transformieren -> "mdast"
import remarkParse from 'remark-parse'
// Linter fuer Konsistenz in der Markdown-Datei
import remarkPresetLintConsistent from 'remark-preset-lint-consistent'
// Empfehlungen, u.a. keine Hersteller-spezifischen ("vendor") Features
import remarkPresetLintRecommended from 'remark-preset-lint-recommended'
// Style Guide fuer Markdown einhalten
import remarkPresetLintMarkdownStyleGuide from 'remark-preset-lint-markdown-style-guide'
// vom Markdown Ecosystem "remark" in das HTML Ecosystem "rehype" wechseln: "mdast" -> "hast"
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const filename = 'ReadMe';
// const filename = 'Installationsanleitung';
const readme = fs.readFileSync(`${filename}.md`).toString();

const htmlFile = await unified()
    .use(remarkParse)
    .use(remarkPresetLintConsistent)
    .use(remarkPresetLintRecommended)
    .use(remarkPresetLintMarkdownStyleGuide)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(readme);

fs.writeFileSync(
    path.join('.extras','doc', `${filename}.html`),
    String(htmlFile),
);
