const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


// state
let peopleCount = 0


// static files
app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))


// methods
const htmlEncode = s => s
	.replace(/&/g, "&amp;")
	.replace(/>/g, "&gt;")
	.replace(/</g, "&lt;")
	.replace(/"/g, "&quot;")


// sockets
io.on('connection', socket => {
	console.log('Someone is connected!')
	io.emit('peopleCount', ++peopleCount)

	socket.on('message', data => {
		data.content = htmlEncode(data.content)
		io.emit('message', data)
	})
	socket.on('disconnect', () => {
		console.log('Someone is disconnected :(')
		io.emit('peopleCount', --peopleCount)
	})
})


// listen
const PORT = process.env.PORT || 8080
http.listen(PORT, () => console.log(`Server listening on port ${PORT}`))