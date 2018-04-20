// Initializes the `messages` service on path `/messages`
const createService = require('feathers-mongoose')

const createModel = require('../../models/messages')
const hooks = require('./hooks')
const api = require('./api')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'messages',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  const messages = createService(options)
  messages.docs = api
  app.use('/messages', messages)

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('messages')
  service.hooks(hooks)
}
