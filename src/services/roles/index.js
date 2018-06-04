// mongoose service
const createService = require('feathers-mongoose')
const createModel = require('../../models/roles')

// load hooks and api from separate files
const hooks = require('./hooks')
const api = require('./api')

module.exports = function (app) {  
  // setup
  const name = 'roles'
  const service = createService({
    name,
    Model: createModel(app),
    paginate: app.get('paginate')
  })

  // add meta data to service
  service.docs = api

  // add service to router
  app.use('/roles', service)

  // get initialized service to register hooks and filters
  app.service(name).hooks(hooks)
}
