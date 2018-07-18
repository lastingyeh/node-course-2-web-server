const mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	text: { type: String, required: true, minlength: 1, trim: true },
	completed: { type: Boolean, default: false },
	completedAt: { type: Number, default: null },
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});
