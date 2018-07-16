const mongoose = require('mongoose');
// set global promise
mongoose.Promise = global.Promise;
mongoose.connect(
	process.env.MONGODB_URI ||
		'mongodb://todoadmin:todo1234@ds137581.mlab.com:37581/todo-app',
);
