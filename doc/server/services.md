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

### Mongo DB based

For a mongo DB based service you need a model like `src/models/users.js`:

    module.exports = function (app) {
      const mongoose = app.get('mongoose')
      if (mongoose.models.users) {
        return mongoose.models.users
      }
      const users = new mongoose.Schema({
        email: { type: String, unique: true },
        password: { type: String },
        nickname: { type: String, unique: true },
        name: { type: String },
        position: { type: String }
      }, { timestamps: true })
      return mongoose.model('users', users)
    }

See the possible Schema definitions in the [mongoose docs](http://mongoosejs.com/docs/schematypes.html) and the possible
[options](http://mongoosejs.com/docs/api.html#schema_Schema).

And the service may look like `src/services/users/index.js`:

    const createService = require('feathers-mongoose')
    const createModel = require('../../models/users')

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

To make a service or a specific method only accessible for authenticated users add the authenticate handler:

    const { authenticate } = require('@feathersjs/authentication').hooks

## API

The API information is used by swagger to display the data structure and query on it.
