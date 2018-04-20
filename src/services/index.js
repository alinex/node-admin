module.exports = function (app) {
  app.configure(require('./info'))
  app.configure(require('./check'))
  app.configure(require('./users'))
  app.configure(require('./messages'))
}
