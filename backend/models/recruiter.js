const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
    name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
    },
  
    Password:
    {
        type: String,
        required:true
    },
    contact_no:{
        type :Number,
        required:false
    },
    bio:{
        type: String,
        required:false
    }
})

module.exports = recruiter = mongoose.model("recruiter", recruiterSchema);