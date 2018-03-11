/* eslint-disable no-console */
const app = require('./app')

const port = app.get('port')
const server = app.listen(port)

process.on('unhandledRejection', (reason, p) => {
  const logger = app.get('logger')
  logger.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason)
})

server.on('listening', () => {
  const logger = app.get('logger')
  logger.info('Server application started on http://%s:%d', app.get('host'), port)
})
