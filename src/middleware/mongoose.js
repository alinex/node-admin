const mongoose = require('mongoose')

module.exports = function (app) {
  mongoose.Promise = global.Promise
  // mongoose.connection.on("open", function(ref) {
  //   console.log("Connected to mongo server.")
  // })
  // 
  // mongoose.connection.on("error", function(err) {
  //   console.log("Could not connect to mongo server!")
  //   return console.log(err)
  // })
  mongoose.connect(app.get('mongodb'))
  // store for later use
  app.set('mongooseClient', mongoose)
}
