const { ObjectId } = require('mongoose').Types;

const { mongoose } = require('./../server/db/mongoose');
const Todo = require('./../server/models/todo');
const User = require('./../server/models/user');

Todo.remove({}).then(result => {
	console.log(result);
});

Todo.findOneAndRemove({ _id: '5b4c5998eb587900141eeef8' }).then(todo => {
	console.log(todo);
});

Todo.findByIdAndRemove('5b4c5998eb587900141eeef8').then(todo => {
	console.log(todo);
});
