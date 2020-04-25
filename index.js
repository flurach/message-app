const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


// static files
app.use(express.static('public'))


// sockets
io.on('connection', socket => {
	console.log('Someone is connected!')

	socket.on('message', data =>
	    io.emit('message', data)
	)
	socket.on('disconnect', () =>
		console.log('Someone is disconnected :(')
	)
})


// listen
const PORT = process.PORT || 8080
http.listen(PORT, () => console.log(`Server listening on port ${PORT}`))