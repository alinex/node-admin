// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb');

const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const api = require('./users.api');

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
  users.docs = api;
  app.use('/users', users);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');
  service.hooks(hooks);
};
