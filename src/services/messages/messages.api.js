module.exports = {
  description: 'A service to send and receive messages',
  definitions: {
    messages: {
      type: 'object',
      required: [
        'text'
      ],
      properties: {
        text: {
          type: 'string',
          description: 'The message text'
        },
        userId: {
          type: 'string',
          description: 'The id of the user that sent the message'
        }
      }
    },
    'messages list': {
      type: 'array',
      items: {
        $ref: '#/definitions/messages'
      }
    }
  }
}
