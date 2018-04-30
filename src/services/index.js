const { readdirSync, statSync, existsDync } = require('fs')
const { join } = require('path')

module.exports = function (app) {
  const logger = app.get('logger')
  // find sub directories
  const dirs = readdirSync(__dirname)
  .filter(f => statSync(join(__dirname, f)).isDirectory())
  // load services
  dirs.forEach(e => {
    logger.debug(`Loading ${e} service...`)
    app.configure(require(`./${e}`))
  })
}
