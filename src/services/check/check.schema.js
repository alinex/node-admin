const val = require('alinex-validator/dist/builder')

const schema = new val.Object()
  .key('title', new val.String().allow(['Dr.', 'Prof.']))
  .key('name', new val.String().min(3).required())
  .key('street', new val.String().min(3).required())
  .key('plz', new val.Number().required()
    .positive().max(99999)
    .format('00000'))
  .key('city', new val.String().required().min(3))

module.exports = schema
