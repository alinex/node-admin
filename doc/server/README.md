# Server

The server part is developed in as [alinex-admin](https://github.com/alinex/node-admin) package.

# Alinex Admin Server

This is the server used for the __Administration Panel__. It's an interface to do administration tasks easy and fast. It should be a base for specialized tools for specific environments which can be customized to it's needs.

It also contains the hosted [Client](https://github.com/alinex/quasar-admin) which is used to access the server from it's webpanel, desktop application or mobile apps.

## Features

- stateless using simple Java Web Token for authentication
- websocket (Realtime API) or HTTP REST
- service oriented architecture
- NodeJS 8
- server validation
- multiple database support
- logging events
- Swagger and Logtail in Browser

## Productive System

It depends on your need. You may install it on one or multiple servers and also multiple times on one server to use multiple cpus. But then you need a load balancer before it.

## Development

Fork the repository from [Github](https://github.com/alinex/node-admin).

    npm run dev   # start the development server with aut reload
    npm run test  # to run the automatic tests and linter
    npm start     # start in productive mode

Then change it to your needs.

### Technologies

- [ExpressJS](http://expressjs.com/de/) as webserver
- [Winston](https://github.com/winstonjs/winston)
- [Feathers](https://feathersjs.com/) REST and realtime API
- [Authentication](https://docs.feathersjs.com/api/authentication/server.html)
- [Profiler](https://github.com/feathers-plus/feathers-profiler)

### Configuration

Within the `config` directory the following configurations:

    default.json      # base configuration
    production.json   # used if run with NODE_ENV=production (`npm start`)

In this files you may change something like the `hostname`, `port` or the authentication.
More complex things should be changed in the code.

### Static, public

Within the `/public` path I have all files which will be served directly as they are:

    index.html        # the homepage
    web/              # the web client (supporting history mode)
    download/         # links to desktop app downloads
    error/            # error pages will be used on demand
      401.html
      404.html
      default.html

To integrate the development web client the `web` directory is a softlink to the client's `dist` directory.

### Logs

While started using `npm` the logs will be stored automatically into the `logs` directory:

    access.log
    error.log

### Codebase

The base files are:

    index.js            # Start script used to run the server
    app.js              # Setup of the express server and the middleware
    app.hooks.js        # General hooks
    logger.js           # Setup for winston logger
    authentication.js   # Setup of authentication
    channel.js          # setup of communication chanels to the client

And then the concrete logic is split in the following directories:

    middleware          # for additional middleware
    services            # all the REST services
    hooks               # scripts to be used in hook setups
    models              # data models

### Services

Most services contain three files:

    xxx.service.js      # the service setup
    xxx.hooks.js        # linking to hook scripts
    xxx.api.js          # API documentation (used by swagger)

To have a quick look what is going on, you may call the `/logtail` service to
check the last lines in the log.
