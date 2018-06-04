# Alinex Admin Server

This is the server used for the __Administration Panel__. It's an interface to do administration tasks easy and fast. It should be a base for specialized tools for specific environments which can be customized to it's needs.

The server part is developed as [alinex-admin](https://github.com/alinex/node-admin) package.

In it the ready build [Client](https://github.com/alinex/quasar-admin) can be included to access the server from it's webpanel, desktop application or mobile apps.

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
    [2018-03-07 21:01:07.326] [INFO] INTERNAL users::find 8.3 ms - 1 pending
    [2018-03-07 21:01:07.758] [INFO] SOCKETIO authentication::create 441.3 ms - 0 pending - FAILED before Invalid login

In the example above you see three different calls. The first two belongs together and are issued through a HTTP call. As the logs are written after done, the called service will be logged before the request itself. And the third example line shows the call through websockets from the web client.
And on the last lines an authentication with wrong password.

    logs/error.log:
    SyntaxError: Unexpected identifier
        at createScript (vm.js:80:10)

If something went wrong!

See the [configuration](config.md) for how to change the loglevel.

## Development

Fork the repository from [Github](https://github.com/alinex/node-admin).

    npm run dev   # start the development server with aut reload
    npm run test  # to run the automatic tests and linter
    npm start     # start in productive mode

Then change it to your needs.

The development of the server is aimed to NodeJS 8.x supporting most ES2017 but not the module loading. It is directly used witout transpiling.

## Technologies

- [ExpressJS](http://expressjs.com/de/) - webserver
- [Feathers](https://feathersjs.com/) - REST and realtime API
- [Authentication](https://docs.feathersjs.com/api/authentication/server.html) - JWT support
- [Winston](https://github.com/winstonjs/winston) - logging
- [Profiler](https://github.com/feathers-plus/feathers-profiler) - logging
- [mongoose](http://mongoosejs.com/) - database connection
- [feathers-mongoose](https://github.com/feathersjs-ecosystem/feathers-mongoose) - Model helper
- [CASL](https://stalniy.github.io/casl/) - Authorization library
