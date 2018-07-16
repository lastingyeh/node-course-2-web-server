const { ObjectID } = require('mongodb');
const { connectPromise, DB_NAME } = require('./mongodb-db');

async function findData(collectionName, opts, callback) {
	let client;

	try {
		let whereOpts = {};
		let done = null;

		if (!callback && typeof opts === 'function') {
			done = opts;
		} else {
			whereOpts = opts;
			done = callback;
		}

		client = await connectPromise();

		const db = client.db(DB_NAME);

		const results = await db
			.collection(collectionName)
			.find(whereOpts)
			.toArray();

		// console.log(JSON.stringify(result, undefined, 2));

		done(null, results);
	} catch (error) {
		// console.log(error.message);
		done(error.message);
	} finally {
		client && client.close();
	}
}

// get todos by opts
findData('Todos', { completed: false }, (error, results) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Todos', results);
	}
});

// get all users
findData('Users', (error, results) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Users', results);
	}
});

// get user by objectId
findData(
	'Users',
	{ _id: new ObjectID('5a9798558d4f4c3455045291') },
	(error, results) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Users', results);
		}
	},
);
