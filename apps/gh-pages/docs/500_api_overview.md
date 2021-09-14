# API overview

Event sourcing and events graphs deal with storage and synchronization.

But as developers, we mostly care for the ability to edit, query and show our data in interesting and useful ways. We want to slice and dice and access our data in many different patterns. What is needed is a way to edit, filter, organize and report on data in our instance.

By default, Yoda provides a small and familiar asynchronous API.

## Utility 

- __yoda()__: The main entry point for creating a new yoda instance.
- __db.info()__: retrieves the instance current status, configuration and supported features.
- __db.open()__: opens the underlying resources.
- __db.close()__: closes the underlying resources.
- __db.isOpen()__: will return true only when the state of the instance is "open", it can be useful for determining if read and write operations are permissible.
- __db.isClosed()__: will return true only when the state of the instance is "closing" or "closed", it can be useful for determining if read and write operations are permissible.
- __db.compact()__: purges outdated data from the underlying stores to optimize storage and querying efficiency.
- __db.rebuild()__: rebuilds indexed views and/or graphs from the events series from scratch.
- __db.plugin()__: registers a new plugin.

## Editing 

- __db.put()__: creates or updates a document or a batch of documents.
- __db.putAttachment()__: attach a file or a batch of files to documents.
- __db.del()__: soft deletes a document or a batch of documents.
- __db.delAttachment()__: detach a file or a batch of files from documents. When a file is detached, it is not purged from the underlying store but removed from the latest item's revision `_attachments` array.
- __db.purge()__: hard deletes a document or a batch of documents from the underlying storage. The corresponding attachments are purged too.

## Querying 

- __db.get()__: primary method to retrieve a document or a batch of documents directly, by providing their keys.
- __db.getAttachment()__: retrieves the binary data of one or multiple attached files, by providing their attached documents keys and optionally their own keys.
- __db.query()__: returns all documents with the provided partition key value. Optionally, you can provide a sort key attribute and use a comparison operator to refine the search results.
- __db.scan()__: returns one or more items and item attributes by accessing every item in a table or a secondary index. This access method may grow arbitrarily long depending on the number of documents to scan and should be avoided, especially on the server side.

## Replication 

- __db.putEndpoint()__: creates or updates one or more replication endpoints configurations.
- __db.getEndpoint()__: gets of one or more replication endpoints configurations.
- __db.delEndpoint()__: deletes one or more replication endpoints configurations.

## Events

Yoda is an [emittery](https://github.com/sindresorhus/emittery) event emitter.

It emits two events for every method available on the API.

| Method        | Events                                  | Arguments     |
| ------------- | --------------------------------------- | ------------- |
| yoda          | beforeYoda, afterYoda                   | To be defined |
| info          | beforeInfo, afterInfo                   | To be defined |
| open          | beforeOpen, afterOpen                   | To be defined |
| close         | beforeClose, afterClose                 | To be defined |
| isOpen        | beforeIsOpen, afterIsOpen               | To be defined |
| isClosed      | beforeIsClosed, afterIsClosed           | To be defined |
| compact       | beforeCompact, afterCompact             | To be defined |
| rebuild       | beforeRebuild, afterRebuild             | To be defined |
| plugin        | beforePlugin, afterPlugin               | To be defined |
| put           | beforePut, afterPut                     | To be defined |
| putAttachment | beforePutAttachment, afterPutAttachment | To be defined |
| del           | beforeDel, afterDel                     | To be defined |
| delAttachment | beforeDelAttachment, afterDelAttachment | To be defined |
| purge         | beforePurge, afterPurge                 | To be defined |
| get           | beforeGet, afterGet                     | To be defined |
| getAttachment | beforeGetAttachment, afterGetAttachment | To be defined |
| query         | beforeQuery, afterQuery                 | To be defined |
| scan          | beforeScan, afterScan                   | To be defined |
| putEndpoint   | beforePutEndpoint, afterPutEndpoint     | To be defined |
| getEndpoint   | beforeGetEndpoint, afterGetEndpoint     | To be defined |
| delEndpoint   | beforeDelEndpoint, afterDelEndpoint     | To be defined |

It emits events for every message sent or received from the replication service:

| Event                | description                        | Arguments     |
| -------------------- | ---------------------------------- | ------------- |
| beforeMessageSent    | emitted before message publication | To be defined |
| afterMessageSent     | emitted after message publication  | To be defined |
| afterMessageReceived | emitted after message reception    | To be defined |

These events can be used as hooking-points for middleware or consumed by your application as needed (for UI data binding for example).

You can use all the API of [emittery](https://github.com/sindresorhus/emittery) to extend this behavior (on, off, onAny, offAny, etc.).