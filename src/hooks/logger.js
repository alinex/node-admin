
// A hook that logs service method before, after and error
const logger = require('winston')
const util = require('util')

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    let message = `${context.type}: ${context.path} - Method: ${context.method}`

    if (context.type === 'error') {
      message += `: ${context.error.message}`
    }

    logger.info(message)
    logger.info(util.inspect(context.error))
    logger.debug('context.data', context.data)
    logger.debug('context.params', context.params)

    if(context.result) {
      logger.debug('context.result', context.result)
    }

    if(context.error) {
      logger.error(context.error)
    }

    return context
  }
}
