const mongoose = require('mongoose');

const prod = 'mongodb://todoadmin:todo1234@ds137581.mlab.com:37581/todo-app';
const dev = 'mongodb://localhost:27017/TodoApp';
console.log(process.env.MONGODB_URI);
// set global promise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || dev);
