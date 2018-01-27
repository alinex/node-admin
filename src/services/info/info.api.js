module.exports = {
  description: 'A service to get some server information. Use it for debugging and support.',
  definitions: {
    'info list': {
      type: 'object',
      description: 'Page object with info values',
      properties: {
        total: {
          type: 'integer',
          description: 'Total number of records',
        },
        limit: {
          type: 'integer',
          description: 'Max number of items per page',
        },
        skip: {
          type: 'integer',
          description: 'Number of skipped items (offset)',
        },
        data: {
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
  }
}
