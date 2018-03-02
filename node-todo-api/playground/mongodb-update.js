const { ObjectId } = require('mongodb');
const { connectPromise, DB_NAME } = require('./mongodb-db');

async function updateData(collectionName, opts, callback) {
	let client = null;

	try {
		client = await connectPromise();
		const db = client.db(DB_NAME);

		const result = await db
			.collection(collectionName)
			.findOneAndUpdate(opts.where, opts.updateSet, opts.extra);

		callback(null, result);
	} catch (error) {
		callback(error.message);
	} finally {
		client && client.close();
	}
}

const todoOpts = {
	where: { _id: new ObjectId('5a98a1066385c00ab5f4de56') },
	updateSet: {
		$set: {
			text: 'update info'
		}
	},
	extra: { returnOriginal: false }
};

updateData('Todos', todoOpts, (error, result) => {
	if (error) {
		console.log(error);
	} else {
		console.log(result);
	}
});

const userOpts = {
	where: { _id: new ObjectId('5a97a5cc9b7d223eeafeeffc') },
	updateSet: { $set: { name: 'Chris' }, $inc: { age: 1 } },
	extra: { returnOriginal: false }
};

updateData('Users', userOpts, (error, result) => {
	if (error) {
		console.log(error);
	} else {
		console.log(result);
	}
});
