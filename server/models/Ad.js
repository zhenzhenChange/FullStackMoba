const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: {
    type: String
  },
  ads: [{
    image: {
      type: String
    },
    url: {
      type: String
    }
  }]
})

module.exports = mongoose.model('Ad', schema)