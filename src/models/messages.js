module.exports = function (app) {
  const mongoose = app.get('mongoose')
  if (mongoose.models.messages) {
    return mongoose.models.messages
  }

  // const messages = new mongoose.Schema()
  const messages = new mongoose.Schema({
    // _id
    // __v version id
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    text: { type: String },
  }, {
    // createdAt
    // updatedAt
    timestamps: true
  })

  return mongoose.model('messages', messages)
}
