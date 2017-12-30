require('./config/config');
var port = process.env.PORT

const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
var {authenticate} = require('./middleware/authenticate')

var app = express()

app.use(bodyParser.json())

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user)
})

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ["email", "password"])
  var newUser = new User(body)
  newUser.save().then(() => {
    return newUser.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(newUser)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ["email", "password"])

  User.findByCredentials(body.email, body.password).then(user => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user)
    })
  }).catch(e => {
    res.status(400).send()
  })
})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
})

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
    if(!todo){
      return res.status(404).send()
    }
    res.status(200).send({todo})
  }, e => {
    res.status(404).send()
  })
})

app.delete('/todos/:id', (req, res) => {
  var id = req.params["id"]
  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send()
    }

    res.send({todo})
  }).catch(e => {
    res.status(400).send()
  })
})

app.patch('/todos/:id', (req, res) => {
  var id = req.params["id"]
  var body = _.pick(req.body, ['text', 'completed'])

  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }

  if (body.completed && _.isBoolean(body.completed)) {
    body.completedAt = new Date().getTime()
  }else{
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, {
    $set: {
      text: body.text,
      completed: body.completed,
      completedAt: body.completedAt
    }
  },{
    new: true
  }).then(todo => {
    if(!todo){
      return res.status(404).send()
    }
    res.status(200).send({todo})
  }).catch(e => res.status(400).send())
})

app.listen(port, () => {
  console.log(`Started server on port ${port}`)
})

module.exports = {app}
