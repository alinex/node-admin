module.exports = function (app) {
  app.configure(require('./mongoose'))
  app.configure(require('./authentication'))
  app.configure(require('./logtail'))
  app.configure(require('./swagger'))
}
