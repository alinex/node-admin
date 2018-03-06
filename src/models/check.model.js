// check-model.js
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
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
    mongodb: () => {
      const start = process.hrtime()
      const status = mongooseClient.connection.readyState
      return {
        status: status,
        message: `Mongoose connection status: ${status}`,
        time: msDiff(start)
      }
    }
  }

  return checks
}
