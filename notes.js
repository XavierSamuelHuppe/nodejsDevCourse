USEFUL COMMANDS FROM TERMINAL:
node:
  //start app
  node app.js
  //start app with server restart on file change
  nodemon app.js
    //flag to say what we want to watch
    nodemon server.js -e js,hbs
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
  //web server
  express
    //template engine (handlebar)
    hbs
      //set hbs
      const hbs = require('hbs')
      var app = express()
      app.set('view engine', 'hbs')
      //use it, have about.hbs in ./views
      app.get('/about', (req, res) => {
        res.render('about.hbs')
      })

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
  //EC5
  var add = function (a, b) {return a+b}
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
