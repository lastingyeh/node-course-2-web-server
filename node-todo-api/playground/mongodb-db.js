const { MongoClient } = require('mongodb');

const connectUrl = 'mongodb://localhost:27017/TodoApp';
// use promise with async | await pattern
// const connectPromise = util.promisify(MongoClient.connect);

const connectPromise = async dbName => {
	let db = null;
	try {
	    const client = await MongoClient.connect(connectUrl);
	    db = client.db(dbName);
	} catch (error) {
	    throw new Error(error.message)
	}
	return db;
};

module.exports = connectPromise;
