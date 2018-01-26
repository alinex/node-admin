// Initializes the `check` service on path `/check`
const createService = require('./check.class.js');
const hooks = require('./check.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'check',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/check', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('check');

  service.hooks(hooks);
};
