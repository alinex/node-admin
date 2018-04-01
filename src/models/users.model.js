module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const users = new mongooseClient.Schema({

    // _id
    // __v version id
    email: { type: String, unique: true },
    password: { type: String },
    nickname: { type: String, unique: true },
    name: { type: String },
    position: { type: String }

  }, {
    // createdAt
    // updatedAt
    timestamps: true
  })

  return mongooseClient.model('users', users)
}
