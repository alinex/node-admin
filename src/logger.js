const winston = require('winston');
const wcf = require('winston-console-formatter');

const { formatter, timestamp } = wcf({ meta: false });

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize: true,
      formatter,
      timestamp
    })
  ]
});

module.exports = logger;
