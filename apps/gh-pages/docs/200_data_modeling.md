import Mermaid from "/src/components/mermaid"

# Data modeling

Document-oriented databases are built on the assumption that [modeling and storing your data as documents](https://docs.couchdb.org/en/latest/intro/why.html#a-different-way-to-model-your-data) is a better fit for common applications. At the storage level however, the design of your data will greatly impact the way your application performs in matter of replication, querying and storage efficiency.

This article explains the choices made upon data structure in Yoda, to answer these challenges.

To make it clear, there are two types of documents in a Yoda instance : items and their attachments.

The following chart summarizes Yoda's storage architecture. When you insert a document locally into Yoda, it is converted into an event which is inserted into a time series and aggregated into a graph. Additionally for attachments, the files binary data are saved in an appropriate storage. Conversely, when Yoda receives an event from the network, it will be stored in the corresponding graph and time series, and will then transformed into a valid document to be queried later.

<Mermaid chart={`flowchart TB
	RE[Replication] <--> ST
	subgraph ST["Channel(s)"]
		direction TB
		IG[(Items graph)] -.- IE[(Items events)] -.- IV[(Materialized<br>views)]
		AG[(Attachments<br>graph)] -.- AE[(Attachments<br>events)] -.- AV[("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")]
	end
	ST <--> EQ[Editing / querying]
  %%
  classDef layer fill: #ffffde, stroke: #aaaa33, stroke-width: 1px;
  classDef title position: relative, top: -0.35em;
  class RE,EQ layer;
  class ST title;
`}/>


The structure of a Yoda item is the following. and will be further discussed in the article:

```ts
interface Item<T> {
	_meta: {
		_channel: string,
		_id: string,
		_rev: string,
		_createdAt?: Date,
		_updatedAt?: Date,
		_deleted?: boolean,
		_deletedAt?: Date,
		_purged?: boolean,
		_purgedAt?: Date
	},
	_data: T,
	_attachments: { _id: "", _filename: "", _contentType: "", _length: "" }[] | undefined,
}
```

## Channels

A channel in Yoda is an abstract representation that brings together:
- *A logical storage unit*. It is a cohesive group of resources used to store a set of related documents together with their corresponding events graphs. Depending on the execution context, these resources could be a combination of any type of compatible storage : one or more databases, a folder on the filesystem, an S3 bucket...
- *A security layer*. The authentication strategy is evaluated at the channel level: a user is explicitly granted read only or full access to a channel.
- *A bi-directional communication channel*. Replication operations always run against a specific channel. A replication message or request is published to or received from a specific channel.

A Yoda instance can host any number of channels.

The special `_local` channel is used for local only data. Its content will never be synchronized outside the instance.

## Documents events

Yoda adopts the [immutable history / event sourcing](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) pattern to store documents.

When you publish a document to a Yoda instance, a unique `_id` identifier is generated for the document. Additionally for items updates, Yoda compares the provided item with its previous version (if any) and only retains the difference in the event's content. A unique `_rev` identifier is generated for this new revision of the item.

The system stores this document as an event in the `_primary` index, under the appropriate `_itm_events` or `_att_events` partition for items or attachments respectively, with a compound sort key made of `_rev` and `_id` for items and `_id` as a sort key for attachments.

Additionally the appropriate graph is updated, `_itm_graph` or `_att_graph` for items or attachments respectively, to handle attachments synchronization across devices.

## Materialized views

Yoda stores the submitted documents with storage and replication efficiency in mind. However, the event sourcing storage pattern is not the best format for reading efficiency and can have a negative effect on queries.

To support efficient querying Yoda maintains local views of the items. Querying and data extraction are executed against these [materialized views](https://docs.microsoft.com/en-us/azure/data-explorer/kusto/management/materialized-views/materialized-view-overview) or there eventual indexes.

The items revisions are materialized under the `_items` partition key, with a compound sort key made of `_id` and `_rev`.

These representations of items are always computed locally. In case of inconsistency they can be discarded and rebuild from the events sources.

## Secondary indexes

Secondary indexes, compound indexes (partition keys (hash) and sort keys (range)), indexes overloading are key features in NoSQL data modeling.

In more advanced NoSQL databases that handle indexes (indexeddb, dynamodb, ...), the indexing capabilities of the underlying database will be used.

In key-value databases (like leveldb), there is no other index than the storage key. In such contexts Yoda emulates indexes by composing storage keys : the index name is prefixed to the partition key. If no index name is provided, the `_primary` index will be used by default. The partition key and sort key are composed into a storage key by using a forward slash `/` character.

Partition keys and sort keys can be usefully decomposed further. By convention, we recommend to use the hash `#` character and encourage you to reserve this character to this specific usage in your keys. You are free to use any other character though (except the forward slash `/` as stated above).

Indexes key schemas (index name, partition key property name and sort key property name) are declared during the instance initialization. When the materialized views are calculated, the indexes are updated according to the properties names:

- if a matching partition key / sort key pair is found, the index entry will be created or updated for this item
- otherwise the item will be skipped on that particular index (also called a sparse index)

### Automatic dates

Since time is a key component of a document identifer, Yoda also adds useful date properties automatically in the `_meta` properties of your materialized views:

- `_createdAt`: creation date of the document
- `_updatedAt`: optional, last update of the document or undefined
- `_deletedAt`: optional, document deletion date or undefined
- `_purgedAt`: optional, document purge date or undefined

## Attachments

It is generally admitted that storing files binaries in databases is a bad practice. Yoda uses a dedicated adapter to store an item's attachments binary data in a more appropriate storage (for example, the filesystem on the server, an S3 bucket on AWS, or a separate indexeddb in the browser to ensure a broader browser compatibility).

Anyway, an attachment cannot exist independently of an item. It is always attached to a specific item's revision in the database, and can only be retrieved and manipulated through the item it is attached to.

When you attach a file to an item :

- the file's binary data is stored in the attachment storage through the dedicated adapter. The attachment storage adapter takes care of choosing the best format for storing the attachment (blob, buffer, ...).
- the file's metadata is referenced into the corresponding item in its `_attachments` array. These meta properties are `_id`, `_filename`, `_contentType` (MIME type) and `_length` (bytes).
- an event is generated and sorted under its `_id` into the attachments series `_att_events` (attachments are binary data and are not diffed or versioned, so they don't take an `_rev`property).
- The attachments graph `_att_graph` is updated to handle attachments synchronization across devices.

## Universally unique Lexicographically sortable IDentifiers (ULID)

In Yoda, identifiers in general, and the `_id`and `_rev` properties in particular, are critical. Thus they are fully managed by the system.

To ensure consistency across distributed endpoints, Yoda relies on Universally Unique Lexicographically sortable IDentifiers ([ULID](https://github.com/ulid/spec)). This feature guarantees that documents, and items revisions, are conflict free, even among distributed endpoints. In Yoda, the latest known ULID always wins.

In order to protect the system from intentional or unintentional ULID stream corruption, Yoda enforces the following policy.  
Locally, trying to post a revision to an item in the past (with a revision ULID prior to the current revision ULID) will throw an error. In the same way, editing with a revision ULID in the future (greater than the current time on the local instance) will throw an error.  
During the replication process, trying to replicate changes in the past (with a revision ULID lower than the current item ULID) or in the future (greater than the current time on the instance) will throw an error.  
If you receive such errors on a client, it most probably indicates that its internal clock is not on time. If a client's clock is late, it will experience a delay before receiving the latest changes, and its own messages will have a greater risk of being ignored in favour of more recent revisions from other instances. If a client's clock is early, it will experience a delay before being able to submit its changes.

To mitigate clock de-synchronization, Yoda implements a [retry strategy with exponential back-off](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-retries-exponential-backoff) in case of synchronization errors. This gives a chance to the client to catch the time window and to synchronize successfully with a delay.

## Javascript serialization and storage efficiency

Yoda do not store documents as JSON. You may yourself find that sometimes you need to store JavaScript dates, sets or maps... For that reason Yoda stores compressed stringified javascript objects. With Yoda, you can publish any fully qualified javascript object as a document. Yoda handles for you the object diffing, serialization and compression into events.

Compressed strings has been favored over alternative binary formats because they have proven to be the most [efficient way to store data](https://www.lucidchart.com/techblog/2019/12/06/json-compression-alternative-binary-formats-and-compression-methods/) in Javascript environments.

## Reserved words

As a general rule:

- your properties and values should not start with an underscore `_` as this character is used to indicate reserved words in Yoda. Reserved words may be introduced as needed by plugins or future releases.
- Your indexing values can not contain forward slashes `/` as this character is used to distinguish partition key values from sort key values in key-value databases.
- By convention, we recommend to use the `#` character and encourage you to reserve this character to further decompose your partition and sort keys. You are free to use any other character though (except the forward slash `/`as stated above).

Yoda reserves special words:

- channels:
	- `_local` (local documents channel ; they will never be replicated)
- index names:
	- `_primary` (primary index in key-value databases)
- primary index partition key values:
	- `_itm_events` (events)
	- `_att_events` (events)
	- `_itm_graph` (events graph)
	- `_att_graph` (attachments graph)
- items property names:
	- `_meta`
	- `_data`
	- `_attachments`
	- `_channel`
	- `_id`
	- `_rev`
	- `_createdAt`
	- `_updatedAt`
	- `_deleted`
	- `_deletedAt`
	- `_purged`
	- `_purgedAt`
	- `_filename`
	- `_contentType`
	- `_length`
