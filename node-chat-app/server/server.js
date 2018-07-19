const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '..', 'public')));

io.on('connection', socket => {
	console.log('new user connected');

	// to client
	socket.emit('newEmail', {
		from: 'mike@example',
		text: 'Hey. what is going on.',
		createdAt: 123,
	});

	// from client
	socket.on('createEmail', newEmail => {
		console.log('createEmail', newEmail);
	});

    // from client and to client
	socket.on('createMessage', function(message) {
		socket.emit('newMessage', message);
	});

	socket.on('disconnect', () => {
		console.log('user was disconnected.');
	});
});

server.listen(port, () => {
	console.log(`server is start on port ${port}`);
});
