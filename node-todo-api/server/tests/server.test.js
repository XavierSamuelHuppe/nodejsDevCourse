const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')
const {todos, populateTodos, users, populateUsers} = require('./seed/seed')

beforeEach(populateUsers)
beforeEach(populateTodos)

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = "this is some text"

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if(err) {
          return done(err)
        }
        return Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch((e) => done(e))
      })
  })

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text:""})
      .expect(400)
      .end((err,res) => {
        if(err) {
          return done(err)
        }
        return Todo.find().then(todos => {
          expect(todos.length).toBe(2)
          done()
        }).catch((e) => done(e))
      })
  })
})

describe('GET /todos', () => {
  it('should return all todos for that user', (done) => {
    request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should return correct todo', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })
  it('should return 404 if todo not found', (done) => {
    var badId = new ObjectID().toHexString()
    request(app)
      .get(`/todos/${badId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .expect((res) => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })
  it('should return 404 for not obj id', (done) => {
    var badId = "123"
    request(app)
      .get(`/todos/${badId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .expect((res) => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })
  it('should not return todo created by other user', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done)
  })
})

describe('DELETE /todos/:id', () => {
  it('should remove the correct todo', (done) => {
    var idToRemove = todos[0]._id.toHexString()
    request(app)
      .delete(`/todos/${idToRemove}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toEqual(todos[0].text)
      })
      .end((err,res) => {
        if(err){
          return done(err)
        }
        Todo.count().then((res) => {
          expect(res).toBe(1)
          return Todo.findById(idToRemove)
        }).then((res) => {
          expect(res).toBe(null)
          done()
        })
        .catch(e => done(e))
      })
  })
  it('should not remove todo of other user', (done) => {
    var idToRemove = todos[0]._id.toHexString()
    request(app)
      .delete(`/todos/${idToRemove}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err,res) => {
        if(err){
          return done(err)
        }
        Todo.count().then((res) => {
          expect(res).toBe(2)
          return Todo.findById(idToRemove)
        }).then((res) => {
          expect(res).toBeDefined()
          done()
        })
        .catch(e => done(e))
      })
  })
  it('should return 404 if todo not found', (done) => {
    var idNotInDb = new ObjectID()
    request(app)
      .delete(`/todos/${idNotInDb}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done)
  })
  it('should return 404 for not object id', (done) => {
    var nonObjectId = 123
    request(app)
      .delete(`/todos/${nonObjectId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done)
  })
})

describe('PATCH /todos/:id', () => {
  it('should update correct todo', (done) => {
    var idToUpdate = todos[0]._id.toHexString()
    var updatedTodo = {
      text: "This is updated",
      completed: true
    }

    request(app)
      .patch(`/todos/${idToUpdate}`)
      .set('x-auth', users[0].tokens[0].token)
      .send(updatedTodo)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(updatedTodo.text)
        expect(res.body.todo.completed).toBe(updatedTodo.completed)
        expect(typeof res.body.todo.completedAt).toBe('number')
      })
      .end((err,res) => {
        if(err){
          return done(err)
        }
        Todo.count().then((res) => {
          expect(res).toBe(2)
          return Todo.findById(idToUpdate)
        }).then((res) => {
          var {text,completed} = res
          expect({text,completed}).toEqual(updatedTodo)
          done()
        })
        .catch(e => done(e))
      })
  })

  it('should not update todo of other users', (done) => {
    var idToUpdate = todos[0]._id.toHexString()
    var updatedTodo = {
      text: "This is updated",
      completed: true
    }

    request(app)
      .patch(`/todos/${idToUpdate}`)
      .set('x-auth', users[1].tokens[0].token)
      .send(updatedTodo)
      .expect(404)
      .end((err,res) => {
        if(err){
          return done(err)
        }
        Todo.count().then((res) => {
          expect(res).toBe(2)
          return Todo.findById(idToUpdate)
        }).then((res) => {
          var {text,completed} = res
          expect({text,completed}).not.toEqual(updatedTodo)
          done()
        })
        .catch(e => done(e))
      })
  })
})

describe('GET /users/me', () => {
  it('should return correct user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString())
        expect(res.body.email).toBe(users[0].email)
      })
      .end(done)
  })

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })
})

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'example@example.com'
    var password = '123bmd!'
    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeDefined()
        expect(res.body._id).toBeDefined()
        expect(res.body.email).toBe(email)
      })
      .end((err) => {
        if(err){
          return done(err)
        }

        User.findOne({email}).then(user => {
          expect(user).toBeDefined()
          expect(user.password).not.toBe(password)
          done()
        }).catch(e => done(e))
      })
  })

  it('should return validation if request is invalid', (done) => {
    var invalidEmail = "notAnEmail"
    var password = '123bmd!'
    request(app)
      .post('/users')
      .send(invalidEmail,password)
      .expect(400)
      .end(done)
  })

  it('should not create user if email in use', (done) => {
    var takenEmail = users[0].email
    var password = '123bmd!'
    request(app)
      .post('/users')
      .send(takenEmail,password)
      .expect(400)
      .end((err) => {
        if(err){
          return done(err)
        }

        User.count().then(count => {
          expect(count).toBe(2)
          done()
        })
      })
  })
})

describe('POST /users/login', () =>{

  it('should login user and return auth token', (done) =>{
    var {email, password} = users[0]
    request(app)
      .post('/users/login')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeDefined()
      }).end((err, res) => {
        if(err){
          return done(err)
        }

        User.findById(users[0]._id).then(user => {
          var {access, token} = user.tokens[1]
          expect({access, token}).toEqual({
            access: 'auth',
            token: res.headers['x-auth']
          })
          done()
        }).catch(e => done(e))
      })
  })

  it('should reject login for non existant email', (done) =>{
    var aNonExistingEmail = "unfindableEmail@carrot.vn"
    request(app)
      .post('/users/login')
      .send({email: aNonExistingEmail, password : "123abc!"})
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeFalsy()
      }).end((err, res) => {
        if(err){
          return done(err)
        }

        User.findById(users[0]._id).then(user => {
          expect(user.tokens.length).toBe(1)
          done()
        }).catch(e => done(e))
      })
  })

  it('should reject login for bad password', (done) =>{
    var {email} = users[0]
    request(app)
      .post('/users/login')
      .send({email, password : "wrong"})
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeFalsy()
      }).end(done)
  })
})

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    var tokenToDelete = users[0].tokens[0].token

    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .send({token: tokenToDelete})
      .expect(200)
      .end((err) => {
        if(err) return done(err)

        User.findOne({_id: users[0]._id}).then((user) => {
          expect(user.tokens.length).toBe(0)
          done()
        }).catch(e => done(e))
      })
  })
})












//.
