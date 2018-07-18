require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { ObjectId } = require('mongoose').Types;
require('./db/mongoose');

const Todo = require('./models/todo');
const User = require('./models/user');

const { authenticate } = require('./middleware/authenticate');

const app = express();

// for x-www-form-urlencoded data
app.use(bodyParser.urlencoded({ extended: false }));

// for json data
app.use(bodyParser.json());

// Todos
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

app.get('/todos/:id', (req, res) => {
	const id = req.params.id;

	// Valid id using isValid
	if (!ObjectId.isValid(id)) {
		// 404 - send back empty
		return res.status(404).send();
	}

	// findById
	Todo.findById(id)
		.then(todo => {
			// success
			if (!todo) {
				return res.status(404).send();
			}
			res.send({ todo });
		})
		// error 400 and send empty body back
		.catch(e => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
	// get the id
	const id = req.params.id;

	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id)
		.then(todo => {
			if (!todo) {
				return res.status(404).send();
			}
			res.send({ todo });
		})
		.catch(e => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
	const id = req.params.id;
	const body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
	// new:true > return todo updated
	Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
		.then(todo => {
			if (!todo) {
				return res.status(404).send();
			}
			res.send({ todo });
		})
		.catch(e => res.status(400).send());
});

// Users
// POST /users
app.post('/users', (req, res) => {
	const body = _.pick(req.body, ['email', 'password']);
	const user = new User(body);

	user.save()
		.then(() => {
			console.log('generateAuth')
			return user.generateAuthToken();
		})
		.then(token => {
			res.header('x-auth', token).send(user);
		})
		.catch(e => {
			res.status(400).send({ e });
		});
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = app;
