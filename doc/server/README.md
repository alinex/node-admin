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

### Logging

The server will write access logging to standard output and error logging to stderr on the calling command. But if started using `npm start` this will both piped into the log files:

    logs/access.log:
    [2018-03-06 19:40:24.223] [INFO] REST info::find 27 ms - 0 pending
    [2018-03-06 19:40:24.246] [INFO] HTTP GET /info 200 62 ms
    [2018-03-06 19:43:34.517] [INFO] SOCKETIO info::find 5.3 ms - 0 pending

In the example above you see three different calls. The first two belongs together and are issued through a HTTP call. As the logs are written after done, the called service will be logged before the request itself. And the last example line shows the call through websockets from the web client.

    log/error.log:
    SyntaxError: Unexpected identifier
        at createScript (vm.js:80:10)

If something went wrong!

## Development

Fork the repository from [Github](https://github.com/alinex/node-admin).

    npm run dev   # start the development server with aut reload
    npm run test  # to run the automatic tests and linter
    npm start     # start in productive mode

Then change it to your needs.

## Technologies

- [ExpressJS](http://expressjs.com/de/) as webserver
- [Winston](https://github.com/winstonjs/winston)
- [Feathers](https://feathersjs.com/) REST and realtime API
- [Authentication](https://docs.feathersjs.com/api/authentication/server.html)
- [Profiler](https://github.com/feathers-plus/feathers-profiler)
