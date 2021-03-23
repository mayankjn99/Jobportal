const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobdetailSchema = new Schema({
    title: {
		type: String,
		required: true
	},
    name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
    },
    max_no_app: {
        type: Number,
        required: true
    },
    max_no_pos:{
        type: Number,
        required: true
    
    },
    date_of_posting:
    {
            type: Date,
            default: Date.now
    },
    deadline:
    {
        type: Date,
        required: true
    },
    skill:
    {
        type: String,
        reuired: true
    },
    job_type: {
		type: String,
		required: true
    },
    duration: {
        type: Number,
        required: false
    },
    salary: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        default: 'Available'
    },
    number_of_positions_filled: {
        type: Number,
        default: 0

    },
    no_of_accepted:{
        type: Number,
        default: 0
    }
    


});

module.exports = Jobdetail = mongoose.model("Jobdetails", JobdetailSchema);
