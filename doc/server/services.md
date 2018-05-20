# Services

Each module needs a `services` subdirectory in which the service script `index.js` is located.
It will be automatically loaded on server start.

## Setup

The setup within the `index.js` will look like:

    // depends on storage type
    const createService = require('feathers-mongoose') 
    const createModel = require('../../models/users')
    
    // load hooks and api from separate files
    const hooks = require('./hooks')
    const api = require('./api')

    module.exports = function (app) {
      // setup
      const service = createService({
        name: 'users',
        Model: createModel(app),
        paginate: app.get('paginate')
      })

      // add meta data to service
      service.id = 'users'
      service.docs = api

      // add service to router
      app.use('/users', service)

      // get initialized service to register hooks and filters
      app.service('users').hooks(hooks)
    }

As far as the storage type, the name and path has to be specified here. Also the options to create a service may vary
depending on the storage type.

## Storage

Services can be directly based on a dababase connection using:

- mongoose for mongo DB
- Knex for 
  - PostgreSQL
  - SQLite
  - MySQL / Maria DB
  - MS SQL
- NeoDB for file database

Or it can be based on individual class.

## Hooks

You may add multiple handlers before, after the service or on error. Use these to easily manipulate the transferred data.
You may:
- validate or sanitize data
- add additional information
- resolve references
- log or inform on specific request

To use hooks you can write a handler method which will get a `context` element within the hook file or include it.
Then you may add it in the preferred position within the hooks arrays.

### Authentication

Authentication is based on the users service. The login is done using the user's `email` and `password` fields. More information can be found in the [authentication service](../services/authentication.md).

To make a service or a specific method only accessible for authenticated users add the authenticate handler. Here it is added to the all handler making the complete service only available for users authenticated by JSON Web Token:

    const { authenticate } = require('@feathersjs/authentication').hooks
 
    module.exports = {
      before: {
        all: [ authenticate('jwt') ],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
      },

      after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
      },

      error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
      }
    }

## Authorization

While the authentication is used to identify the user, authorization defines the what the user is allowed to do.

The authorization is defined role and attribute based. To get this working the `user` may have some role tags added. This role tags are bound to ability rules.








## API

The API information is used by swagger to display the data structure and query on it.

    module.exports = {
      description: 'Basic service to get the users to be used for accessing this application',
      definitions: {
        // get... one record
        users: {
          type: 'object',
          required: [ 'email', 'password' ],
          properties: {
            email: {
              type: 'string',
              description: 'Email address as unique identifier',
              example: 'info@alinex.de'
            },
            password: {
              type: 'string',
              description: 'Secret password (make it unguessable)'
            },
            _id: {
              type: 'string',
              description: 'The id of the user'
            }
          }
        },
        // find... multiple records
        'users list': {
          type: 'array',
          items: {
            $ref: '#/definitions/users'
          }
        }
      }
    }
