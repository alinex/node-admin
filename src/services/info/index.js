// Initializes the `info` service on path `/info`
const createService = require('./service')

// load hooks and api from separate files
const hooks = require('./hooks')
const api = require('./api')

module.exports = function (app) {
  // setup
  const name = 'info'
  const service = createService({
    name,
    app,
    paginate: app.get('paginate')
  })

  // add meta data to service
  service.docs = api

  // add service to router
  app.use('/info', service)

  // get initialized service to register hooks and filters
  app.service(name).hooks(hooks)
}
