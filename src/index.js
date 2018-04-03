/* eslint-disable no-console */
const app = require('./app')

const port = app.get('port')
const server = app.listen(port)

process.on('unhandledRejection', (reason) => {
  const msg = reason.message || reason
  const logger = app.get('logger')
  logger.error('Unhandled Promise Rejection:', msg)
})

server.on('listening', () => {
  const logger = app.get('logger')
  logger.info('Server application started on http://%s:%d', app.get('host'), port)
})
