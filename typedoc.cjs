// https://typedoc.org/guides/options
/* global module */
/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
    out: '.extras/doc/api',
    entryPoints: ['src'],
    entryPointStrategy: 'expand',
    excludePrivate: true,
    validation: {
        invalidLink: true,
    },
};
