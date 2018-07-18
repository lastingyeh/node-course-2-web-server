const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
// user

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: value => {
				return validator.isEmail(value);
			},
			message: '{VALUE} is not a valid email',
		},
	},
	password: {
		type: String,
		require: true,
		minlength: 6,
	},
	tokens: [
		{
			access: { type: String, required: true },
			token: { type: String, required: true },
		},
	],
});

UserSchema.methods = {
	generateAuthToken: function() {
		const access = 'auth';
		const token = jwt
			.sign({ _id: this._id.toHexString(), access }, 'abc123')
			.toString();

		this.tokens.push({ access, token });

		return this.save().then(() => token);
	},
	toJSON: function() {
		const userObject = this.toObject();

		return _.pick(userObject, ['_id', 'email']);
	},
};

UserSchema.statics = {
	findByToken: function(token) {
		let decoded;

		try {
			decoded = jwt.verify(token, 'abc123');
		} catch (error) {
			return Promise.reject();
		}
		return this.findOne({
			_id: decoded._id,
			'tokens.token': token,
			'tokens.access': 'auth',
		});
	},
};

UserSchema.pre('save', async function(next) {
	if (this.isModified('password')) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		// next();
	} else {
		next();
	}
});

module.exports = mongoose.model('User', UserSchema);
