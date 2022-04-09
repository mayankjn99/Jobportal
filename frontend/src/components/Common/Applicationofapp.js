import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';

export default class Application extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            apps: []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('Type') === "Applicant" && localStorage.getItem('Login') ){
            const User  = {
                email: localStorage.getItem('email')
            }
            axios.post('http://localhost:4000/api/findapplicationforapp ', User)
            .then(res => {
                
                this.setState({
                    apps:res.data
                 
                 });   console.log(this.state.apps)
                
            })
            .catch(err =>
                {
                    console.log(err)
            });
        }
        else{
            alert("login first");
            this.props.history.push("/");
            window.location.reload();
        }

    }

    render() {

        return (
            <div>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Salary</th>
                        <th>Name of recruiter</th>
                        <th>StatusofJob</th>
                        <th>Date of joining</th>
                        <th>Rate</th>
                        
                    </tr>
                </thead>
                <tbody>
                { 
                    this.state.apps.map((job, i) => {
                        let disp=null;
                       if(job.status==="accepted"){
                            disp = (
                                <Button style = {{backgroundColor:'Green'}} variant="danger" onClick={() => {}}>Rate</Button>
                            );
                       }
                    
                        return (
                            <tr key={i}>
                                <td>{job.job_title}</td>
                                <td>{job.job_salary_per_month} </td>
                                <td>{job.name_recruiter}</td>
                                <td>{job.status}</td>
                                <td>{job.date_of_application}</td>
                                <td>{disp}</td>
                               
        
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