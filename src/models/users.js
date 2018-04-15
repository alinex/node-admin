module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  let users = new mongooseClient.Schema({
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

  return mongooseClient.models.users || mongooseClient.model('users', users)
}
