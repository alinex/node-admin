
/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {}
  }

  async find (params) {
    return Object.keys(this.options.Model).map((k) => Object.assign({check: k}, this.options.Model[k]()))
  }

  async get (check, params) {
    return Object.assign({check}, this.options.Model[check]())
  }

}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service
