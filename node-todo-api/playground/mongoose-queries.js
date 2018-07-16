const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const Todo = require('./../server/models/todo');
const User = require('./../server/models/user');

// const id = '5b4c33ce5b57320ffb9b303';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid')
// }

// Todo.find({ _id: id }).then(todos => console.log('Todos', todos));

// Todo.findOne({ _id: id }).then(todo => console.log('Todo', todo));

// Todo.findById(id)
// 	.then(todo => {
// 		if (!todo) {
// 			return console.log('Id not found');
// 		}
// 		console.log('Todo by Id', todo);
// 	})
// 	.catch(e => console.log(e));

User.findById('5b4c36f62c796e8b1d4e9fb7')
	.then(user => {
		if (!user) {
			return console.log('Unable to find user');
		}
		console.log(JSON.stringify(user, undefined, 2));
	})
	.catch(e => console.log(e));
