const { connectPromise, DB_NAME } = require('./mongodb-db');

//#region use callback pattern
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
// 	if (err) {
// 		console.log('Unable to connect to MongoDB server');
// 	}
//     console.log('Connect to MongoDB server');

//     const db = client.db('TodoApp');

// 	// use callback pattern
// 	db.collection('Todos').insertOne(
// 		{
// 			text: 'Something to do',
// 			completed: false
// 		},
// 		(err, result) => {
// 			if (err) {
// 				return console.log('Unable to insert todo', err);
// 			}
// 			console.log(result);
// 			console.log(JSON.stringify(result.ops, undefined, 2));
// 		}
//     );

//     client.close();
// });
//#endregion

async function insertData(collectionName, createObject, callback) {
	let client = null;
	try {
		client = await connectPromise();

		const db = client.db(DB_NAME);

		const result = await db.collection(collectionName).insertOne(createObject);

		callback(null, JSON.stringify(result.ops, undefined, 2));
	} catch (error) {
		callback(error.message);
	} finally {
		if (client) {
			client.close();
		}
	}
}

const userObject = {
	name: 'Andrew',
	age: 25,
	location: 'Philadelphia'
};

// insert Users-data
// insertData('Users', userObject, (error, result) => {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log(result);
// 	}
// });

const todoObject = {
	text: 'Just to do',
	completed: false
};

// insert Todos-data
insertData('Todos', todoObject, (error, result) => {
	if (error) {
		console.log(error);
	} else {
		console.log(result);
	}
});
