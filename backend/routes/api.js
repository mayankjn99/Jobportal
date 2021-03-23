var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const applicant = require("../models/jobapplicant");
const recruiters= require("../models/recruiter");
const Job=require("../models/Jobdetails");
const App=require("../models/Application");
var nodemailer = require('nodemailer');
// const Applicantion = require("../models/Applicantion");
// const Jobdetails = require("../models/Jobdetails");
// const Jobdetails = require("../models/Jobdetails");
// GET request 
// Getting all the usersogin
// to l
router.post("/login", (req, res) => {
	const email = req.body.email;
	// Find user by email
	User.findOne({ email }).then(user => {
        // Check if user email exists
        console.log(user)
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            // res.send("Email Found");
            res.status(200).json(user);
            return user;
        }
	});
});
// finding rec
router.post("/findrec", (req, res) => {
	const email = req.body.email;
	// Find user by email
	recruiters.findOne({ email }).then(user => {

        if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }else{
            res.status(200).json(user);
            return user;
        }
	});
});
// find app
router.post("/findapp", (req, res) => {
	const email = req.body.email;
	// Find user by email
	applicant.findOne({ email }).then(user => {

        if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }else{
            res.status(200).json(user);
            return user;
        }
	});
});
router.get("/", function(req, res) {
    User.find(function(err, Users) {
		if (err) {
			console.log(err);
		} else {
			res.json(Users);
		}
	})
});
router.get("/applicant", function(req, res) {
    applicant.find(function(err, jobapplicant) {
		if (err) {
			console.log(err);
		} else {
			res.json(jobapplicant);
		}
	})
});
router.get("/recruiter", function(req, res) {
    recruiters.find(function(err, recruiter) {
		if (err) {
			console.log(err);
		} else {
			res.json(recruiter);
		}
	})
});
router.get("/job", function(req, res) {
    Job.find(function(err,Jobdetails) {
		if (err) {
			console.log(err);
		} else {
			res.json(Jobdetails);
		}
	})
});
router.post("/user/add", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        Password: req.body.Password,
        Type: req.body.Type
        // skills: req.body.skills,
        // date: req.body.date
    });

    newUser.save()
        .then(Users=> {
            res.status(200).json(Users);
        })
        .catch(err => {
            res.status(400).send(err);
		});
	
});
router.post("/applicant/add", (req, res) => {
    const newUser = new applicant({
        name: req.body.name,
        email: req.body.email,
        Password: req.body.Password,
        Type: req.body.Type,
        skills: req.body.skills,
        education : req.body.education
        // date: req.body.date
    });

    newUser.save()
        .then(jobapplicant => {
            res.status(200).json(jobapplicant);
        })
        .catch(err => {
            res.status(400).send(err);
		});
	
});
router.post("/recruiter/add", (req, res) => {
    const newUser = new recruiters({
        name: req.body.name,
        email: req.body.email,
        Password: req.body.Password,
        contact_no: req.body.contact_no,
        bio: req.body.bio,
        // date: req.body.date
    });
    
    newUser.save()
        .then(recruiter => {
            res.status(200).json(recruiter);
        })
        .catch(err => {
            res.status(400).send(err);
		});
	
});
router.post("/job/add", (req, res) => {
    const newUser = new Job({
        name: req.body.name,
        email: req.body.email,
        max_no_app: req.body.max_no_app,
        max_no_pos: req.body.max_no_pos,
        deadline: req.body.deadline,
        skill: req.body.skill,
        job_type: req.body.job_type,
      
        salary: req.body.salary,
        duration: req.body.time,
        title: req.body.title
        // contact_no: req.body.contact_no,
        // Bio: req.body.Bio,
        // date: req.body.date
          // duration: req.body.duration,
    });

    newUser.save()
        .then(Jobdetails => {
            res.status(200).json(Jobdetails);
        })
        .catch(err => {
            res.status(400).send(err);
		});
	
});
router.post("/job/view" , (req,res) => {
    // const email = req.body.email;
	// Find user by email
	Job.find({ email : req.body.email , status : 'Available' }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            // res.send("Email Found");
            res.status(200).json(user);
            return user;
        }
	});
});
router.post("/viewjobs" , (req,res) => {
    // const email = req.body.email;
    // Find user by email
    let date = Date.now()
    console.log(date)
	Job.find({ status : 'Available' , deadline:  { $gt :date }}).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            // res.send("Email Found");
            res.status(200).json(user);
            return user;
        }
	});
});
router.post("/job/delete",(req,res) => {
    var id = req.body.id;
    var query = { _id: id };
    var set = { $set: { status: "deleted" } };
    Job.updateMany(query , set , function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        res.status(200).json(resp);
        return resp;
    })
});

router.post("/recruiter/update",(req,res) => {console.log(req.body)

    var id = req.body.id;
    recruiters.findOne({ _id:id}).then(user => {
        console.log(user);
        
            user.name = req.body.name ,
            user.email = req.body.email ,
            user.contact_no = req.body.contact_no ,
            user.bio = req.body.bio
            user.save();
            res.status(200).json(user);
            return user;
        
	});
    // var query = { _id: id };
    // var set = { $set: { name: req.body.name , email: req.body.email ,contact_no : req.body.contact_no , bio: req.body.bio } };
    // recruiters.updateMany(query , set , function(err , resp){
    //     if (err) throw err;
    // })
    // .then(resp => {
    //     res.status(200).json(resp);
    //     console.log(resp);
    //     return resp;
    // })
});
router.post("/findjob", (req, res) => {
	// const email = req.body.email;
    // Find user by email
    const id=req.body.id;
	Job.findOne({ _id: id } ).then(user => {

        if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }else{
            res.status(200).json(user);
            return user;
        }
	});
});
router.post("/jobupdate",(req,res) => {console.log(req.body)

    var id = req.body.id;
    Job.findOne({ _id:id}).then(user => {
        console.log(user);
        
            // user.name = req.body.name ,

            user.max_no_pos = req.body.max_no_pos ,
            user.max_no_app = req.body.max_no_app,
            user.deadline  = req.body.deadline,
            user.save();
            res.status(200).json(user);
            return user;
        
	});
  
});
router.post("/find/jobtype", (req, res) => {
	// const email = req.body.email;
    // Find user by email
    const job_type=req.body.job_type;
	Job.find({ job_type: job_type ,status : 'Available' } ).then(user => {

        if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }else{
            res.status(200).json(user);
            return user;
        }
	});
});
router.post("/find/salary", (req, res) => {
	// const email = req.body.email;
    // Find user by email
    const min_salary=req.body.min;
    const max_salary = req.body.max;
	Job.find({ salary : { $gte :  min_salary, $lte : max_salary}, status:'Available'}).then(user => {

        if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }else{
            res.status(200).json(user);
            return user;
        }
	});
});
router.post("/find/duration", (req, res) => {
	// const email = req.body.email;
    // Find user by email
    
	Job.find({ duration: { $lt : req.body.time},status : 'Available' } ).then(user => {

        if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }else{
            res.status(200).json(user);
            return user;
        }
	});
});
router.post("/jobsapplied", (req, res) => {
	// const email = req.body.email;
    // Find user by email
    const email= req.body.app_email;
    console.log(email)
	App.find({ applicant_email:email } ).then(user => {

        if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }else{
            res.status(200).json(user);
            return user;
        }
	});
});
// to find applicant 
router.post("/findapplicant", (req, res) => {
	// const email = req.body.email;
    // Find user by email
    const email= req.body.email;
	applicant.findOne({ email:email } ).then(user => {

        if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }else{
            res.status(200).json(user);
            return user;
        }
	});
});
router.post("/addapplication", (req, res) => {
    let newUser = new App(req.body);
    
    newUser.save()
        .then(Applicantion => {
            res.status(200).json(Application);
        })
        .catch(err => {
            res.status(400).send(err);
		});
	
});
router.get("/application", function(req, res) {
    App.find(function(err, Application) {
		if (err) {
			console.log(err);
		} else {
			res.json(Application);
		}
	})
});
router.post("/increment_application_count",(req,res) => {console.log(req.body)

    // var id = req.body.id;
    applicant.findOne({ email: req.body.email}).then(user => {
        console.log(user);
        
            // user.name = req.body.name ,

            user.number_of_applied_jobs = user.number_of_applied_jobs + 1 ;
            user.save();
            res.status(200).json(user);
            return user;
        
	});
  
});
router.post("/increment_job_count",(req,res) => {console.log(req.body)

    // var id = req.body.id;
    Job.findOne({ _id: req.body.id}).then(user => {
        console.log(user);
        
            // user.name = req.body.name ,

            user. number_of_positions_filled = user. number_of_positions_filled + 1 ;
            user.save();
            res.status(200).json(user);
            return user;
        
	});
  
});
router.post("/findapplicationforapp", (req, res) => {
	// const email = req.body.email;
    // Find user by email
    const email= req.body.email;
	App.find({ applicant_email:email , status_of_job: 'Available'} ).then(user => {

        if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }else{
            res.status(200).json(user);
            return user;
        }
	});
});
router.post("/findapplicationforrec", (req, res) => {
	// const email = req.body.email;
    // Find user by email
    console.log("In here")
    const email= req.body.email;
    console.log(email)
	App.find({ recruiter_email:email , status_of_job: 'Available', status : { $ne: "rejected" } } ).then(user => {

        if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }else{
            res.status(200).json(user);
            return user;
        }
	});
});
router.post("/statusshortlisted",(req,res) => {console.log(req.body)

    var id = req.body.id;
    var stat= "shortlisted";
    App.findOne({ _id:id}).then(user => {
        console.log(user);
        
            // user.name = req.body.name ,
            console.log(stat);

            user.status= stat ,
            user.stage_of_application=  user.stage_of_application +1,

                user.save();
            res.status(200).json(user);
            return user;
        
	});
  
});
router.post("/statusaccepted",(req,res) => {console.log(req.body)

    var id = req.body.id;
    App.findOne({ _id:id}).then(user => {
        console.log(user);
        
            // user.name = req.body.name ,

            user.status = "accepted" ,
            user.stage_of_application =   user.stage_of_application +1,
            user.date_of_application = Date.now()
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user:  "arkenstone.hobbit99@gmail.com",
                  pass: "Mayank@123"
                }
              });
              
              var mailOptions = {
                from: "arkenstone.hobbit99@gmail.com",
                to: user.applicant_email,
                subject: 'Accepted',
                text: 'JOb application is accepted!'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
                user.save();
            res.status(200).json(user);
            return user;
        
    });
   
  
});
router.post("/statusrejected",(req,res) => {console.log(req.body)

    var id = req.body.id;
    App.findOne({ _id:id}).then(user => {
        console.log(user);
        
            // user.name = req.body.name ,

            user.status = "rejected" ,
            // user.stage_of_application =   user.stage_of_application +1,

                user.save();
            res.status(200).json(user);
            return user;
        
	});
  
});
router.post("/jobacceptedupdate",(req,res) => {console.log(req.body)

    var id = req.body.id;
    Job.findOne({ _id:id}).then(user => {
        console.log(user);
        
            // user.name = req.body.name ,

            user.no_of_accepted= user.no_of_accepted+1;
            user.save();
            res.status(200).json(user);
            return user;
        
	});
  
});
router.post("/findpositions", (req, res) => {
	// const email = req.body.email;
    // Find user by email
    
	Job.findOne({ _id:req.body.id } ).then(user => {

        if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }else{
            res.status(200).json(user);
            return user;
        }
	});
});
module.exports = router;