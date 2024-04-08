# TODOs

## ESM

- module:

  - https://stackoverflow.com/questions/63742790/unable-to-import-esm-ts-module-in-node
  - package.json: `"type": "module",`
  - tsconfig.json: `"module": "ESNext"

- `__dirname` https://stackoverflow.com/questions/64383909/dirname-is-not-defined-in-node-14-version#answer-64383997

  - src\app.ts
  - src\shared\config\jwt.ts
  - src\shared\config\node.ts
  - src\shared\db\populateDB.ts

- Top-level await statt IIFE
  - src\server.ts
  - src\shared\db\mongoDB.ts
  - src\buch\rest\buch-file.request-handler.ts
- Jest
  - https://jestjs.io/docs/ecmascript-modules
  - ts-jest
