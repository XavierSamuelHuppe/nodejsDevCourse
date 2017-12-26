const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  var newTodo = new Todo({
    text: req.body.text
  })
  newTodo.save().then((doc) => {
    res.status(200).send(doc)
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.send(e)
  })
})

app.get('/todos/:id', (req, res) => {
  var id = req.params["id"]
  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }
  Todo.findById(id).then(todo => {
    res.status(200).send(todo)
  }, e => {
    res.status(400).send()
  })
})

app.listen(3000, () => {
  console.log("Started server on port 3000")
})

module.exports = {app}
