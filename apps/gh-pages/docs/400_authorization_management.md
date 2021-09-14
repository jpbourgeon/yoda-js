# Authorization management

Yoda doesn't manage authentication. It provides three authorization strategies to help you determine what channel(s) authenticated users are granted or denied read only or full access to.

API Key and JWT authorization strategies are not exclusive and can be combined.

## Admin party

By default, Yoda is in an insecure state. If no authorization strategy is defined every connected user can act as a full administrator of the instance.

This mode is meant for development and testing purpose only. It should never be used in production.

## API Key

In this mode, you define a set of application wide API Keys.

Providing a valid API Key in a request gives full access to the instance.

Using API Keys is a weak security pattern and is strongly discouraged in production. If you use it, you should reserve this mode to trusted environments (i.e. on the server side).

## JSON Web Tokens

In this strategy, you define a JWT validation middleware.

The generation of valid JWT with an adequate permissions list is out of Yoda's scope of responsibilities.

The user provides a valid JWT to Yoda. The JWT can be used locally as a first layer of local security. It is also sent with every channel message to secure access to the synchronization endpoints.

The default JWT authorization middleware checks the level of authorization granted to the user for the current channel (read only or full access). If you need a finer grained authorization strategy, you need to implement this behavior yourself, through custom middleware and/or plugins.