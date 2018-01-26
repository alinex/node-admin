// Initializes the `check` service on path `/check`
const createService = require('./check.class.js')
const hooks = require('./check.hooks')
const api = require('./check.api')

module.exports = function (app) {

  const paginate = app.get('paginate')

  const options = {
    name: 'check',
    paginate
  }

  // Initialize our service with any options it requires
  const check = createService(options)
  check.docs = api
  app.use('/check', check)

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('check')

  service.hooks(hooks)
}
