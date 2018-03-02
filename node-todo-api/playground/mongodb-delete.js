const { connectPromise, DB_NAME } = require('./mongodb-db');

async function deleteData(collectionName, opts, callback) {
	try {
		client = await connectPromise();

		const db = client.db(DB_NAME);

		// deleteMany
		// const result = await db.collection(collectionName).deleteMany(opts);

		// deleteOne
		// const result = await db.collection(collectionName).deleteOne(opts);

		// findOneAndDelete, as result has pop the deleted document
		const result = await db.collection(collectionName).findOneAndDelete(opts)

		callback(null, JSON.stringify(result, undefined, 2));
	} catch (error) {
		callback(error.message);
	}
}

deleteData('Todos', { text: 'Just to do' }, (error, result) => {
	if (error) {
		console.log(error);
	} else {
		console.log(result);
	}
});
