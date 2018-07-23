const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage,generateLocationMessage } = require('./utils/message');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '..', 'public')));

io.on('connection', socket => {
	console.log('new user connected');

	//#region newEmail example
	// to client
	// socket.emit('newEmail', {
	// 	from: 'mike@example',
	// 	text: 'Hey. what is going on.',
	// 	createdAt: 123,
	// });

	// from client
	// socket.on('createEmail', newEmail => {
	// 	console.log('createEmail', newEmail);
	// });
	//#endregion

	// from client and to client
	socket.emit(
		'newMessage',
		generateMessage('Admin', 'Welcome to the chat app'),
	);

	socket.broadcast.emit(
		'newMessage',
		generateMessage('Admin', 'New user joined'),
	);

	socket.on('createMessage', (message, callback) => {
		// send all clients
		// io.emit('newMessage', message);
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();

		// use broadcast to emit all the other socket client.
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime(),
		// });
	});

	socket.on('createLocationMessage', coords => {
		io.emit(
			'newLocationMessage',
			generateLocationMessage('Admin', coords.latitude, coords.longitude),
		);
	});

	socket.on('disconnect', () => {
		console.log('user was disconnected.');
	});
});

server.listen(port, () => {
	console.log(`server is start on port ${port}`);
});
