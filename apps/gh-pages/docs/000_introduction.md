---
id: introduction
slug: /
---

# Introduction

> “Feel the force!”– Yoda

Yoda is **Y**our **O**ffline-first **DA**tastore.

Store your data in a local instance, as transformation events. Query, combine, and transform your items with JavaScript. You can distribute your data by using events based replication. Yoda supports conflicts-free, master-master, channel replication setups.

It comes with a suite of features that make modern web apps development a breeze. Such as middleware, or local and network real-time change notifications.

We care a lot about distributed scaling. Yoda leverages partition tolerance and eventual consistency  to work on serverless environments. And we care a lot about developer experience. Yoda behaves in the same way in any context. You can use the same API on your computer, on a single instance server, in a serverless context, or in the browser. Its API is also minimal, familiar and consistent.

Yoda is not a database or a network protocol. It is an orchestration layer between the network, the storage and your application. It relies on adapters to persist your data into compatible databases and/or storage. And communicates with other instances via websocket and HTTP.

## Why Yoda?

> “If no mistake you have made, losing you are: a different game you should play.” – Yoda

In 2005 [Apache CouchDB](https://en.wikipedia.org/wiki/Apache_CouchDB) was introduced brightly in the document-oriented NoSQL databases family. Nowadays, many other NoSQL databases provide great distributed architectures that store and replicate JSON documents. At the price of eventual consistency, you receive views and indexes, powerful querying features, accessible through HTTP APIs. Replication and synchronization capabilities of such systems make them usable in mobile devices contexts, where network connection is not guaranteed, and the application must keep on working offline. The community has leveraged these capabilities to build solutions for offline-first applications. PouchDB, a local database in the browser that syncs with CouchDB compatible databases, is the most emblematic example in this category.

However, the web has continued to evolve and introduced new challenges for developers, as well as new opportunities to seize. When you try to build a serverless backend for an offline-first progressive web app with the available tools, you have to deal with vendor lock-in, the lack of support for truly serverless architectures, unmaintained and outdated critical packages and old technologies. We can do better!

Yoda is an open-source project that builds upon document-oriented NoSQL databases paradigms and the modern web to solve these new challenges and bring even more modularity and scalability to your application. As Yoda's developers, we are naturally very excited to share it with the community and see how it grows!

## Local data is king

> “On our point of view, many of the truths that we cling to depend.” – Yoda

Whenever you have to wait for an application to respond or a website to render, you almost always wait for a network connection that isn’t as fast as you want it at that point. Waiting a few seconds instead of milliseconds greatly affects user experience and thus user satisfaction. What do you do when you are offline? This happens all the time – your DSL or cable provider has issues, or your smartphone has no bars, and no connectivity means no way to get to your data.

To solve that problem Yoda considers that local data is king. All your actions are taken against the data available locally first, and then synchronized at best in the background.

This principle is called subsidiarity, and holds that issues should be dealt with at the most immediate (or local) level that is consistent with their resolution. Thus, Yoda favors local computing over server-side computing, and the usage of the language features (javascript / typescript) over idiomatic and redundant API entries. It embraces the document-oriented database paradigms. It shifts some responsibilities from the central database to the edge to offer a new set of solutions to the offline-first challenges, from a new point of view.
