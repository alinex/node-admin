const path = require('path')
const util = require('util')
const favicon = require('serve-favicon')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const expressWinston = require('express-winston')

const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')
const { profiler, getPending }  = require('feathers-profiler')
const clc = require('cli-color')

const logger = require('./logger')
const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')
const channels = require('./channels')

const app = express(feathers())

// Load app configuration
app.configure(configuration())
app.configure(logger())
// use first ip instead of localhost on development
if (process.env.NODE_ENV != 'production' && app.get('host') == 'localhost') {
  const os = require('os')
  const ifaces = os.networkInterfaces()
  for (var dev in ifaces) {
    // ... and find the one that matches the criteria
    var iface = ifaces[dev].filter(function(details) {
      return details.family === 'IPv4' && details.internal === false
    })
    if (iface.length > 0) {
      app.set('host', iface[0].address)
      break
    }
  }
}
app.set('trust proxy', 'loopback')
// Enable CORS, security, compression, favicon and body parsing
app.use(cors())
app.use(helmet())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join(app.get('public'), 'favicon.ico')))
// logging default HTTP calls
app.use(expressWinston.logger({
  winstonInstance: app.get('logger'),
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}} ms',
  statusLevels: false, // default value
  level: function (req, res) {
    var level = ''
    if (res.statusCode >= 100) { level = 'info' }
    if (res.statusCode >= 400) { level = 'warn' }
    if (res.statusCode >= 500) { level = 'error' }
    // Ops is worried about hacking attempts so make Unauthorized and Forbidden critical
    // if (res.statusCode == 401 || res.statusCode == 403) { level = 'critical' }
    return level
  }
}))
// Host the public folder
app.use('/', express.static(app.get('public')))

// Set up Plugins and providers
app.configure(express.rest())
app.configure(socketio())

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
// Set up our services (see `services/index.js`)
app.configure(services)
// Set up event channels (see channels.js)
app.configure(channels)

// must be configured after all services
app.configure(profiler({
  stats: 'detail',
  logger: {
    log: ({ user, request, headers, query, data, error, response }) => {
      const logger = app.get('logger')
      logger.info(`${user} ${request}`)
      if (headers) logger.debug(`${user} Header:\n${headers}`)
      if (query) logger.verbose(`${user} Parameter:\n ${query}`)
      if (data) logger.verbose(`${user} Data:\n ${data}`)
      if (error) logger.error(`${user} ${error}`)
      if (response) logger.verbose(`${user} Response:\n ${response}`)
    }
  },
  logMsg: function (hook) {
    hook._log = hook._log || {}
    const elapsed = Math.round(hook._log.elapsed / 1e5) / 10
    const user = hook.params.payload ? hook.params.payload.userId : '-'
    let header = `${(hook.params.provider || 'INTERNAL').toUpperCase()} /${hook._log.route}/${hook.method}`
    if (hook.id) header += `/${hook.id}`
    const trailer = `${elapsed} ms - ${getPending()} pending`
    // console.log('xxxx ' + util.inspect(hook.params.payload)) // eslint-disable-line
    return {
      user: user,
      request: `${header} ${trailer}`,
      headers: hook.params.headers && Object.keys(hook.params.headers).length ? util.inspect(hook.params.headers) : false,
      query: hook.params.query && Object.keys(hook.params.query).length ? util.inspect(hook.params.query) : false,
      data: hook.data && Object.keys(hook.data).length ? util.inspect(hook.data) : false,
      // error: (hook.error ? clc.red(`${util.inspect(hook)} ${hook.error ? hook.error.message : ''}`) : false),
      error: (hook.error ? clc.red(`${(hook.original || hook.error).type} ${hook.error ? hook.error.message : ''}`) : false),
      response: hook.result ? util.inspect(hook.result) : false
    }
  }
}))

// Format returning error response as JSON
app.use(express.notFound())
app.use(express.errorHandler({
  logger,
  public: path.join(app.get('public'), 'error')
}))

app.hooks(appHooks)

module.exports = app
