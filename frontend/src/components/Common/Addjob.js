import React, {Component} from 'react';
import axios from 'axios';

export default class AddJob extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            name: '',
            email: '',
            max_no_app: '',
            max_no_pos: '',
            // date_of_posting: Date.now,
            deadline: '',
            skill: '',
            job_type: 'Full-Time',
            salary: '',
            time: '',
            rating: '',
            // rating: '',
            // salary: '',
            // date_of_posting: '',
            // deadline: '',
            // skill: ''
            
        }
        this.onChangeMax_no_app = this.onChangeMax_no_app.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeMax_no_pos = this.onChangeMax_no_pos.bind(this);
        // this.onChangeDate_of_posting = this.onChangeDateposting.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeSkill = this.onChangeSkill.bind(this);
        this.onChangeJobtype = this.onChangeJobtype.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        // this.onChangeRating = this.onChangeRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeMax_no_app(event) {
        this.setState({ max_no_app: event.target.value });
    }

    onChangeMax_no_pos(event) {
        this.setState({ max_no_pos: event.target.value });
    }

    onChangeTitle(event) {
        this.setState({ title: event.target.value });
    }
    // onChangeDateposting(event) {    
    //     this.setState({ date_of_posting: event.target.value });
    // }
    onChangeDeadline(event) {
        this.setState({ deadline: event.target.value });
    }
    onChangeSkill(event) {
        this.setState({ skill: event.target.value });
    }
    onChangeJobtype(event) {
        this.setState({ job_type: event.target.value });
    }
    onChangeSalary(event) {
        this.setState({ salary: event.target.value });
    }
    onChangeTime(event) {
        this.setState({ time: event.target.value});
    }
    // onChangeRating(event) {
    //     this.setState({ rating: event.target.value });
    // }
 
    onSubmit(e) {
        e.preventDefault();

        const newJob = {
            name: localStorage.getItem('name'),
            title: this.state.title,
            email:  localStorage.getItem('email'),
            max_no_app: this.state.max_no_app,
            max_no_pos: this.state.max_no_pos,
            // date_of_posting: Date.now,
            deadline: this.state.deadline,
            skill: this.state.skill,
            job_type: this.state.job_type,
            salary: this.state.salary,
            time: this.state.time

        }
 
        
        if (localStorage.getItem('Login') &&
            localStorage.getItem('Type') === "Recruiter") {
              console.log(newJob);
              localStorage.setItem('Jobs',newJob);
              axios.post('http://localhost:4000/api/job/add',newJob).then(
                  res=>{
                    alert("Job added Successful");

                  }
              )
              .catch(function(error){
                if(error.response.data.message)
                alert(error.response.data.message);
                console.log(error);
              }
              )
        }
        else{
            alert("login first");
            this.props.history.push("/");
            window.location.reload();
        }
        // console.log(newJob);
      
        this.setState({
            title: '',
            name: '',
            email: '',
            max_no_app: '',
            max_no_pos: '',
            // date_of_posting: 'Date.now',
            deadline: '',
            skill: '',
            job_type: 'Full-Time',
            // duration: '',
            salary: '',
            rating: '',
            time: ''
        });
    }

    render() {
        // console.log("Hi")
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.title}
                               onChange={this.onChangeTitle}
                               />
                    </div>
                    
                    <div className="form-group">
                        <label>Maximum Applications: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.max_no_app}
                               onChange={this.onChangeMax_no_app}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Maximum Positions: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.max_no_pos}
                               onChange={this.onChangeMax_no_pos}
                               />  
                    </div>
                    {/* <div className="form-group">
                        <label>Posting Date: </label>
                        <input type="text" min="1"
                               className="form-control" 
                               value={this.state.date_of_posting}
                               onChange={this.onChangeDateposting}
                               />  
                    </div> */}
                    <div className="form-group">
                        <label>Deadline: </label>
                        <input type="datetime-local" min="1"
                               className="form-control" 
                               value={this.state.deadline}
                               onChange={this.onChangeDeadline}
                               />  
                    </div>
                     <div className="form-group">
                        <label>Skills: </label>
                        <input type="text" min="1"
                               className="form-control" 
                               value={this.state.skill}
                               onChange={this.onChangeSkill}
                               />  
                    </div>
                    
                    <div className="form-group">
                        <label>Job Type </label>
                        <select value={this.state.job_type}
                            onChange={this.onChangeJobtype}>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Work from Home">Work from Home</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="Number" min="1"
                               className="form-control" 
                               value={this.state.salary}
                               onChange={this.onChangeSalary}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Duration: </label>
                        <select value={this.state.time}
                               onChange={this.onChangeTime}
                               >  <option value="0">0</option>
                               <option value="1">1</option>
                               <option value="2">2</option>
                               <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>

                               </select>  
                    </div>
                    {/* <div className="form-group">
                        <label>Rating: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.rating}
                               onChange={this.onChangeRating}
                               />  
                    </div> */}
                    <div className="form-group">
                        <input type="submit" value="Add listing" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}