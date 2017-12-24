const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()
hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine', 'hbs')


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

// app.use((req,res,next) => {
//   res.render('maintenance.hbs', {
//     text: "Site is being updated, we'll be back soon."
//   })
// })

app.use(express.static(__dirname + "/public"))

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())

hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>')
  // res.send({
  //   name: "Xavier",
  //   occupation: "Travelling around SEA",
  //   likings: [
  //     {
  //       name: "gaming",
  //       hoursPerWeek: 5
  //     },
  //     {
  //       name: "Programming",
  //       hoursPerWeek: 30
  //     }
  //   ]
  // })
  res.render('home.hbs', {
    pageTitle : 'Home Page',
    text : "This is my templated text"
  })
})

app.get('/about', (req, res) => {
  // res.send('about page')
  res.render('about.hbs', {
    pageTitle : 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({errorMessage: "shame."})
})

app.listen(3000, () => {
  console.log("Server is up on port 3000")
})
