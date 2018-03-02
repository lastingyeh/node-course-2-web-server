const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
	text: { type: String, required: true, minlength: 1, trim: true },
	completed: { type: Boolean, default: false },
	completedAt: { type: Number, default: null }
});

// save new something
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
