# Module

## Storage

### Mongo DB based

For a mongo DB based service you need a model like:

    module.exports = function (app) {
      const mongooseClient = app.get('mongooseClient')
      const users = new mongooseClient.Schema({
        email: { type: String, unique: true },
        password: { type: String },
        nickname: { type: String, unique: true },
        name: { type: String },
        position: { type: String }
      }, { timestamps: true })
      return mongooseClient.model('users', users)
    }

See the possible Schema definitions in the [mongoose docs](http://mongoosejs.com/docs/schematypes.html) and the possible
[options](http://mongoosejs.com/docs/api.html#schema_Schema).

