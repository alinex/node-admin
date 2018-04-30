// Initializes the `info` service on path `/info`
const createService = require('./service')
const createModel = require('./model')

// load hooks and api from separate files
const hooks = require('./hooks')
const api = require('./api')

module.exports = function (app) {
  // setup
  const name = 'check'
  const service = createService({
    name,
    Model: createModel(app),
    paginate: app.get('paginate')
  })

  // add meta data to service
  service.id = name
  service.docs = api

  // add service to router
  app.use('/check', service)

  // get initialized service to register hooks and filters
  app.service(name).hooks(hooks)
}
