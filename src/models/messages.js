module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  if (mongooseClient.models.messages) {
    return mongooseClient.models.messages
  }

  const messages = new mongooseClient.Schema({
    // _id
    // __v version id
    email: { type: String, unique: true },
    password: { type: String },
    nickname: { type: String, unique: true },
    name: { type: String },
    position: { type: String },
    avatar: { type: String },
    disabled: { type: Boolean }    

  }, {
    // createdAt
    // updatedAt
    timestamps: true
  })

  return mongooseClient.model('messages', messages)
}
