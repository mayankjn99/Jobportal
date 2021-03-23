const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	Type: {
		type: String,
		// enum: ['A', 'R'],
        required: false
	},
	Password: {
		type : String,
		required: true
	}


});

module.exports = User = mongoose.model("User", UserSchema);
