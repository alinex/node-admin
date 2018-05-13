// mongoose service
const createService = require('feathers-mongoose')
const createModel = require('../../models/users')

// load hooks and api from separate files
const hooks = require('./hooks')
const api = require('./api')

module.exports = function (app) {  
  // setup
  const name = 'users'
  const service = createService({
    name,
    Model: createModel(app),
    paginate: app.get('paginate')
  })

  // add meta data to service
  service.docs = api
  app.use('/users', service)

  // get initialized service to register hooks and filters
  app.service(name).hooks(hooks)
}
