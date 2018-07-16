const express = require('express');
const bodyParser = require('body-parser');

require('./db/mongoose');

const Todo = require('./models/todo');
const User = require('./models/user').default;

const app = express();

// for x-www-form-urlencoded data
app.use(bodyParser.urlencoded({ extended: false }));
// for json data
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({ text: req.body.text });

	todo.save().then(
		doc => {
			res.send(doc);
		},
		e => {
			res.status(400).send(e);
		},
	);
});

app.get('/todos', (req, res) => {
	Todo.find().then(
		todos => {
			res.send({ todos });
		},
		e => {
			res.status(400).send(e);
		},
	);
});

app.listen(3000, () => {
	console.log('Started on port 3000');
});

module.exports = app;
