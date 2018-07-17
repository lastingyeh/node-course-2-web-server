const mongoose = require('mongoose');

// set global promise
mongoose.Promise = global.Promise;
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp',
);
