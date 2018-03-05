module.exports = {
  description: 'Check that everything works fine on the server.',
  idType: 'string',
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
      check: {
        type: 'string',
        description: 'short name of the check'
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
        description: 'Number of milliseconds used to check'
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
