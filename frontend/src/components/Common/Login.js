import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class Login extends Component {
    
     
    constructor(props) {
        super(props);

        this.state = {
            
            email: '',
            Password: ''
       
            // date:null
        }

        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        // this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    // onChangeUsername(event) {
    //     this.setState({ name: event.target.value });
    // }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ Password: event.target.value });
    }
    // onChangeType(event) {
    //     this.setState({ Type: event.target.value });
    // }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            // name: this.state.name,
            email: this.state.email,
            Password: this.state.Password
        }
        // console.log(newUser);
  
        axios.post('http://localhost:4000/api/login', newUser).then
        (res => {
        //    console.log(res.data)  
        //    console.log(this.state.Password)
            if(res.data.Password===newUser.Password){
                alert("Login Successful ");
                // let login='false';
                alert(res.data.name);
                localStorage.setItem('Login',"true");
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('Password', res.data.Password);
                localStorage.setItem('Type', res.data.Type);
               
                // console.log(res.body._id)
                this.props.history.push("/");
            window.location.reload();
            }
            else{
                alert("Password incorrect");
                console.log(res.data.email) 
            }
           
        })
        .catch( err => { alert("User not found")});
        this.setState({ 
          
            email: '',
            Password: ''
        
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {/* <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                               />
                    </div> */}
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="Password" 
                               className="form-control" 
                               value={this.state.Password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    {/* <div className="form-group">
                        <label>Type: </label>
                        <select value={this.state.Type}
                            onChange={this.onChangeType}>
                            <option value="Applicant">Applicant</option>
                            <option value="Recruiter">Recruiter</option>
                        </select>
                      
                    </div> */}
                    

                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
           
        )
    }
}