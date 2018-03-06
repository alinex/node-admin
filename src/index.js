/* eslint-disable no-console */
const app = require('./app')
const logger = require('./logger')

const port = app.get('port')
const server = app.listen(port)

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason)
)

server.on('listening', () =>
  logger.info('Server application started on http://%s:%d', app.get('ip'), port)
)
