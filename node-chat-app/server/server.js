const path = require('path')
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user connected')

  socket.on('disconnect', () => {
    console.log('User disconnect from server')
  })
})

server.listen(3000, () => {
  console.log(`Started server on port 3000`)
})
