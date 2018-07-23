var socket = io();

socket.on('connect', function() {
	console.log('connected to server');

	// emit to server
	// socket.emit('createEmail', {
	// 	to: 'cx1@example.com',
	// 	text: 'Hey. This is cx',
	// });

	// send message
	// socket.emit('createMessage', { from: 'cx', text: 'Hello, This is cx.' });

	// from admin text 'welcome to the chat app'
});

socket.on('disconnect', function() {
	console.log('disconnected from server');
});

// socket.on('newEmail', function(email) {
// 	console.log('New Email', email);
// });

// recieve message
socket.on('newMessage', function(message) {
	// console.log('newMessage', message);
	var formattedTime = moment(message.createdAt).format('h:mm a');

	var li = $('<li></li>');
	li.text(`${message.from} ${formattedTime}: ${message.text}`);

	$('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var li = $('<li></li>');
	var a = $('<a target="_blank">My current location</a>');

	li.text(`${message.from} ${formattedTime}: `);
	a.attr('href', message.url);
	li.append(a);

	$('#messages').append(li);
});

// socket.emit('createMessage', { from: 'Frank', text: 'Hi' }, function(data) {
// 	console.log('Got it', data);
// });

$('#message-form').on('submit', function(e) {
	e.preventDefault();

	var messageTextbox = $('[name=message]');

	socket.emit(
		'createMessage',
		{
			from: 'User',
			text: messageTextbox.val(),
		},
		function() {
			messageTextbox.val('');
		},
	);
});

var locationButton = $('#send-location');

locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(
		function(position) {
			locationButton.removeAttr('disabled').text('Send location');
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		},
		function() {
			locationButton.removeAttr('disabled').text('Send location');
			alert('Unable to fetch location.');
		},
	);
});
