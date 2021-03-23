import React, {Component} from 'react';
import axios from 'axios';

export default class ApplicantProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            education: [],
            institution_name: '',
            start_year: '',
            end_year: '',
            skills: '',
            loading: false
            // date:null
        }
    }
    componentDidMount()
    {
        if(localStorage.getItem('Type') === "Applicant" && localStorage.getItem('Login') === "true" ){
        this.state.email= localStorage.getItem('email');
        this.state.name = localStorage.getItem('name');
    
        // alert(this.state.email)
        console.log(this.state.email)   
        console.log("Again")
        let val = "true";
        // alert(val);
        const newUser = {
            // name: this.state.name,
            email: this.state.email,
            name: this.state.name,

          
        }
        
        axios.post('http://localhost:4000/api/findapp',newUser).then(res =>{
            if(res.status === 200){
                this.setState({
                    loading: true,
                    name: res.data.name,
                    email: res.data.email,
                    skills: res.data.skills,
                    education: res.data.education
                })
            }
            console.log(this.state.education    )

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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Skills</th>
                      
                        
                        {/* <th>delete</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.state.name}</td>
                        <td>{this.state.email}</td>
                        <td>{this.state.skills}</td>
                       </tr>
                </tbody> 
                </table> 
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Institute Name</th>
                        <th>Start Year</th>
                        <th>End Year</th>
                      
                        
                        {/* <th>delete</th> */}
                    </tr>
                </thead>
                
            {
            this.state.education.map((obj, i) => {
                return (
                <tr key={i}>
                    <th>{obj.institution_name}</th>
                    <th>{obj.start_year}</th>
                    <th>{obj.end_year}</th>
                </tr>
                )
            }) 
            }
             </table>
           
            </div>
        

        )
    }
}
