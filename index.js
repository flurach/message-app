const PORT = 8080

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    console.log('Someone is connected!')

    socket.on('message', data => io.emit('message', data))

    socket.on('disconnect', () => console.log('Someone is disconnected :('))
})

app.use(express.static('public'))
http.listen(PORT, () => console.log(`Server listening on port ${8080}`))