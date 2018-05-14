/* eslint-disable no-console */

const checkModel = require('./services/check/model')
const app = require('./app')

const logger = app.get('logger')

logger.verbose('Starting server...')

const port = app.get('port')
const ssl = app.get('ssl')

// create http or https server
var server
if (ssl) {
  const fs = require('fs')
  const https = require('https')  
  server = https.createServer({
    key: fs.readFileSync(ssl.key),
    cert: fs.readFileSync(ssl.cert)
  }, app)
} else {
  const http = require('http')
  server = http.createServer(app)
}
server.listen(port)
app.setup(server)

// listeners
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
      logger.debug(`Succeded ${name} check in ${res.time} ms: ${res.message}`)
    } else {
      logger.error(`Failed ${name} check: ${res.message}`)
    }
  }
  // completely ready to be used
  const proto = ssl ? 'https' : 'http'
  logger.info('Initialization done - %s://%s:%d', proto, app.get('host'), port)
  console.log(`Initialization done - ${proto}://${app.get('host')}:${port}`)
})
