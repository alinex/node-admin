// Initializes the `todos` service on path `/todos`
const createService = require('feathers-memory')
const hooks = require('./todos.hooks')

module.exports = function (app) {

  const paginate = app.get('paginate')

  const options = {
    name: 'todos',
    paginate
  }

  // Initialize our service with any options it requires
  const todos = createService(options)
  // Describe API for swagger
  todos.docs = {
    description: 'A service to send and receive messages',
    definitions: {
      messages: {
        'type': 'object',
        'required': [
          'title'
        ],
        'properties': {
          'title': {
            'type': 'string',
            'description': 'The message text'
          }
        }
      }
    }
  }
  // add service
  app.use('/todos', todos)

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('todos')
  service.hooks(hooks)
}
