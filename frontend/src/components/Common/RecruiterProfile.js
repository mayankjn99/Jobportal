import React, {Component} from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router';

export default class RecProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            bio: '',
            contact_no: '',
            loading: false,
            id:''
            // dashboard: ''
        }   
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangeContactno = this.onChangeContactno.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.Edit = this.Edit.bind(this);
    }
   

    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    // onChangePassword(event) {
    //     this.setState({ Password: event.target.value });
    // }
    onChangeBio(event) {
        this.setState({ bio: event.target.value });
    }
    onChangeContactno(event) {
        this.setState({ contact_no: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const User = {
            name: this.state.name,
            email: this.state.email,
            bio: this.state.bio,
            contact_no: this.state.contact_no,
            id : this.state.id
        }
        axios.post('http://localhost:4000/api/recruiter/update', User).then(res => {alert("Updated\t" + res.data.name);
            
        console.log(res.data)
            localStorage.setItem('email',this.state.email);
            localStorage.setItem('name',this.state.name);
    }
        );window.location.reload();
        this.setState({ 
            name: this.state.name,
            email: this.state.email,    
            loading: false,
            bio: this.state.bio,
            contact_no: this.state.contact_no,
            id: this.state.id
            // date:null
        });

    }
    componentDidMount()
    {
        if(localStorage.getItem('Type') === "Recruiter" && localStorage.getItem('Login')  ){
           
        this.state.email= localStorage.getItem('email');
        this.state.name = localStorage.getItem('name');
        // this.state.id = localStorage.getItem('id');
        // alert(this.state.email)
       
        console.log("Again")
        let val = "true";
        // alert(val);
        const newUser = {
            // name: this.state.name,
            email: this.state.email

          
        }
        
        axios.post('http://localhost:4000/api/findrec',newUser).then(res =>{
            if(res.status === 200){
                this.setState({
                    loading: true,
                    name: res.data.name,
                    email: res.data.email,
                    contact_no: res.data.contact_no,
                    bio: res.data.bio,
                    id:res.data._id
                })
                // localStorage.setItem('id',this.state.id);
            }

        });
    }
    else{
        alert("login first");
            this.props.history.push("/");
            window.location.reload();
    }
    }
    Edit(e){
        console.log("Init")
        this.setState({
            loading: false
        });
    }
    render() {
       
        console.log("Hi")
        let dashboard;
        // this.state.email= localStorage.getItem('email');
        // this.state.name = localStorage.getItem('name');
        // // this.state.Password = localStorage.getItem('Password');
        // // alert(this.state.email)
        // let val = "true";
        // // alert(val);
        // const newUser = {
        //     // name: this.state.name,
        //     email: this.state.email,
        //     name: this.state.name,

          
        // }
        // await axios.post('http://localhost:4000/api/login', newUser).then
        // (res => {  
        //     console.log(res.data.bio)
        // alert(newUser.bio)
            if(this.state.loading === false ){
            //  val="false"
            // alert("HI") 
                // if(this.state.bio === undefined){
             dashboard = (
                // "Need to enter details"
                <div>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text" 
                           className="form-control" 
                           value={this.state.name}
                           onChange={this.onChangeUsername}
                           />
                </div>
                {/* <div className="form-group">
                    <label>Email: </label>
                    <input type="text" 
                           className="form-control" 
                           value={this.state.email} 
                           onChange={this.onChangeEmail}
                           />  
                </div>
                 */}
                
                    <div className="form-group">
                        <label>Bio: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.bio}
                               onChange={this.onChangeBio}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Contact Number: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.contact_no}
                               onChange={this.onChangeContactno}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>
                </form>
                </div>
                
            );
           
             }    
                else
                {
                    dashboard = (
                        <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact Number</th>
                                    <th>Bio</th>
                                    {/* <th>delete</th> */}
                                </tr>
                            </thead>
                                <tr>
                                    <td>{this.state.name}</td>
                                    <td>{this.state.email}</td>
                                    <td>{this.state.contact_no}</td>
                                    <td>{this.state.bio}</td>
                                </tr>
                                
                            <tbody>
                            </tbody>
                        </table>
                        
                         <div className="form-group">
                         <input type="submit" value="Update" className="btn btn-primary" onClick={this.Edit}/>
                     </div>
                        </div>

                    );
                }
            
        
        return (
            <div>
                  {dashboard}
                 
            </div>
      
        )
    }
}