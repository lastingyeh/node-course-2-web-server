const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken');

const Todo = require('./../../models/todo');
const User = require('./../../models/user');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [
	{
		_id: userOneId,
		email: 'cx1@ex.com',
		password: '123456!',
		tokens: [
			{
				access: 'auth',
				token: jwt
					.sign({ _id: userOneId, access: 'auth' }, 'abc123')
					.toString(),
			},
		],
	},
	{
		_id: userTwoId,
		email: 'bw2@ex.com',
		password: '654321!',
	},
];

const todos = [
	{ _id: new ObjectId(), text: 'First test todo' },
	{
		_id: new ObjectId(),
		text: 'Second test todo',
		completed: true,
		completedAt: 333,
	},
];

const populateTodos = done => {
	Todo.remove({})
		.then(() => Todo.insertMany(todos))
		.then(() => done());
};

const populateUsers = done => {
	User.remove({})
		.then(() => {
			const userOne = new User(users[0]).save();
			const userTwo = new User(users[1]).save();

			return Promise.all([userOne, userTwo]);
		})
		.then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };
