const MongoClient = require('mongodb').MongoClient;

const DB_NAME = 'TodoApp';
const connectUrl = 'mongodb://localhost:27017/TodoApp';
// use promise with async | await pattern
// const connectPromise = util.promisify(MongoClient.connect);

// callback
// MongoClient.connect(
// 	connectUrl,
// 	(err, client) => {
// 		if (err) {
// 			console.log('Unable to connect to MongoDB server');
// 		}
//         console.log('Connected to MongoDB server');
        
// 		const db = client.db('TodoApp');

// 		// db.collection('Todos').insertOne(
// 		// 	{
// 		// 		text: 'Something to do',
// 		// 		completed: false,
// 		// 	},
// 		// 	(err, result) => {
// 		// 		if (err) {
// 		// 			return console.log('Unable to insert todo', err);
// 		// 		}
// 		// 		return console.log(JSON.stringify(result.ops, undefined, 2));
// 		// 	},
//         // );
        
//         // db.collection('Users').insertOne(
// 		// 	{
// 		// 		name: 'Chris',
//         //         age: 28,
//         //         location:'California'
// 		// 	},
// 		// 	(err, result) => {
// 		// 		if (err) {
// 		// 			return console.log('Unable to insert user', err);
//         //         }
//         //         // result.ops[0]._id.getTimestamp();
// 		// 		return console.log(JSON.stringify(result.ops, undefined, 2));
// 		// 	},
// 		// );

// 		client.close();
// 	},
// );

module.exports = {
	connectPromise: () => MongoClient.connect(connectUrl),
	DB_NAME,
};
