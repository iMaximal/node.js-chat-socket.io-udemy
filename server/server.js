const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage } = require('./utils/message')


const publicPath = path.join(__dirname, '../public')
const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message) => {
    console.log('createMessage', message)
    // send to everybody
    io.emit('newMessage', generateMessage(message.from, message.text))
    // send to all, but not sender
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime(),
    // })
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})
