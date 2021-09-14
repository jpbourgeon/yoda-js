# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Local Development

```console
rushx start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

From the root of the monorepo

```console
rush build -o gh-pages
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Manual deployment

From the project folder 

```console
GIT_USER=<GitHub username> DEPLOYMENT_BRANCH=gh-pages CURRENT_BRANCH=main rushx deploy
```
