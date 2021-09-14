# Replication

In cloud-based and distributed applications, asynchronous messaging is an effective way to decouple senders from consumers, and avoid blocking the sender to wait for a response. However, using a dedicated message queue for each consumer does not effectively scale to many consumers. Also, some of the consumers might be interested in only a subset of the information.

To deal with those issues, Yoda implements the [publisher-subscriber pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/publisher-subscriber) to allow communication and filtered data replication through dedicated channels. Depending on its authorizations, an authenticated client can have read access or full access to private and/or public channels.


## Events series and graphs

The event sourcing pattern adopted by Yoda to store documents aims to provide fast and conflict free replication.

As we learned in the data modeling article, when you publish a document to a Yoda instance, the system stores it as an event in the `_itm_events` or the `_att_events` partition.

Upon insertion, the events are aggregated in a graph by the time component of their storage key. Each digit of the 10 characters in the time part at the beginning of the key is used as a count aggregate level. Put together, these aggregates form aggregated time graphs, that is used to manage replication. The same kind of graph is built for items `_itm_graph` and attachments `_att_graph`.

The sources of truth of a Yoda instance are the events graphs and events series. Thus, only those documents are synchronized between instances.

If there is any uncertainty, it is always possible for you to present the user, in the application itself, with a prompt to assist with merging the content of older revisions into a new one.

Over time the amount of storage used by events and graphs may grow arbitrarily large, even if the set of fields in a document itself is small. This can be controlled by specifying a revision history depth. Yoda will then rotate the maximum number of known revision for a specific document at update time. However, care is needed not to set the revision history depth so short that there are active un-synchronized Yoda instances with older changes, as they would simply be ignored and dropped. You should only set a revision history depth if other strategies to control the database size have failed.

## One-time replication

For one-time replication actions, Yoda uses plain HTTP requests to synchronize attachments, or run bulk events and graphs replication operations.

One-time replications are performed the first time a client joins a replication channel, or when it reconnects after an idle period, to make this first synchronization operation as fast as possible.

## Continuous replication

During a continuous replication process, Yoda uses websocket communication to synchronize events and graphs entries.

When local changes are detected, they are published in the corresponding `_channel` for other endpoints to consume.

When remote changes are received on a `_channel` from other endpoints they are added to the corresponding graph and events list, and computed into indexed views for querying.

Websocket communication have been favored over HTTP / GraphQL because it offers the [best compromise](<https://medium.com/serverless-transformation/asynchronous-client-interaction-in-aws-serverless-polling-websocket-server-sent-events-or-acf10167cc67>) between network cost efficiency, compatibility with various backend architectures (server vs serverless) and browser compatibility coverage.

## Network efficiency

Yoda uses compression to maximize the network performance. Gzip compression is enabled for HTTP requests, and `permessage-deflate` extension for websocket messaging.

In the browser, Yoda uses a leader election algorithm to optimize network traffic and avoid opening multiple websocket when the app is opened in multiple tabs / windows in parallel.