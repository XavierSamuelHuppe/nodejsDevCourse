const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todos = [
  {
    _id: new ObjectID(),
    text: "First todo"
  },
  {
    _id: new ObjectID(),
    text: "second todo"
  }
]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done())
})

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = "this is some text"

    request(app)
      .post('/todos')
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
  it('should return all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should return correct todo', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
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
      .expect(404)
      .expect((res) => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })
})

describe('DELETE /todos/:id', () => {
  it('should remove the correct todo', (done) => {
    var idToRemove = todos[0]._id.toHexString()
    request(app)
      .delete(`/todos/${idToRemove}`)
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
  it('should return 404 if todo not found', (done) => {
    var idNotInDb = new ObjectID()
    request(app)
      .delete(`/todos/${idNotInDb}`)
      .expect(404)
      .end(done)
  })
  it('should return 404 for not object id', (done) => {
    var nonObjectId = 123
    request(app)
      .delete(`/todos/${nonObjectId}`)
      .expect(404)
      .end(done)
  })
})
