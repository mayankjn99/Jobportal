import React, {Component} from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class Editjob extends Component{
        
    constructor(props) {
        super(props);
        this.state = {
            max_no_app:'',
            max_no_pos:'',
            deadline: '',
            id: this.props.location.state.id
        }
        this.onChangeMax_no_app = this.onChangeMax_no_app.bind(this);
        this.onChangeMax_no_pos = this.onChangeMax_no_pos.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeMax_no_app(event) {
        this.setState({ max_no_app: event.target.value });
    }

    onChangeMax_no_pos(event) {
        this.setState({ max_no_pos: event.target.value });
    }

    onChangeDeadline(event) {
        this.setState({ deadline: event.target.value });
    }
    componentDidMount(){
        if(localStorage.getItem('Type') === "Recruiter" && localStorage.getItem('Login') === "true" ){
           
        console.log("Hi")
        console.log(this.state.id)
        axios.post('http://localhost:4000/api/findjob',{id: this.state.id}).then(res =>
            {
                console.log(res.data)
                this.setState({
                    max_no_app: res.data.max_no_app,
                    max_no_pos: res.data.max_no_pos,
                    deadline: res.data.deadline
                })
            }
        );
        }
        else{
            alert("login first");
            this.props.history.push("/");
            window.location.reload();
        }

    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.max_no_app)
        const newJob = {
         
            max_no_app: this.state.max_no_app,
            max_no_pos: this.state.max_no_pos,
            // date_of_posting: Date.now,
            deadline: this.state.deadline,
            id:this.state.id
 

        }
        axios.post('http://localhost:4000/api/jobupdate',newJob).then( res=> {alert("Updated")});
 
    //    <Link></Link>
    
      
        this.setState({
         
            max_no_app: '',
            max_no_pos: '',
            // date_of_posting: 'Date.now',
            deadline: '',
           
        });
        this.props.history.push('/listing');
    }

    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit}>  
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
                <div className="form-group">
                    <label>Deadline: </label>
                    <input type="datetime-local" min="1"
                           className="form-control" 
                           value={this.state.deadline}
                           onChange={this.onChangeDeadline}
                           />  
                </div>
                <div className="form-group">
                    <input type="submit" value="Update" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
}