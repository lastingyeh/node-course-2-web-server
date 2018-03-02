const { MongoClient } = require('mongodb');

const DB_NAME = 'TodoApp';

const connectUrl = 'mongodb://localhost:27017/TodoApp';
// use promise with async | await pattern
// const connectPromise = util.promisify(MongoClient.connect);

const connectPromise = () => MongoClient.connect(connectUrl);

module.exports = { connectPromise, DB_NAME };
