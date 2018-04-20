module.exports = function (app) {
  const mongoose = app.get('mongoose')
  if (mongoose.models.users) {
    return mongoose.models.users
  }

  const users = new mongoose.Schema({
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

  return mongoose.model('users', users)
}
