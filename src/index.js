/* eslint-disable no-console */

const checkModel = require('./models/check.model')

const app = require('./app')

const logger = app.get('logger')

logger.verbose('Starting server...')
const port = app.get('port')
const server = app.listen(port)

process.on('unhandledRejection', (reason) => {
  const msg = reason.message || reason
  const logger = app.get('logger')
  logger.error('Unhandled Promise Rejection:', msg)
})

server.on('listening', async () => {
  logger.verbose('Server started!')
  // run checks after startup
  logger.verbose('Running checks...')
  const checks = checkModel(app)
  let num = 0
  const max = Object.keys(checks).length
  for (const name in checks) {
    logger.debug(`Check ${++num}/${max}`, name)
    const res = await checks[name]()
    if (res.status) {
      const time = res.time < 2000 ? `${res.time} µs` : `${Math.round(res.time / 1000)} ms`
      logger.debug(`Succeded ${name} check in ${time}`)
    } else {
      logger.error(`Failed ${name} check: ${res.message}`)
    }
  }
  // completely ready to be used
  logger.info('Initialization done - http://%s:%d', app.get('host'), port)
})
