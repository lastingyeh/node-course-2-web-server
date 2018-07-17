const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { ObjectId } = require('mongoose').Types;
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = app;
