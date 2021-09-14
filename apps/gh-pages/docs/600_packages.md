# Packages

## Implementations

Yoda comes in different flavours depending on your use case:

- [ ] __yoda-browser__: yoda in a modern browser
  - [Browser compatibility](https://iwanttouse.com/#indexeddb,websockets): 98,39%
  - Compact (< 20KB minified and gzipped, including dependencies). In comparison the minimum PouchDB instance takes at least 70 KB. Do not rely to much on this bold comparison since both tools do not have feature parity.
  - Small set of widely used third-party dependencies (17.7 KB):
    - Storage: [indexeddb](https://www.npmjs.com/package/idb) (1.3 KB)
    - Data compression: [fflate](https://www.npmjs.com/package/fflate) (8 KB)
    - Unique identifiers: [ulidx](https://www.npmjs.com/package/ulidx) (2.3 KB)
    - Event sourcing: [deep-object-diff](https://www.npmjs.com/package/deep-object-diff) (1 KB), [serialize-javascript](https://www.npmjs.com/package/serialize-javascript) (1.8 KB) and [deepmerge](https://www.npmjs.com/package/deepmerge) (0.5 KB)
    - Web-sockets: [isomorphic-ws](https://www.npmjs.com/package/isomorphic-ws) (1 KB)
    - Event emitting: [emittery](https://www.npmjs.com/package/emittery) (1.8 KB)
- [ ] __yoda-node__: an implementation for standalone server instances. Backed by [leveldb](https://www.npmjs.com/package/level) and the filesystem
- [ ] __yoda-aws__: a cost-efficient serverless implementation using AWS cloud services (dynamodb and S3 for storage, API Gateway for networking and Lambda for computing)

## Adapters

Yoda uses adapters to abstract storage management from the core:

- [ ] __yoda-db-idb__: indexeddb adapter for documents storage
- [ ] __yoda-db-level__: leveldown adapter for documents storage
- [ ] __yoda-db-dynamodb__: dynamodb adapter for documents storage
- [ ] __yoda-att-idb__: indexeddb adapter for attachments storage
- [ ] __yoda-att-fs__: node.js fs adapter for attachments storage
- [ ] __yoda-att-s3__: s3 adapter for attachments storage

## Plugins

You can extend Yoda's feature set with additional plugins:

- [ ] __yoda-query__: structured querying for yoda. Provided as a plugin since it may not be used in every context.
- [ ] __yoda-encryption__: documents and attachment encryption at rest.
- [ ] __yoda-geo__: creating, managing and searching geo-indexes.
- [ ] __yoda-ts-schemas__: advanced data validation and schema versioning. This is a convenience package that wraps [zod](https://www.npmjs.com/package/zod), the typescript schema validator.
- [ ] __yoda-http-router__: interact with a yoda instance in a classic client-server way, through an http router. The router can be used with any node.js HTTP server framework that supports Connect/Express middleware (Connect, Express, NextJS). Useful for server to server communication or server-side features.
