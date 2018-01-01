var socket = io();

socket.on('connect', function() {
  console.log('Connected to server')

  socket.emit('createEmail', {
    to: 'y@ymail.com',
    text: 'Hey, This is Y.'
  })
})

socket.on('disconnect', function() {
  console.log('Disconnected from server')
})

socket.on('newEmail', function(email) {
  console.log('new email received', email)
})

socket.on('newMessage', function(message) {
  console.log('new message received', message)
})
