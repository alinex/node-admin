const winston = require('winston')
const wcf = require('winston-console-formatter')

function init () {
  return function () {
    let app = this

    const { formatter } = wcf({
      meta: false
    })
    const logger = new (winston.Logger)({
      transports: [
        new winston.transports.Console({
          json: false,
          level: app.get('loglevel'),
          colorize: true,
          formatter,
          timestamp: function () {
            let d = new Date()
            let offset = d.getTimezoneOffset() / 60
            d.setHours( d.getHours() - offset )
            return d.toISOString().replace('T', ' ').replace('Z', '')
          }
        })
      ]
    })

    app.set('logger', logger)
  }
}

module.exports = init
module.exports.default = init
