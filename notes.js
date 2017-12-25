USEFUL COMMANDS FROM TERMINAL:
node:
  //start app
  node app.js
  //start app with server restart on file change
  nodemon app.js
    //flag to say what we want to watch
    nodemon server.js -e js,hbs
    //flag to say we're executing a command, not necessarily a node file
    -x "npm test"
  //start app with debugger
  node inspect app.js
    //continue (resume)
    c
    //next statement
    n
    //enter dynamic
    repl
      //can ask for variable and execute code
  //inspect with attach to chrome debugger
  node --inspect-brk app.js
    -go to "chrome://inspect" in Chrome
    -click on "open dedicated DevTool for Node"

npm:
  //init new npm-managed project
  npm init
  //install
  npm i ...
  //install nodemon globally
  npm i nodemon -g
  // install a package and save its dependency in project package.json
  npm i lodash --save

usefull modules:
  //better node command arguments handling
  yargs
  //plenty of usefull stuff for arrays and more
  lodash
  //make HTTP request!
  request
  //make HTTP request, with promises!
  axios
  //body parser for express
  body-parser
    const bodyParser = require('body-parser')
    app.use(bodyParser.json())
  //web server
  express
    //classic route
    app.get('/', (req, res) => {
      res.send("Hello world")
    })
    app.get('/', (req, res) => {
      res.status(200).json({name: "Xavier"})
    })
    //middlewire function
    app.use((req, res, next) => {
      var now = new Date().toString()
      var log = `${req.method} call to ${req.originalUrl} at ${now}`
      console.log(log)
      fs.appendFile('server.log', log + "\n", (err) => {
        if(err){
          console.log('Unable to append to log file')
        }
      })
      next()
    })
    //set a folder to serve static stuff
    app.use(express.static(__dirname + "/public"))
    //template engine (handlebar)
    hbs
      //set hbs
      const hbs = require('hbs')
      var app = express()
      hbs.registerPartials(__dirname + "/views/partials")
      app.set('view engine', 'hbs')
      //use it, have about.hbs in ./views
      app.get('/about', (req, res) => {
        res.render('about.hbs')
      })

  //Mocha test framework
  mocha
  //expect assertions library
  //https://github.com/mjackson/expect
  //also contains spies
  expect
  //test framework for REST API
  //(imported as request)
  supertest
  //mocks dependency injection for tests
  rewire
  //self-explanatory
  mongodb
  //schemas for MongoDB
  mongoose

JAVASCRIPT REMINDERS:
  //global accessible variable (vs document and window in browser)
  global, process, module

  //import modules from npm
  var _ = require('lodash')
  //import other files, with relative path
  var notesRepo = require('./notes.js')
  var notesRepo = require('./notes') //same thing

  //EC6 features
  //http://es6-features.org/
  //object deconstruction
  var user = {name:"Xavier", age: 24}
  var {name} = user //{name:"Xavier"}
  //arrow function
  var add = (a,b) => {return a+b}
  //if only one line inside, can also do that without typing return
  notes.filter(note => note.title !== title)
  //promises and chaining promises
  var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(typeof a === 'number' && typeof b === 'number'){
          resolve(a+b)
        } else {
          reject('Arguments must be numbers')
        }
      }, 500)
    })
  }
  asyncAdd(8,5)
  .then((result) => {
    return asyncAdd(result, 33)
  }).then((result) => {
    console.log(result)
  }).catch(() => {
    console.log("Something in the chain went wrong")
  })


  //export stuff, one at a time
  module.exports.add = function (a,b) {return a+b}
  //to export stuff from a file, add them to module.exports
  module.exports = {
    addNote,
    getAll
  }

  //JSON object usage
  JSON.stringify(obj)
  JSON.parse(objString)
  //pretty print, second argument is filter, third is indent spacing length
  JSON.stringify(body, undefined, 2)

  //encode and decode to and from URI
  encodeURIComponent("1301 lombard street philadelphia")
  decodeURIComponent("1301%20lombard%20street%20philadelphia")

  //Setup functions on object literals
  //Must use specific syntax
  var user = {
    name : "Xavier",
    sayHi: () => {
      console.log(arguments) //Does not work
      console.log(`Hi. I'm ${this.name}`)
    },
    sayHiAlt () {
      console.log(arguments) //Does work!
      console.log(`Hi. I'm ${this.name}`)
    }
  }
  user.sayHi() //Output "Hi. I'm undefined"
  user.sayHiAlt() //Output "Hi. I'm Xavier"

TESTING WITH MOCHA AND EXPECT
  //cool scripts
  //test is npm known. "npm test" works
  //test-watch is not, must use "npm run test"
  //create files with test.js extensions for mocha to pick up (or any)
  "scripts": {
    "test": "mocha **/*.test.js",
    "test-watch": "nodemon -x 'npm test'"
  }

  //describe() and it()
  describe('Utils', () => {
    describe('add', () => {
      it('should add two numbers', () => {
        ...
      })
    })
    describe('square', () => {
      it('should square a numbers', () => {
        ...
      })
    })
  })

  //test examples
  module.exports.add = (a, b) => a + b //in imported utils.js file
  it('should add two numbers', () => {
    var res = utils.add(33, 11)
    expect(res).toBe(44).toBeA('number')
  })
  it('object tests', () => {
    expect({name:"Xavier"}).toBe({name:"Xavier"}) //NOT GOOD for object
    expect({name:"Xavier"}).toEqual({name:"Xavier"}) //GOOD for object
    expect({name: "Xavier", age: "24"}).toInclude({age: 24}) //green
    expect({name: "Xavier", age: "24"}).toInclude({age: 23}) //red
  })
  //async testing
  //use done() passed as argument to mocha to tell when you're done
  module.exports.asyncAdd = (a, b, callback) => {
    setTimeout(() => {
      callback(a+b)}
      , 1000)
  }
  it('asyncAdd should add two numbers', (done) => {
    utils.asyncAdd(4,3, (sum) => {
      expect(sum).toBeA('number').toBe(7)
      done()
    })
  })

  //spies
  describe('App', () => {
    it('should call the spy correctly', () => {
      var spy = expect.createSpy()
      spy('Xavier', 25)
      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith("Xavier", 25)
    })
  })
  //rewire
  const rewire = require('rewire')
  var app = rewire('./app')
  describe('App', () => {
    var db = {
      saveUser: expect.createSpy()
    }
    app.__set__('db', db) //<--- this is a dependency of app.js (require db...)
    it('should call saveUser with user object', () => {
      var email = 'anEmail@someMail.com'
      var password = 'aPass'
      app.handleSignup(email,password)
      expect(db.saveUser).toHaveBeenCalledWith({
        email,
        password
      })
    })
  })


TESTING REST API
  //easy example
  //server.js
    const express = require('express')
    var app = express()
    app.get('/', (req, res) => {
      res.send("Hello world")
    })
    app.listen(3000)
    module.exports.app = app // <--- must export app
  //server.test.js
    const request = require('supertest') // <---require supertest
    const app = require('./server').app
    it('should return hello world response', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Hello world')
        .end(done)
    })

  //pipe in to expect framework to have more grip
  //for route
    app.get('/obj', (req, res) => {
      res.status(200).send({name: "Xavier"})
    })
  //test
    it('pipe in to expect framework', (done) => {
      request(app)
        .get('/obj')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({name: "Xavier"}) //<--- actual expect framework (const expect = require('expect'))
        })
        .end(done)
    })
  //test POST
  beforeEach((done) => {
    Todo.remove({}).then(() => done())
  })
  describe ('POST /todos', () => {
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
          return Todo.find().then((todos) => {
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
            expect(todos.length).toBe(0)
            done()
          }).catch((e) => done(e))
        })
    })
  })

MONGO DB
  //vocabulary
    SQL         NOSQL
    table       collection
    row         document
    column      field
  //Useful
  _id //is created by the database unless we specify one
  _id.getTimeStamp() //gives time when document was created

  //setup it
  ~/dev/mongo-data //<--- new folder to hold data
  ~/dev/mongo/bin //<--- inside installation folder
    ./mongod --dbpath ~/dev/mongo-data //<--- start server
  //use it in mongo cli
    ./mongo
      db.Todos.insert({text:'Be happy'})
      db.Todos.find()
  //use it in node
  const {MongoClient, ObjectID} = require('mongodb') //obj deconstruction

  MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
      return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')

    db.collection('Todos').insertOne({
      text: 'Something to do',
      completed: false
    }, (err, result) => {
      if(err){
        return console.log('Unable to insert todo', err)
      }
      console.log(JSON.stringify(result.ops, undefined, 2))
    })

    db.close()
  })
  //find return a cursor
  //a cursor as a lot of functions including toArray
  //toArray returns a promise
  db.collection('Todos').find().toArray().then((docs) => {
    console.log('Todos')
    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log('Unable to fetch todos')
  })
  //find with filters
  db.collection('Todos').find({completed: false}).toArray().then((docs) => {...}
  //tricks with ObjectID
  db.collection('Todos').find({_id: new ObjectID('5a4097f1fbe292b3322fa9e5')}).toArray().then((docs) => {... }
  //delete
  //deleteMany
  db.collection('Todos').deleteMany({text:"eat lunch"}).then((result) => {
    console.log(result)
  })
  //deleteOne
  db.collection('Todos').deleteOne({text:"eat lunch"}).then((result) => {
    console.log(result)
  })
  //findOneAndDelete
  db.collection('Todos').findOneAndDelete({text:"eat lunch"}).then((result) => {
    console.log(result)
  })

MONGOOSE
  //Validators
  //http://mongoosejs.com/docs/validation.html
  const mongoose = require('mongoose')

  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost:27017/TodoApp')

  var Todo = mongoose.model('Todo', { //<--- model creation
    text: {
      type: 'string',
      required: true,
      minlength: 1,
      trim: true //<--- trim spaces!
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Number
    }
  })








  .
