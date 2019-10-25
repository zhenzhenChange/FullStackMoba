const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: {
    type: String
  },
  icon: {
    type: String
  }
})

module.exports = mongoose.model('Item', schema)