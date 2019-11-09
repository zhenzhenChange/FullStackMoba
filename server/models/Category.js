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

schema.virtual('children', {
  localField: '_id',
  foreignField: 'parents',
  justOne: false,
  ref: 'Category'
})

schema.virtual('newList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

module.exports = mongoose.model('Category', schema)