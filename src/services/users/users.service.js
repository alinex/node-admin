// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  const users = createService(options);
  // Describe API for swagger
  users.docs = {
    description: 'Basic service to get the users to be used for accessing this application',
    definitions: {
      users: {
        "type": "object",
        "required": [ "email", "password" ],
        "properties": {
          "email": {
            "type": "string",
            "description": "Email address as unique identifier"
          },
          "password": {
            "type": "string",
            "description": "Secret password (make it unguessable)"
          },
          "_id": {
            "type": "string",
            "description": "The id of the user"
          }
        }
      },
      'users list': {
        type: 'array',
        items: {
          $ref: '#/definitions/users'
        }
      }
    }
  };
  // add service
  app.use('/users', users);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');
  service.hooks(hooks);
};
