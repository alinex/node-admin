// check-model.js
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')

  const checks = {
    base: () => {
      const start = new Date()
      return {
        status: true,
        message: 'Base check that server is running',
        time: new Date() - start
      }
    },
    mongodb: () => {
      const start = new Date()
      const status = mongooseClient.connection.readyState
      return {
        status: status,
        message: `Mongoose connection status: ${status}`,
        time: new Date() - start
      }
    }
  }

  return checks
}
