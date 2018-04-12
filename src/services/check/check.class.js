
/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {}
  }

  async find (params) {
    const list = []
    for (const name in this.options.Model) {
      const res = await this.options.Model[name]()
      list.push(Object.assign({check: name}, res))
    }
    return list
  }

  async get (check, params) {
    return Object.assign({check}, await this.options.Model[check]())
  }

}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service
