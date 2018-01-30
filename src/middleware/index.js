const logtail = require('./logtail')
const swagger = require('./swagger')
const authentication = require('./authentication')
const mongoose = require('./mongoose');

module.exports = function (app) {
  app.configure(authentication)
  app.configure(logtail)
  app.configure(swagger)
}
