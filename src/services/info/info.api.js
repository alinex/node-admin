module.exports = {
  description: 'A service to get some server information. Use it for debugging and support.',
  find: {
    parameters: [
      {
        description: 'Property to sort results ()',
        in: 'query',
        //name: '$sort[name]',
        //'type': 'integer',
        //'example': 1
        name: '$sort',
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'integer',
              example: 1
            },
            age: {
              type: 'integer',
              example: -1
            }
          },
        },
        style: 'deepObject',
        explode: true
      }
    ]
  },
  definitions: {
    'info list': {
      type: 'array',
      required: [ 'group', 'name', 'value' ],
      items: {
        type: 'object',
        properties: {
          group: {
            type: 'string',
            description: 'Setting group name'
          },
          name: {
            type: 'string',
            description: 'The name of the setting'
          },
          value: {
            description: 'The current value'
          }
        }
      }
    }
  }
}
