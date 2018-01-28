# Alinex Admin Server

This is the server used for the __Administration Panel__. It's an interface to do administration tasks easy and fast. It should be a base for specialized tools for specific environments which can be customized to it's needs.

It also contains the hosted [Client](https://github.com/alinex/quasar-admin) which is used to access the server from it's webpanel, desktop application or mobile apps.

## Features

### Server

- stateless using simple Java Web Token for authentication
- websocket (Realtime API) or HTTP REST
- service oriented architecture
- NodeJS 8
- server validation
- multiple database support
- logging events
- Swagger and Logtail in Browser

### Application

- authentication
- user management
- chat application

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
    web/              # the web client
    download/         # links to desktop app downloads
    error/            # error pages will be used on demand
      401.html
      404.html
      default.html

To integrate the web client the `web` directory is a softlink to the client's `dist` directory.

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

## REST API

The concrete API is displayed through the included [Swagger](https://swagger.io/) API documentation which you can access through the `/swagger` URL.

The server may be called through plain HTTP Requests or using the Feathers Client through Socket.io. The following description shows both types.

### Find

Retrieves a list of all matching resources from the service:

    GET /info

    app.service('info').find();

#### Filtering

You can also send additional filtering constraints on specific field values.
To get only records with 'group' equal 'node':

    GET /info?group=node

    app.service('info').find({
      query: {
        group: 'node'
      }
    });

You may also use any of the built-in find operands ($le, $lt, $ne, $eq, $in, etc.) the general format is as follows.

| Operand | Usage | Comment |
| ------- | ----- | ------- |
| -       | `field: value` | Simple equality |
| `$ne`   | `field: {$ne: value}` | Field is not equal value |
| `$in`   | `field: {$in: [value, ...]}` | In list of values |
| `$nin`  | `field: {$nin: [value, ...]}` | Not in list of values |
| `$lt`   | `field: {$lt: value}` | Field lower than given value |
| `$lte`  | `field: {$lt: value}` | Field lower or equal than given value |
| `$gt`   | `field: {$lt: value}` | Field greater than given value |
| `$lte`  | `field: {$lt: value}` | Field greater or equal than given value |

For example, to find all records which are not in group 'node':

    GET /info?name[$ne]=node

    app.service('info').find({
      query: {
        name: {
          $ne: 'node'
        }
      }
    });

You can also specify multiple fields which habe to be all matching the defined parameters.
Thats like an _and_ search. To make alternative groups of restrictions use `$or`:

    GET /info?$or[0][group][$ne]=node&$or[1][name]=cpu

    app.service('info').find({
      query: {
        $or: [
          { group: { $ne: 'node' } },
          { name: 'cpu' }
        ]
      }
    });

#### Limit

Most services support pagination here with the additional parameters. If nothing is
given the preconfigured default will be used.

`$limit` will return only the number of results you specify.
Retrieves the first ten values:

    GET /info?$limit=10

    app.service('info').find({
      query: {
        $limit: 10
      }
    });

If you want to get only the number of records you may also set `$limit` to `0`.
This ensures that no record is retrieved but you get the meta info like totalmemin the returned page object.

#### Offset (skip)

`$skip` will skip the specified number of results. If you skip 2 records the result
will start with record number 3, so to show record 3 and 4:

    GET /info?$limit=2&$skip=2

    app.service('info').find({
      query: {
        $limit: 2,
        $skip: 2
      }
    });

#### Sorting

`$sort` will sort based on the object you provide. It can contain a list of properties
by which to sort mapped to the order (1 ascending, -1 descending).

    /info?$sort[name]=1

    app.service('info').find({
      query: {
        $sort: {
          name: 1
        }
      }
    });


#### Select columns

`$select` allows to pick which fields to include in the result.

To only retrieve the fields 'name' and 'value' but not the group call:

    GET /info?$select[]=name&$select[]=value

    app.service('info').find({
      query: {
        $select: [ 'name', 'value' ]
      }
    });




### Get


### Authentication


## License

(C) Copyright 2018 Alexander Schilling

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

>  <https://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
