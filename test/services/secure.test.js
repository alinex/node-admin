const assert = require('assert')
const app = require('../../src/app')

describe('\'secure\' service', () => {
  it('registered the service', () => {
    const service = app.service('secure')

    assert.ok(service, 'Registered the service')
  })
})
