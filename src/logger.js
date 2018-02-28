const winston = require('winston')
const wcf = require('winston-console-formatter')

const { formatter } = wcf({
  meta: false
})
const logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      json: false,
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

module.exports = logger
