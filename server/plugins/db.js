module.exports = app => {
  const mongoose = require('mongoose')

  mongoose.set('useFindAndModify', false)

  mongoose.connect('mongodb://127.0.0.1:27017/fullstack', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  require('require-all')(__dirname + '/../models')
}