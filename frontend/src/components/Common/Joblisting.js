
import React, {Component} from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";


export default class Joblistings extends Component {
    
    constructor(props) {
        super(props);
        // this.deletejob = this.deletejob.bind(this)
        this.state = {  jobs: []
         };
    }
    
     componentDidMount() {
        console.log("Hi")
        // alert("Hi")
        if(localStorage.getItem('Type') === "Recruiter" && localStorage.getItem('Login') === "true" ){
           
            const newUser = {
                email: localStorage.getItem('email')
            };
             axios.post('http://localhost:4000/api/job/view', newUser)
            .then(res => {
                console.log(res.data)
                this.setState({jobs: res.data});
                // alert(this.state.jobs.title)
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

deletejob(id) {
    axios.post('http://localhost:4000/api/job/delete',{'id': id})
    .then(response => { 
        console.log(response.data)
    });
    this.setState({
      jobs: this.state.jobs.filter(el => el._id !== id)
    })
}
deletejob = this.deletejob;
render() {
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>title</th>
                        <th>date of posting</th>
                        <th>number of applicants</th>
                        <th>maximum number of positions</th>
                        <th>delete</th>
                        <th>View</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                { this.state.jobs === undefined  ? null :
                    this.state.jobs.map((job, i) => {
                        
                        const editjob = {
                            pathname: "/editjob/"+job._id,
                            state: {id: job._id}
            
                        }
                        const viewjob = {
                            pathname: "/viewappjobs/"+job._id,
                            state: {id: job._id}
            
                        }
                        
                       
                        return (
                            <tr key={i}>
                                <td>{job.title}</td>
                                <td>{job.date_of_posting} </td>
                                <td>{job.max_no_app}</td>
                                <td>{job.max_no_pos}</td>
                                <td> <Button style = {{backgroundColor:'Black'}} variant="danger" onClick={() => {this.deletejob(job._id) }}>Delete</Button></td>
                                    <td>  <Link  to={viewjob} ><Button style = {{backgroundColor:'Green'}} variant="contained" >view</Button></Link></td>
                                   
                                    <td>    <Link  to={editjob}  ><Button style = {{backgroundColor:'Yellow'}} variant="contained" >edit</Button></Link></td>
        
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
}
