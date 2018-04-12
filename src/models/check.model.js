// check-model.js
module.exports = function (app) {
  function msDiff(start) {
    const diff = process.hrtime(start)
    return Math.round(diff[0] * 1e9 + diff[1] / 1e3)
  }

  const checks = {
    base: () => {
      const start = process.hrtime()
      return {
        status: true,
        message: 'Base check that server is running',
        time: msDiff(start)
      }
    },
    baseAsync: () => new Promise((resolve) => {
      const start = process.hrtime()
      resolve({
        status: true,
        message: 'Base check that server is running',
        time: msDiff(start)
      })
    }),
    mongo: () => new Promise((resolve) => {
      const start = process.hrtime()
      const mongooseClient = app.get('mongooseClient')
      const db = mongooseClient.connection
      const status = db.readyState
      const statusText = [
        'disconnected',
        'connected',
        'connecting',
        'disconnecting'
      ]
      if (status !== 2) { // not within connection
        resolve({
          status: status === 1,
          message: `Mongoose connection status: ${status === 1 ? 'OK' : statusText[status] + ' from ' + app.get('mongodb')}`,
          time: msDiff(start)
        })        
      }
      db.once('error', function(error) {
        resolve({ 
          status: false,
          message: error.message,
          time: msDiff(start)
        })
      })
      db.once('open', function() {
        resolve({
          status: true,
          message: 'Mongoose connection status',
          time: msDiff(start)
        })
      })
    }),
    mongoUsers: () => new Promise((resolve) => {
      const start = process.hrtime()
      const userModel = require('./users.model')(app)
      userModel.find((err) => {
        if (err) {
          resolve({
            status: false,
            message: err.message,
            time: msDiff(start)
          })
        } else {
          resolve({
            status: true,
            message: 'Could access users',
            time: msDiff(start)
          })
        }
      })
    })
  }

  return checks
}
