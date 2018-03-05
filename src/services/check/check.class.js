const checks = {
  base: () => {
    const start = new Date()
    return {
      status: true,
      message: 'Base check that server is running',
      time: new Date() - start
    }
  }
}

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {}
  }

  async find (params) {
    return Object.keys(checks).map((k) => Object.assign({check: k}, checks[k]()))
  }

  async get (check, params) {
    return Object.assign({check}, checks[check]())
  }

}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service
