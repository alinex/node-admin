// Initializes the `secure` service on path `/secure`
const createService = require('./secure.class.js');
const hooks = require('./secure.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'secure',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/secure', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('secure');

  service.hooks(hooks);
};
