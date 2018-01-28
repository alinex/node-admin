module.exports = {
  description: 'A service to get some server information. Use it for debugging and support.',
  find: {
    parameters: [
      { description: 'Number of results to return',
        in: 'query',
        name: '$limit',
        type: 'integer'
      },
      {
        description: 'Number of results to skip',
        in: 'query',
        name: '$skip',
        type: 'integer'
      },
      {
        description: 'Property to sort results ()',
        in: 'query',
        name: '$sort',
        'type': 'array',
        'items': {
          'type': 'string'
        },
      }
    ]
  },
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
