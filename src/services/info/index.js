// Initializes the `info` service on path `/info`
const createService = require('./service')
const hooks = require('./hooks')
const api = require('./api')

module.exports = function (app) {

  const paginate = app.get('paginate')

  const options = {
    name: 'info',
    app,
    paginate
  }

  // Initialize our service with any options it requires
  const info = createService(options)
  info.docs = api
  app.use('/info', info)

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('info')

  service.hooks(hooks)
}
