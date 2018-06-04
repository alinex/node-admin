module.exports = {
  // Describe API for swagger
  description: 'Basic service to get the roles which defines the access rights',
  definitions: {
    roles: {
      type: 'object',
      required: [ 'name', 'abilities' ],
      properties: {
        name: {
          type: 'string',
          description: 'Name for the access role'
        },
        description: {
          type: 'string',
          description: 'Summary of the ability rules'
        },
        _id: {
          type: 'string',
          description: 'The id of the role'
        }
      }
    },
    'roles list': {
      type: 'array',
      items: {
        $ref: '#/definitions/roles'
      }
    }
  }
}
