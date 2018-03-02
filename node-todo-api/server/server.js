const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const Todo = require('./models/todo');
const User = require('./models/user');

const app = express();

// for x-www-form-urlencoded data
app.use(bodyParser.urlencoded({ extended: false }));
// for json data
app.use(bodyParser.json());

// app.post('/todos', (req, res) => {
// 	const todo = new Todo({
// 		text: req.body.text
// 	});

// 	todo
// 		.save()
// 		.then(doc => res.send(doc))
// 		.catch(e => res.status(400).send(e));
// });

app.post('/todos', async (req, res) => {
	
	try {
        const todo = new Todo({
            text: req.body.text
        });

		const doc = await todo.save();
		res.send(doc);
	} catch (error) {
		res.status(400).send(e);
	}
});

app.listen(3000, () => {
	console.log('Started on port 3000');
});
