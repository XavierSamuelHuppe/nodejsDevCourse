const {SHA256} = require('crypto-js')
const bcrypt = require('bcryptjs')

var password = "abc123!"

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash)
  })
})

var hashedPasword = "$2a$10$0Nv/c8j5o4CKi0fy4VQxKuxaP4xdswt8.Lr457wTiZmp3mq2p8.Ma"

bcrypt.compare(password, hashedPasword, (err, res) => {
  console.log(res)
})
