const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: {
    type: String
  },
  parents: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }
})

module.exports = mongoose.model('Category', schema)