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
app.post('/todos', authenticate, async (req, res) => {
	try {
		const todo = await new Todo({
			text: req.body.text,
			_creator: req.user._id,
		}).save();

		res.send(todo);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.get('/todos', authenticate, async (req, res) => {
	try {
		const todos = await Todo.find({ _creator: req.user._id });
		res.send({ todos });
	} catch (error) {
		res.status(400).send(error);
	}
});

app.get('/todos/:id', authenticate, async (req, res) => {
	try {
		const id = req.params.id;

		// Valid id using isValid
		if (!ObjectId.isValid(id)) {
			// 404 - send back empty
			return res.status(404).send();
		}

		// findById
		const todo = await Todo.findOne({ _id: id, _creator: req.user._id });

		// success
		if (!todo) {
			return res.status(404).send();
		}
		res.send({ todo });
	} catch (error) {
		res.status(400).send();
	}
});

app.delete('/todos/:id', authenticate, async (req, res) => {
	try {
		// get the id
		const id = req.params.id;

		if (!ObjectId.isValid(id)) {
			return res.status(404).send();
		}

		const todo = await Todo.findOneAndRemove({
			_id: id,
			_creator: req.user._id,
		});

		if (!todo) {
			return res.status(404).send();
		}
		res.send({ todo });
	} catch (error) {
		res.status(400).send();
	}
});

app.patch('/todos/:id', authenticate, async (req, res) => {
	try {
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

		const todo = await Todo.findOneAndUpdate(
			{ _id: id, _creator: req.user._id },
			{ $set: body },
			{ new: true },
		);

		if (!todo) {
			return res.status(404).send();
		}
		res.send({ todo });
	} catch (error) {
		res.status(400).send();
	}
});

// Users
// POST /users
app.post('/users', async (req, res) => {
	try {
		const body = _.pick(req.body, ['email', 'password']);
		const user = await new User(body).save();

		const token = await user.generateAuthToken();

		res.header('x-auth', token).send(user);
	} catch (error) {
		res.status(400).send({ error });
	}
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

// post user/login (email,password)
app.post('/users/login', async (req, res) => {
	try {
		const body = _.pick(req.body, ['email', 'password']);
		const user = await User.findByCredentials(body.email, body.password);
		const token = await user.generateAuthToken();

		res.header('x-auth', token).send(user);
	} catch (error) {
		res.status(400).send();
	}
});

// delete
app.delete('/users/me/token', authenticate, async (req, res) => {
	try {
		await req.user.removeToken(req.token);

		res.status(200).send();
	} catch (error) {
		res.status(400).send();
	}
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = app;
