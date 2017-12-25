const request = require('supertest')
const app = require('./server').app
const expect = require('expect')

it('should return hello world response', (done) => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Hello world')
    .end(done)
})

it('pipe in to expect framework', (done) => {
  request(app)
    .get('/obj')
    .expect(200)
    .expect((res) => {
      expect(res.body).toEqual({name: "Xavier"})
    })
    .end(done)
})

it('should have 3 users', (done) => {
  request(app)
    .get('/users')
    .expect(200)
    .expect((res) => {
      expect(res.body.length).toBe(3)
    })
    .end(done)
})

it('should have Xavier', (done) => {
  request(app)
    .get('/users')
    .expect(200)
    .expect((res) => {
      var xavier = res.body.filter((user) => user.username === "Xavier")
      expect(xavier[0]).toInclude({username: "Xavier"})
    })
    .end(done)
})
