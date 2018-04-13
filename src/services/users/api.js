module.exports = {
  // Describe API for swagger
  description: 'Basic service to get the users to be used for accessing this application',
  definitions: {
    users: {
      type: 'object',
      required: [ 'email', 'password' ],
      properties: {
        email: {
          type: 'string',
          description: 'Email address as unique identifier',
          example: 'info@alinex.de'
        },
        password: {
          type: 'string',
          description: 'Secret password (make it unguessable)'
        },
        _id: {
          type: 'string',
          description: 'The id of the user'
        }
      }
    },
    'users list': {
      type: 'array',
      items: {
        $ref: '#/definitions/users'
      }
    }
  }
}
