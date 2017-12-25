const express = require('express')

var app = express()

app.get('/', (req, res) => {
  res.send("Hello world")
})
app.get('/obj', (req, res) => {
  res.status(200).send({name: "Xavier"})
})

app.get('/users', (req, res) => {
  var users = []
  var usernames = ["Xavier", "William", "Boris"]
  usernames.forEach((username) => {
    var newUser = {
      username,
      age: Math.floor(Math.random() * 10 + 20)
    }
    users.push(newUser)
  })
  res.status(200).send(users)
})

app.listen(3000)
module.exports.app = app
