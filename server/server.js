const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')


const publicPath = path.join(__dirname, '../public')
const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.')
    }

    socket.join(params.room)
    // socket.leave('The Office Fans');

    // io.emit -> io.to('The Office Fans').emit
    // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
    // socket.emit

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))

    callback()
  })

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)
    // send to everybody
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback()
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})
