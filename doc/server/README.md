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

## Technologies

- [ExpressJS](http://expressjs.com/de/) as webserver
- [Winston](https://github.com/winstonjs/winston)
- [Feathers](https://feathersjs.com/) REST and realtime API
- [Authentication](https://docs.feathersjs.com/api/authentication/server.html)
- [Profiler](https://github.com/feathers-plus/feathers-profiler)
