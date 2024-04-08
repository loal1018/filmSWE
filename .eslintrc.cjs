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
// https://eslint.org/docs/user-guide/configuring
// https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new
// https://eslint.org/blog/2022/08/new-config-system-part-2
// https://stackoverflow.com/questions/74237042/how-to-correctly-configure-the-parser-plugins-with-eslints-new-flat-config

const stylistic = require('@stylistic/eslint-plugin');
// https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
const customizedStylistic = stylistic.configs.customize({
    flat: false,
    indent: 4,
    jsx: false,
});
// console.log(`customizedStylistic.rules=${JSON.stringify(customizedStylistic.rules)}`);

module.exports = {
    root: true,
    // https://eslint.org/docs/latest/use/configure/language-options#specifying-environments
    env: {
        node: true,
        es2022: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    // https://eslint.org/docs/latest/use/configure/language-options#specifying-parser-options
    parserOptions: {
        // https://typescript-eslint.io/blog/parser-options-project-true
        project: true,
        ecmaVersion: '2022',
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true,
        },
    },

    plugins: [
        '@typescript-eslint',
        'unicorn',
        'sonarjs',
        'prettier',
        'promise',
        'security',
        'security-node',
        'prefer-arrow',
        'regexp',
        '@stylistic',
        'jest',
        'jest-formatting',
    ],

    extends: [
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-type-checked.ts
        // TODO https://github.com/typescript-eslint/typescript-eslint/issues/5908
        // TODO https://github.com/typescript-eslint/typescript-eslint/issues/5938
        // TODO https://github.com/jest-community/eslint-plugin-jest/issues/1408
        // TODO https://github.com/microsoft/vscode-eslint/blob/747efb780e024eabc48b67ca68a2f8a0c594b753/playgrounds/flatConfig/eslint.config.js
        // TODO https://stackoverflow.com/questions/74237042/how-to-correctly-configure-the-parser-plugins-with-eslints-new-flat-config
        'plugin:@typescript-eslint/recommended-type-checked',
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic-type-checked.ts
        'plugin:@typescript-eslint/stylistic-type-checked',
        // https://eslint.org/docs/latest/rules
        // https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js
        'eslint:recommended',
        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/configs/recommended.js
        'plugin:unicorn/recommended',
        // prettier ueberschreibt vorherige Konfigurationseinstellungen
        'plugin:prettier/recommended',
        // https://github.com/SonarSource/eslint-plugin-sonarjs
        // https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/src/index.ts
        'plugin:sonarjs/recommended',
        // https://github.com/eslint-community/eslint-plugin-promise#rules
        'plugin:n/recommended',
        // https://github.com/eslint-community/eslint-plugin-promise#rules
        'plugin:promise/recommended',
        // https://github.com/eslint-community/eslint-plugin-security#eslintrc-config-deprecated
        'plugin:security/recommended-legacy',
        'plugin:security-node/recommended',
        // https://github.com/import-js/eslint-plugin/import/tree/main/config
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        // https://github.com/eslint-community/eslint-plugin-eslint-comments/blob/main/lib/configs/recommended.js
        'plugin:@eslint-community/eslint-comments/recommended',
        // https://github.com/ota-meshi/eslint-plugin-regexp/blob/master/lib/configs/recommended.ts
        'plugin:regexp/recommended',
        // https://eslint.style/guide/config-presets
        // https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
        // 'plugin:@stylistic/recommended-extends',
        // https://github.com/jest-community/eslint-plugin-jest/blob/main/README.md#rules
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-formatting/strict',
    ],

    // https://eslint.org/docs/latest/use/configure/rules#using-configuration-files
    rules: {
        '@eslint-community/eslint-comments/no-unused-disable': 'error',

        // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin#supported-rules
        // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-type-checked.ts
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic-type-checked.ts
        '@typescript-eslint/array-type': ['error', { default: 'array'}],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/method-signature-style': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['camelCase'],
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE'],
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'classProperty',
                modifiers: ['static', 'readonly'],
                format: ['UPPER_CASE'],
                leadingUnderscore: 'allowDouble',
            },
            {
                selector: 'objectLiteralProperty',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
        ],
        '@typescript-eslint/no-base-to-string': ['error', {
            ignoredTypeNames: ['RegExp', 'boolean']
        }],
        '@typescript-eslint/no-confusing-void-expression': ['error', {
            ignoreArrowShorthand: true
        }],
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-empty-function': ['error', {
            allow: ['arrowFunctions'],
        }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': ['error', {
            ignoreIIFE: true
        }],
        '@typescript-eslint/no-invalid-this': 'error',
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-loop-func': 'error',
        '@typescript-eslint/no-magic-numbers': ['error', {
            ignoreReadonlyClassProperties: true,
            ignoreArrayIndexes: true,
            enforceConst: true,
            ignore: [0, 1, -1],
        }],
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-misused-promises': ['error', {
            checksVoidReturn: false,
        }],
        '@typescript-eslint/no-mixed-enums': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-throw-literal': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': ['error', {
            allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: true,
        }],
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-unary-minus': 'error',
        //'@typescript-eslint/no-untyped-public-signature': 'error',
        '@typescript-eslint/no-unused-vars': ['off', {
            ignoreRestSiblings: true,
        }],
        '@typescript-eslint/no-use-before-define': ['error', {
            functions: false,
            classes: false,
            typedefs: false,
        }],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@typescript-eslint/prefer-destructuring': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-find': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        //'@typescript-eslint/prefer-readonly-parameter-types': ['error', {
        //    checkParameterProperties: true,
        //}],
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/restrict-plus-operands': ['error', {
            skipCompoundAssignments: false,
        }],
        '@typescript-eslint/restrict-template-expressions': ['error', {
            allowNumber: true,
            allowBoolean: true,
            allowNullish: true,
        }],
        '@typescript-eslint/return-await': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': ['error', {
            allowDefaultCaseForExhaustiveSwitch: false,
            requireDefaultForNonUnion: true,
        }],
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unbound-method': ['error', {
            ignoreStatic: true,
        }],
        '@typescript-eslint/unified-signatures': 'error',

        // https://github.com/import-js/eslint-plugin-import/tree/main/docs/rules
        'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
        'import/no-cycle': ['error', {
            maxDepth: 4,
            ignoreExternal: true,
        }],
        'import/no-empty-named-blocks': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/no-unresolved': 'off',

        // https://github.com/jest-community/eslint-plugin-jest/blob/main/src/index.ts
        'jest/no-conditional-in-test': 'error',
        'jest/consistent-test-it':['error', {
          fn: 'test',
          withinDescribe: 'test',
        }],
        //'jest/max-expects': 'error',
        'jest/no-conditional-expect': 'off',
        'jest/no-duplicate-hooks': 'error',
        'jest/no-restricted-matchers': 'error',
        'jest/no-standalone-expect': 'off',
        'jest/no-test-return-statement': 'error',
        'jest/prefer-comparison-matcher': 'error',
        'jest/prefer-equality-matcher': 'error',
        'jest/prefer-expect-resolves': 'error',
        'jest/prefer-hooks-in-order': 'error',
        'jest/prefer-hooks-on-top': 'error',
        'jest/prefer-mock-promise-shorthand': 'error',
        'jest/prefer-snapshot-hint': 'error',
        'jest/prefer-to-be': 'error',
        'jest/prefer-todo': 'error',
        'jest/require-top-level-describe': 'error',
        'jest/valid-expect': 'off',

        // https://github.com/weiran-zsd/eslint-plugin-node/blob/master/lib/configs/_commons.js
        'n/callback-return': 'error',
        'n/exports-style': 'error',
        'n/file-extension-in-import': 'off',
        'n/global-require': 'error',
        'n/handle-callback-err': 'error',
        'n/no-callback-literal': 'error',
        'n/no-missing-import': 'off',
        'n/no-mixed-requires': 'error',
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        'n/no-process-env': 'error',
        'n/no-process-exit': 'error',
        'n/no-sync': ['error', {
            allowAtRootLevel: true,
        }],
        'n/prefer-global/buffer': 'error',
        'n/prefer-global/console': 'error',
        'n/prefer-global/process': ['error', 'never'],
        'n/prefer-global/text-decoder': 'error',
        'n/prefer-global/text-encoder': 'error',
        'n/prefer-global/url': 'error',
        'n/prefer-global/url-search-params': 'error',
        'n/prefer-promises/dns': 'error',
        'n/prefer-promises/fs': 'error',

        'prefer-arrow/prefer-arrow-functions': ['error', {
            classPropertiesAllowed: false,
        }],

        'promise/no-multiple-resolved': 'error',

        'regexp/no-extra-lookaround-assertions': 'error',
        'regexp/no-misleading-capturing-group': 'error',
        'regexp/no-missing-g-flag': 'error',
        'regexp/prefer-regexp-exec': 'error',

        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/configs/recommended.js
        'unicorn/catch-error-name': ['error', {
            name: 'err'
        }],
        'unicorn/consistent-function-scoping': 'error',
        'unicorn/custom-error-definition': 'error',
        'unicorn/filename-case': 'off',
        'unicorn/import-style': ['error', {
            styles: {
                path: {
                    named: true,
                },
            },
        }],
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-keyword-prefix': 'error',
        'unicorn/no-negated-condition': 'error',
        'unicorn/no-nested-ternary': 'error',
        'unicorn/no-object-as-default-parameter': 'error',
        'unicorn/no-process-exit': 'off',
        'unicorn/no-static-only-class': 'error',
        'unicorn/no-unsafe-regex': 'error',
        'unicorn/no-unused-properties': 'error',
        'unicorn/numeric-separators-style': 'error',
        'unicorn/prefer-array-find': 'error',
        'unicorn/prefer-array-flat': 'error',
        'unicorn/prefer-flat-map': 'error',
        'unicorn/prefer-module': 'error',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-replace-all': 'error',
        'unicorn/prefer-switch': 'error',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/string-content': 'error',

        // https://eslint.org/docs/rules
        // https://github.com/prettier/eslint-config-prettier#arrow-body-style-and-prefer-arrow-callback
        // https://eslint.org/docs/rules/arrow-body-style
        'arrow-body-style': ['error', 'as-needed'],
        'block-scoped-var': 'error',
        'camelcase': 'error',
        'consistent-this': 'error',
        // https://github.com/prettier/eslint-config-prettier#curly
        // https://eslint.org/docs/rules/curly
        'curly': ['error', 'all'],
        'default-case-last': 'error',
        'default-param-last': 'error',
        // siehe @typescript-eslint/dot-notation
        'dot-notation': 'off',
        'eqeqeq': 'error',
        'for-direction': 'error',
        'func-name-matching': 'error',
        'func-names': ['error', 'never'],
        'func-style': 'error',
        'getter-return': 'error',
        'grouped-accessor-pairs': 'error',
        'handle-callback-err': 'error',
        'logical-assignment-operators': 'error',
        'max-classes-per-file': 'error',
        'max-depth': 'error',
        'max-lines': 'error',
        'max-lines-per-function': ['error', {
            max: 60,
        }],
        'max-nested-callbacks': ['error', {
            max: 4,
        }],
        'max-params': 'error',
        'max-statements': ['error', {
            max: 25
        }],
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-buffer-constructor': 'error',
        'no-caller': 'error',
        'no-console': 'off',
        'no-constant-binary-expression': 'error',
        'no-constructor-return': 'error',
        'no-continue': 'error',
        // siehe import/no-duplicates
        //'no-duplicate-imports': 'error',
        'no-else-return': 'error',
        'no-empty-function': 'error',
        'no-empty-static-block': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        // siehe @typescript-eslint/no-invalid-this
        'no-invalid-this': 'off',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        // siehe @typescript-eslint/no-loss-of-precision
        'no-loss-of-precision': 'off',
        // siehe @typescript-eslint/no-magic-numbers
        'no-magic-numbers': 'off',
        'no-multi-assign': 'error',
        'no-negated-condition': 'error',
        'no-nested-ternary': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-new-object': 'error',
        'no-new-wrappers': 'error',
        'no-object-constructor': 'error',
        'no-param-reassign': 'error',
        'no-promise-executor-return': 'error',
        'no-proto': 'error',
        'no-redeclare': 'off',
        // siehe @typescript-eslint/no-restricted-imports
        'no-restricted-imports': 'off',
        'no-restricted-properties': 'error',
        // https://github.com/prettier/eslint-config-prettier#no-sequences
        'no-restricted-syntax': ['error', 'SequenceExpression'],
        'no-return-assign': 'error',
        // siehe @typescript-eslint/return-await
        'no-return-await': 'off',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        // siehe @typescript-eslint/no-shadow
        'no-shadow': 'off',
        'no-shadow-restricted-names': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-unreachable-loop': 'error',
        'no-unused-expressions': 'error',
        'no-unused-private-class-members': 'error',
        // siehe @typescript-eslint/no-unused-vars
        'no-unused-vars': 'off',
        'no-use-before-define': ['error', {
            functions: false,
            classes: false,
        }],
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-void': 'error',
        'no-with': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'operator-assignment': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-exponentiation-operator': 'error',
        'prefer-numeric-literals': 'error',
        'prefer-object-has-own': 'error',
        'prefer-object-spread': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': ['error', {
            disallowRedundantWrapping: true,
        }],
        'prefer-rest-params': 'error',
        'prefer-template': 'error',
        'radix': 'error',
        'require-atomic-updates': 'error',
        // siehe @typescript-eslint/require-await
        'require-await': 'off',
        'require-unicode-regexp': 'error',
        'sort-imports': 'error',
        'strict': 'error',
        'symbol-description': 'error',
        'yoda': ['error', 'never'],

        // https://eslint.style/rules
        // https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
        ...customizedStylistic.rules,
        '@stylistic/arrow-parens': ['error', 'always'],
        '@stylistic/brace-style': ['error', '1tbs'],
        '@stylistic/indent': 'off',
        '@stylistic/indent-binary-ops': 'off',
        '@stylistic/member-delimiter-style': ['error', {
            multiline: { delimiter: 'semi' },
        }],
        '@stylistic/operator-linebreak': 'off',
        '@stylistic/quote-props': ['error', 'as-needed'],
        '@stylistic/semi': ['error', 'always'],
    },
};
