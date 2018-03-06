const val = require('alinex-validator/dist/builder')

const schema = new val.Object()
  .key('host', new val.DomainSchema().checkDNS()
    .title('Hostname')
    .description('the name under which the server is called primarily'))

module.exports = schema
