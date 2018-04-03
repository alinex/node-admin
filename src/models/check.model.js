// check-model.js
module.exports = function (app) {
  function msDiff(start) {
    const diff = process.hrtime(start)
    return Math.round(diff[0] * 1e9 + diff[1] / 1e3)
  }

  const mongooseClient = app.get('mongooseClient')

  const checks = {
    base: () => {
      const start = process.hrtime()
      return {
        status: true,
        message: 'Base check that server is running',
        time: msDiff(start)
      }
    },
    mongodb: () => {
      const start = process.hrtime()
      const status = mongooseClient.connection.readyState
      const statusText = [
        'disconnected',
        'connected',
        'connecting',
        'disconnecting'
      ]
      return {
        status: status === 1,
        message: `Mongoose connection status: ${status === 1 ? 'OK' : statusText[status] + ' from ' + app.get('mongodb')}`,
        time: msDiff(start)
      }
    }
  }

  return checks
}
