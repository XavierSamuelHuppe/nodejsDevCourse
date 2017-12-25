const mongoose = require('mongoose')

var User = mongoose.model('User', {
  email: {
    type: 'string',
    required: true,
    minlength: 1,
    trim: true
  }
})

module.exports = {User}
