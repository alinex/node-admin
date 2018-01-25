const assert = require('assert');
const app = require('../../src/app');

describe('\'info\' service', () => {
  it('registered the service', () => {
    const service = app.service('info');

    assert.ok(service, 'Registered the service');
  });
});
