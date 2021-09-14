import Mermaid from "/src/components/mermaid"

# Architecture

Yoda adopts an [Event-driven](https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven) [micro-services](https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices)  architecture to be highly reactive and extensible.

## Event-driven architecture

Every changes to the data are written to a dedicated partition in a strictly ordered and durable manner, guaranteed even across distributed endpoints.

This stream of events is emitted in near real-time over the messaging infrastructure, up to other endpoints and down to the consumer to refresh its own state.

The following flowchart shows a simplified view of Yoda's global architecture.

<Mermaid chart={`flowchart TB
  RE{{Remote<br>endpoint}} <--> WS[/Websocket/]
  RE <--> H[/HTTP/]
  WS <-- continuous replication<br>graphs / events --> SA
  H <-- One time replication<br>attachments / bulk events / bulk graphs --> SA
  subgraph LI[Local Yoda instance]
    subgraph R[Replication]
      SA[[Replication<br>authorization]] <--> S[[Replication<br>middleware]]
    end
    S <--> ST
    subgraph ST["Channel(s)"]
      direction TB
      IG[(Items graph)] -.- IE[(Items events)] -.- IV[(Materialized<br>views)]
      AG[(Attachments<br>graph)] -.- AE[(Attachments<br>events)] -.- AV[("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")]
    end
    subgraph EQ[Editing / querying]
      DT[[Local<br>middleware]] <--> LA[[Local<br>authorization]]
    end
    ST <--> DT
  end
  LA <--> LC{{Local<br>consumer}}
  %%
  classDef title position: relative, top: -0.35em;
  class LI,R,ST,EQ title;
`}/>

Yoda enforces [NoSQL design](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html) best practices:

- single table data storage
- primary index and optional global secondary indexes
- compound indexes: partition keys (hash) and sort keys (range)
- index overloading

## Middleware and plugins

Yoda focuses on a limited set of core responsibilities to deal efficiently with offline-first storage and replication. However its behavior can be extended easily through middleware and plugins.

Middleware functions are executed at runtime every time predefined events occur. You are thus given room to transform your instance's workflow in any way you see fit.

Plugins are packaged sets of predefined middleware and additional features that extend Yoda's behavior in a useful way.

Schema validation, encryption at rest, compression... Your imagination is the limit !