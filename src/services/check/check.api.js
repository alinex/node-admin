module.exports = {
  description: 'A service to check that everything works fine.',
  definitions: {
    check: {
      type: 'object',
      required: [ 'check', 'status' ],
      properties: {
        check: {
          type: 'string',
          description: 'The name of the check'
        }
      },
      status: {
        type: 'boolean',
        description: 'Flag showing if this parts works like defined'
      },
      message: {
        type: 'string',
        description: 'An optional message from the check'
      },
      time: {
        type: 'integer',
        description: 'Number of seconds used to check'
      },
    },
    'check list': {
      type: 'array',
      items: {
        $ref: '#/definitions/check'
      }
    }
  }
}
