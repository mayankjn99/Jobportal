import React, {Component} from 'react';
import axios from 'axios';

export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            Password: '',
            Type: 'Applicant',
            bio: '',
            contact_no: '',
            education: [],
            institution_name: '',
            start_year: '',
            end_year: '',
            skills: ''

            // date:null
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.ValidateEmail = this.ValidateEmail.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangeContactno = this.onChangeContactno.bind(this);
        this.onChangeEducation = this.onChangeEducation.bind(this);
        this.onChangeInstitution_name = this.onChangeInstitution_name.bind(this);
        this.onChangeStart_Year = this.onChangeStart_Year.bind(this);
        this.onChangeEnd_Year = this.onChangeEnd_Year.bind(this);
        this.onSubmitEducation = this.onSubmitEducation.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    
		ValidateEmail(email) 
		{
		 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
		  {
		    return (false)
		  }
		    alert("You have entered an invalid email address!")
		    return (true)
		}
    
    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ Password: event.target.value });
    }
    onChangeType(event) {
        this.setState({ Type: event.target.value });
    }
    onChangeBio(event) {
        this.setState({ bio: event.target.value });
    }
    onChangeContactno(event) {
        this.setState({ contact_no: event.target.value });
    }
    onChangeEducation(event) {
        this.setState({ education: event.target.value });
    }
    onChangeInstitution_name(event) {
        this.setState({ institution_name: event.target.value });
    }
    onChangeStart_Year(event) {
        this.setState({ start_year: event.target.value });
    }
    onChangeEnd_Year(event) {
        this.setState({ end_year: event.target.value });
    }
    onChangeSkills(event) {
        this.setState({ skills: event.target.value });
    }
    onSubmitEducation(e){
        e.preventDefault();
        const obj = {
            institution_name: this.state.institution_name,
            start_year: this.state.start_year,
            end_year: this.state.end_year
        }
        if(this.state.start_year !== '' && this.state.institution_name !== ''){
        let e1 = this.state.education;
        e1.push(obj);
        this.setState({
            education: e1,
            institution_name: '',
            start_year: '',
            end_year: ''
        });
        }
        else
        {
            alert("I and S ");
        }
    }

  
    onSubmit(e) {
        e.preventDefault();
        // const newUser = {};
        if(this.ValidateEmail(this.state.email)){return ;}
        let newUser ;
        if(this.state.Type === "Recruiter"){
            newUser = {
                name: this.state.name,
                email: this.state.email,
                Password: this.state.Password,
                Type: this.state.Type,
                bio: this.state.bio,
                contact_no: this.state.contact_no,
                
            }
        }
        else{
            newUser = {
                name: this.state.name,
                email: this.state.email,
                Password: this.state.Password,
                Type: this.state.Type,
                education: this.state.education,
                skills: this.state.skills
                
            }
        }
      
        console.log(newUser);
        // axios.post('http://localhost:4000/api/login', newUser).then
        // (res => {
            // if(res.status !== 200 ){
                if(this.state.Type==="Applicant"){
                    axios.post('http://localhost:4000/api/applicant/add', newUser)
                     .then(res => {alert("Created\t" + res.data.name);console.log(res.data)})
                     ;
                }
                else{
                    axios.post('http://localhost:4000/api/recruiter/add', newUser)
                    .then(res => {alert("Created\t" + res.data.name);
                    
                    console.log(res.data)})
                    ;
               }
                axios.post('http://localhost:4000/api/user/add', newUser).then(res => {console.log(res.data)});
                    
              
            // }
            // else{
            //     alert("User already exists ")
            // }

        // });
        this.setState({ 
            name: '',
            email: '',
            Password: '',
            Type: 'Applicant',
            bio: '',
            contact_no: '',
            education: [],
            skills: ''
            // date:null
        });
      
    }

    render() {
        let opt;
        if(this.state.Type === "Applicant")
        {
            opt = (
                <div>
                      <form>
                      <div className="form-group">
                        <label>Institution Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.institution_name}
                               onChange={this.onChangeInstitution_name}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Start Year: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.start_year}
                               onChange={this.onChangeStart_Year}
                               />  
                    </div>
                    <div className="form-group"> 
                        <label>End Year: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.end_year}
                               onChange={this.onChangeEnd_Year}
                               />  
                    </div>
                  
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" onClick={this.onSubmitEducation}/>
                    </div>
                    
                      </form>
                      <div className="form-group">
                        <label>Skills: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.skills}
                               onChange={this.onChangeSkills}
                               />  
                    </div>
                </div>
            );
        }
        else{
            opt = (
                <div>
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
                    
                </div>
            );
        }
        return (
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
                        <input type="text" 
                               className="form-control" 
                               value={this.state.Password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <select value={this.state.Type}
                            onChange={this.onChangeType}>
                            <option value="Applicant">Applicant</option>
                            <option value="Recruiter">Recruiter</option>
                        </select>
                      
                    </div>
                    <div>
                        {opt}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
           
        )
    }
}