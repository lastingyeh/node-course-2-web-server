const { ObjectId } = require('mongodb');
const connectPromise = require('./mongodb-db');

const dbName = 'TodoApp';

async function findData(dbName, collectionName, opts, callback) {
	let client = null;

	try {
		let whereOpts = {};
		let done = null;

		if (!callback && typeof opts === 'function') {
			done = opts;
		} else {
			whereOpts = opts;
			done = callback;
		}

		const db = await connectPromise(dbName);

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
		if (client) {
			client.close();
		}
	}
}

// get todos by opts
findData(dbName, 'Todos', { completed: false }, (error, results) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Todos', results);
	}
});

// get all users
findData(dbName, 'Users', (error, results) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Users', results);
	}
});

// get user by objectId
findData(
	dbName,
	'Users',
	{ _id: new ObjectId('5a9798558d4f4c3455045291') },
	(error, results) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Users', results);
		}
	}
);
