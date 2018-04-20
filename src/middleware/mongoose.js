const mongoose = require('mongoose')

module.exports = function (app) {
  const logger = app.get('logger')
  
  mongoose.Promise = global.Promise
  // add debugging messages
  mongoose.connection.on('open', function() {
    logger.verbose(`Connected to mongo server at ${app.get('mongodb')}`)
  })  
  mongoose.connection.on('error', function(err) {
    return logger.error(err.message)
  })
  // connect
  mongoose.connect(app.get('mongodb'), {
    poolSize: 5, 
    socketTimeoutMS: 10000,
    keepAlive: true,
    // keepAlive: 120, 
    reconnectTries: 30
  })
  // store for later use
  app.set('mongoose', mongoose)
}
