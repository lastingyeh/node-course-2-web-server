const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

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

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required');
		}
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		// socket.leave('The Office Fans');

		// io.emit -> io.to('The Office Fans').emit
		// socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
		// socket.emit ->
		io.to(params.room).emit(
			'updateUserList',
			users.getUserList(params.room),
		);

		socket.emit(
			'newMessage',
			generateMessage('Admin', 'Welcome to the chat app'),
		);

		socket.broadcast
			.to(params.room)
			.emit(
				'newMessage',
				generateMessage('Admin', `${params.name} has joined.`),
			);

		callback();
	});

	socket.on('createMessage', (message, callback) => {
		const user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
			io.to(user.room).emit(
				'newMessage',
				generateMessage(user.name, message.text),
			);
		}
		// send all clients
		// io.emit('newMessage', message);
		// console.log('createMessage', message);
		callback();

		// use broadcast to emit all the other socket client.
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime(),
		// });
	});

	socket.on('createLocationMessage', coords => {
		const user = users.getUser(socket.id);

		if (user) {
			io.to(user.room).emit(
				'newLocationMessage',
				generateLocationMessage(
					user.name,
					coords.latitude,
					coords.longitude,
				),
			);
		}
	});

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit(
				'updateUserList',
				users.getUserList(user.room),
			);
			io.to(user.room).emit(
				'newMessage',
				generateMessage('Admin', `${user.name} has left.`),
			);
		}
	});
});

server.listen(port, () => {
	console.log(`server is start on port ${port}`);
});
