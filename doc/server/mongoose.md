# Mongo DB Services

To connect to Mongo DB we use the [mongoose](http://mongoosejs.com/) ORM system.

For a mongo DB based service you need a model like `src/models/users.js`:

    module.exports = function (app) {
      const mongoose = app.get('mongoose')
      if (mongoose.models.users) {
        return mongoose.models.users
      }
      const users = new mongoose.Schema({
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        nickname: { type: String, unique: true, required: true },
        name: { type: String },
        position: { type: String }
      }, { timestamps: true })
      return mongoose.model('users', users)
    }

See the possible Schema definitions in the [mongoose docs](http://mongoosejs.com/docs/schematypes.html) and the possible
[options](http://mongoosejs.com/docs/api.html#schema_Schema).

The service itself may look like `src/services/users/index.js`:

    const createService = require('feathers-mongoose')
    const createModel = require('../../models/users')
