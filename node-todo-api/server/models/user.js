const mongoose = require('mongoose');
// user

module.exports = mongoose.model('User', {
	email: { type: String, required: true, trim: true, minlength: 1 },
});
