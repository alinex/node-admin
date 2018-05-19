module.exports = function (app) {
  const mongoose = app.get('mongoose')
  if (mongoose.models.users) {
    return mongoose.models.users
  }

  const users = new mongoose.Schema({
    // _id
    // __v version id
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nickname: { type: String, unique: true, required: true },
    name: { type: String },
    position: { type: String },
    avatar: { type: String },
    disabled: { type: Boolean, default: true } 
  }, {
    // createdAt
    // updatedAt
    timestamps: true
  })

  return mongoose.model('users', users)
}
