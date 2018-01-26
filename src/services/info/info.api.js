module.exports = {
  description: 'A service to get some server information. Use it for debugging and support.',
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
