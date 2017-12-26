const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

var data = {
  id:10
}

var token = jwt.sign(data, 'mysecret')
console.log("token",token)

var decoded = jwt.verify(token, 'mysecret')
console.log("decoded",decoded)
