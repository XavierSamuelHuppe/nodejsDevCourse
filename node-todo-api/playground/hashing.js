const {SHA256} = require('crypto-js')
const bcrypt = require('bcryptjs')

//example of hash
var message = "I am user number 3"
var hash = SHA256(message).toString()
console.log('message', message)
console.log('hash', hash)

//example of server security leak using token modifications
//WHAT THE SERVER RETURNS
var data = {
  id : 4
}
var token = {
  data,
  hash: SHA256(JSON.stringify(data) + "somesecret").toString()
}

//MAN IN THE MIDLE CHANGING HIS PLAYLOAD AND SENDING IT BACK
token.data.id = 5
token.hash = SHA256(JSON.stringify(token.data)).toString()

//server checks
var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
if(resultHash === token.hash){
   console.log("data was not changed")
}else{
  console.log("data was changed, do not trust!")
}
