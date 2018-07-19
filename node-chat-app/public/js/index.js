var socket = io();

socket.on('connect', function() {
	console.log('connected to server');

	// emit to server
	socket.emit('createEmail', {
		to: 'cx1@example.com',
		text: 'Hey. This is cx',
	});

	// send message
	socket.emit('createMessage', { from: 'cx', text: 'Hello, This is cx.' });
});

socket.on('disconnect', function() {
	console.log('disconnected from server');
});

socket.on('newEmail', function(email) {
	console.log('New Email', email);
});

// recieve message
socket.on('newMessage', function(message) {
	console.log('newMessage', message);
});
