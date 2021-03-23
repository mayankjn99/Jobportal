const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const jobapplicantSchema = new Schema({
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
    skills:{
        type: String,
        required: false
    },
    education:{
		type:[
		{institution_name:{
			type:String ,
			required: false
		},
		start_year:{
			type:Number,
			required: false
		},

		end_year:{
			type:Number,
			required: false,
		}}
    ],
},
number_of_applied_jobs: {
	type: Number,
	default: 0
}

});

module.exports = jobapplicant = mongoose.model("jobapplicant", jobapplicantSchema);
