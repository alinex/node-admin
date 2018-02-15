const schema = require('./check.schema.js')

function validate(context) {
  return schema.validate(context.params.query) // context.data on create, update, patch
    .then((data) => {
      context.data = data
      return Promise.resolve(context)
    })
    .catch((err) => {
      return Promise.reject(err.text())
    })
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [ validate ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
