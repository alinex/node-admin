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

/*
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
  combine: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});
*/

module.exports = logger;
