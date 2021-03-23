
import React, {Component} from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";


export default class Joblistings extends Component {
   
    constructor(props) {
        super(props);
        // this.deletejob = this.deletejob.bind(this)
        this.state = { 
             jobs: [],
            job_type: 'Full-Time',
            job_salary: '',
            job_duration: '',
            salary_lower:'',
            salary_upper:'',
            applied_jobs:[],
            title: '',

         };
         this.onChangeTitle = this.onChangeTitle.bind(this);
         this.Asortbysalary =this.Asortbysalary.bind(this);
         this.Dsortbysalary = this.Dsortbysalary.bind(this);
         this.Asortbyduration =this.Asortbyduration.bind(this);
         this.Dsortbyduration = this.Dsortbyduration.bind(this);
         this.Asortbyrating =this.Asortbyrating.bind(this);
         this.Dsortbyrating = this.Dsortbyrating.bind(this);
         this.onChangejobtypefilter = this.onChangejobtypefilter.bind(this);
         this.onSubmitjobtypefilter = this.onSubmitjobtypefilter.bind(this);
         this.onchangedurationfilter = this.onchangedurationfilter.bind(this);
         this.onSubmitdurationfilter = this.onSubmitdurationfilter.bind(this);
         this.onchangesalarylower = this.onchangesalarylower.bind(this);
         this.onchangesalaryupper = this.onchangesalaryupper.bind(this);
         this.onSubmitsalaryrange = this.onSubmitsalaryrange.bind(this);
    }
    
     componentDidMount() {
        console.log("Hi in job view")
        // alert("Hi")
        if(localStorage.getItem('Type') === "Applicant" && localStorage.getItem('Login') === "true" ){
           
           let newUser;
             axios.post('http://localhost:4000/api/viewjobs', newUser)
            .then(res => {

                this.setState({jobs: res.data});
                console.log(this.state.jobs)
                // alert(this.state.jobs.title)
            })
            .catch(function(error) {
             
                console.log(error);
            })
            const newUserapp = {
                app_email: localStorage.getItem('email')
            }
            axios.post("http://localhost:4000/api/jobsapplied",newUserapp)
             .then(res =>{
                 console.log(res.data)
                this.setState({applied_jobs: res.data});
                
             })
             .catch(function(error) {
                console.log(error);
           })
       
    }
    else
    {
            alert("login first");
            this.props.history.push("/");
            window.location.reload();
        

    }

}
onChangeTitle(event) {
    this.setState({ title: event.target.value });
}
onChangeJob_salary(event)
{
    this.setState({job_salary: event.target.value});
    console.log(event.target.value)
}

onChangejobtypefilter(event){
    this.setState({job_type: event.target.value});
    console.log(event.target.value)
}
onchangesalarylower(event){
    this.setState({salary_lower:event.target.value});
    console.log(event.target.value)
}

onchangesalaryupper(event){
    this.setState({salary_upper:event.target.value});
    console.log(event.target.value)
}

onchangedurationfilter(event){
    this.setState({job_duration: event.target.value});
    console.log(event.target.value)
}
Asortbysalary = () =>{
    let  n = this.state.jobs.length;
    console.log("HI")
    for(var i=0; i < n-1; i++)
    {
        for(var j=0; j < n-1-i; j++)
        {
            if(this.state.jobs[j].salary > this.state.jobs[j+1].salary)
            {
                var temp=  this.state.jobs[j];
                this.state.jobs[j] =  this.state.jobs[j+1];
                this.state.jobs[j+1] = temp;
            }
        }
    }
    console.log(this.state.jobs[0].salary)
    console.log(this.state.jobs[1].salary)
    this.setState({jobs: this.state.jobs});
}
Dsortbysalary = () =>{
    let  n = this.state.jobs.length;
  
    for(var i=0; i < n-1; i++)
    {
        for(var j=0; j < n-1; j++)
        {
            if( this.state.jobs[j].salary <  this.state.jobs[j+1].salary)
            {
                var temp=  this.state.jobs[j];
                this.state.jobs[j] =  this.state.jobs[j+1];
                this.state.jobs[j+1] = temp;
            }
        }
    }
    this.setState({jobs: this.state.jobs});
}

Asortbyduration = () =>{
    let  n = this.state.jobs.length;
    for(var i=0; i < n-1; i++)
    {
        for(var j=0; j < n-1-i; j++)
        {
            if( this.state.jobs[j].duration >  this.state.jobs[j+1].duration)
            {
                var temp=  this.state.jobs[j];
                this.state.jobs[j] =  this.state.jobs[j+1];
                this.state.jobs[j+1] = temp;
            }
        }
    }
    this.setState({jobs: this.state.jobs});
  
}
Dsortbyduration = () =>{
    let  n = this.state.jobs.length;
    for(var i=0; i < n-1; i++)
    {
        for(var j=0; j < n-1; j++)
        {
            if( this.state.jobs[j].duration <  this.state.jobs[j+1].duration)
            {
                var temp=  this.state.jobs[j];
                this.state.jobs[j] =  this.state.jobs[j+1];
                this.state.jobs[j+1] = temp;
            }
        }
    }

    this.setState({jobs: this.state.jobs});
}


Asortbyrating = () =>{
    let  n = this.state.jobs.length;
    for(var i=0; i < n-1; i++)
    {
        for(var j=0; j < n-1-i; j++)
        {
            if( this.state.jobs[j].rating>  this.state.jobs[j+1].rating)
            {
                var temp=  this.state.jobs[j];
                this.state.jobs[j] =  this.state.jobs[j+1];
                this.state.jobs[j+1] = temp;
            }
        }
    }

    this.setState({jobs: this.state.jobs});
}
Dsortbyrating = () =>{
    let  n = this.state.jobs.length;
    for(var i=0; i < n-1; i++)
    {
        for(var j=0; j < n-1; j++)
        {
            if( this.state.jobs[j].rating <  this.state.jobs[j+1].rating)
            {
                var temp=  this.state.jobs[j];
                this.state.jobs[j] =  this.state.jobs[j+1];
                this.state.jobs[j+1] = temp;
            }
        }
    }
    this.setState({jobs: this.state.jobs});
  
}



onSubmitjobtypefilter(e){
    e.preventDefault();
    console.log("HI")
    console.log(this.state.job_type)
    const newJob = {
        job_type: this.state.job_type
    }
    axios.post('http://localhost:4000/api/find/jobtype',newJob)
         .then(res => {
            this.setState({jobs: res.data});
            if(this.state.jobs.length === 0)
                alert("No such jobs");
        })
         .catch(err =>
            {
                console.log(err)
               
            });
    this.setState({
        job_type : 'Full-Time',
    });

}

onSubmitsalaryrange(e){
    e.preventDefault();
    const salaryminmax = {
        min: this.state.salary_lower,
        max: this.state.salary_upper
    }
    axios.post('http://localhost:4000/api/find/salary', salaryminmax)
         .then(res => {
            this.setState({jobs: res.data});
           console.log(res.data); 
           if(this.state.jobs.length === 0)
                alert("No such jobs");
        })
         .catch(err =>
            {
                console.log(err)
              
            });

    this.setState({
        salary_lower : '',
        salary_upper: ''
    });
}
onSubmitdurationfilter(e){
    e.preventDefault();
    const dur = {
        time: this.state.job_duration,
    }
    console.log(dur);
    axios.post('http://localhost:4000/api/find/duration', dur)
         .then(res => {
            console.log(res.data);
            this.setState({jobs: res.data});
            if(this.state.jobs.length === 0)
                alert("No such jobs");

        })
         .catch(err =>
            {
                console.log(err)
            });

    this.setState({
        job_duration : '',
    });
}


render() {
    return (
        <div>
            <div className="form-group">
                        <label>Job title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.Title}
                               onChange={this.onChangeTitle}
                               />  
                    </div>
                    <div>
                    <p> Sort Options</p>
                    <Button variant="info" style = {{backgroundColor:'Red'}} onClick={this.Asortbysalary} >Salary ascending</Button>&nbsp;
                    <Button variant="info" style = {{backgroundColor:'Dark-Green'}} onClick={this.Dsortbysalary} >Salary descending </Button>&nbsp;
                    <Button variant="info" style = {{backgroundColor:'Blue'}}onClick={this.Asortbyduration} >Duration ascending</Button>&nbsp;
                    <Button variant="info" style = {{backgroundColor:'Brown'}} onClick={this.Dsortbyduration} >Duration descending </Button>&nbsp;
                    <Button variant="info" style = {{backgroundColor:'Green'}} onClick={this.Asortbyrating} >Rating ascending</Button>&nbsp; 
                    <Button variant="info" style = {{backgroundColor:'Orange'}} onClick={this.Dsortbyrating} >Rating descending</Button>
                    </div>
                    <br></br>
                    <div>
                        <p>Filter Options </p>
                        <form onSubmit={this.onSubmitjobtypefilter}>
                    <div>
                        <label>JOB-Type: </label>
                            <select onChange={this.onChangejobtypefilter} value={this.state.job_type}>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Work from Home">Work from Home</option>
                            </select>
                        
                    </div>
                    <br></br>
                    <div >
                        <input type="submit" value="apply filter" className="btn btn-primary"/>
                    </div>
                </form>

                <form onSubmit={this.onSubmitsalaryrange}>
                    <div className="form-group">
                        <label>range: </label>
                        <br></br>
                            <label>lower limit</label>
                            <input  type="number"
                                    className="form-control"
                                    value={this.state.salary_lower}
                                    onChange={this.onchangesalarylower}
                                    />
                            <label>upper limit</label>
                            <input  type="number"
                                    className="form-control"
                                    value={this.state.salary_upper}
                                    onChange={this.onchangesalaryupper}
                                    />
                    </div>
                    
                    <div>
                        <input type="submit" value="Apply" className="btn btn-primary"/>
                    </div>

                </form>
                <br></br>
                <form onSubmit={this.onSubmitdurationfilter}>
                    <div onChange={this.onchangedurationfilter} value={this.state.job_duration} >
                        <label>Duration</label><br/>
                        <select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                        <br></br>
                        <input type="submit" value="Apply" className="btn btn-primary"/>
                    </div>
                </form>
                    </div>
                    <br></br>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>title</th>
                        <th>date of posting</th>
                        <th>number of applicants</th>
                        <th>maximum number of positions</th>
                        <th>deadline</th>
                        <th>Job Type</th>
                        <th>name</th>
                        <th>email</th>
                        <th>Skills</th>
                        <th>duration</th>
                        <th>Salary</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                { 
                    this.state.jobs.map((job, i) => {
                        console.log(job.salary)
                        const path = {
                            pathname: "/toapply/"+job._id, state: {id: job._id}
            
                        }
                        let track=false;
                        var array=[...this.state.applied_jobs]
                        let display;
                                    // console.log(array.length)
                                    let len=array.length,j=0;

                                    while(j<len)
                                    {
                                        console.log(array[j].job_id)
                                        if(array[j].job_id===job._id)
                                            track=true;
                                        j++;
                                    }
                                
                        if(job.title.includes(this.state.title) || this.state.title=== '' ){
                        return (
                            <tr key={i}>
                                <td>{job.title}</td>
                                <td>{job.date_of_posting} </td>
                                <td>{job.max_no_app}</td>
                                <td>{job.max_no_pos}</td>
                                <td>{job.deadline}</td>
                                <td>{job.job_type} </td>
                                <td>{job.name}</td>
                                <td>{job.email}</td>
                                <td>{job.skill}</td>
                                <td>{job.duration}</td>
                                <td>{job.salary} </td>
                                <td>{job.rating}</td>
                                <td>{
                                        track ? <Button  style = {{color:'red'}}  color="primary" disabled>Applied</Button> : 
                                        ((job.number_of_positions_filled >= job.max_no_app) ? 
                                        <Button  style = {{color:'black'}}  color="primary" disabled>Full</Button> : 
                                        <Link to={path}> <Button style = {{backgroundColor:'red'}} variant="contained">Apply</Button></Link>) 
                                    }</td>
                            </tr>
                        )
                        }
                    })
                
                }
                </tbody>
            </table>
        </div>
    )
}

  
}