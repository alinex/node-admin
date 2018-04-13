// const todos = require('./todos/todos.service');
// const secure = require('./secure/secure.service');
const messages = require('./messages/messages.service')

module.exports = function (app) {
  app.configure(require('./info'))
  app.configure(require('./check'))
  app.configure(require('./users'))
  // app.configure(todos);
  // app.configure(secure);
  app.configure(messages)
}
