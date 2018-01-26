/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {}
  }

  async find (params) {
    return []
  }

  async get (check, params) {
    return {
      check, status: true, message: `A new check with name: ${check}!`
    }
  }

}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service
