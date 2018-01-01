const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user connected')

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room.'))
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat room.'))

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail)
  })

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('This is from the server')
  })

  socket.on('disconnect', () => {
    console.log('User disconnect from server')
  })
})

server.listen(3000, () => {
  console.log(`Started server on port 3000`)
})
