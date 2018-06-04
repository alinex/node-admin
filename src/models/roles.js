module.exports = function (app) {
  const mongoose = app.get('mongoose')
  if (mongoose.models.roles) {
    return mongoose.models.roles
  }

  // const roles = new mongoose.Schema()
  const roles = new mongoose.Schema({
    // _id
    // __v version id
    name: { type: String, required: true },
    description: String,
    disabled: Boolean,
    abilities: [{
      actions: [{ type: String, enum: ['read', 'update', 'create', 'delete'] }],
      subject: [ String ],
      conditions: mongoose.Schema.Types.Mixed,
      fields: [ String ],
      inverted: Boolean,
      reason: { type: String }
    }]
  }, {
    // createdAt
    // updatedAt
    timestamps: true
  })

  return mongoose.model('roles', roles)
}
