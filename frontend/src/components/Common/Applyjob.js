import React, {Component} from 'react';
import axios from 'axios';

export default class Applyjob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            applied_jobs:[],
            job:[],
            currentjob:[],
            value:0,
            sop:'',
            lololol:false,
            status:'not applied',
            applicant_data:null,
        }
        this.onChangesop = this.onChangesop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        // console.log(localStorage.getItem('Type'))
        // console.log(localStorage.getItem('Login') )
        if(localStorage.getItem('Type') === "Applicant" && localStorage.getItem('Login') === 'true'){
            const User = {
                email: localStorage.getItem('email')
            }
            axios.post('http://localhost:4000/api/findapplicant ', User)
            .then(res => {
                console.log(res.data);
                this.setState({applicant_data: res.data});
                console.log(this.state.applicant_data.number_of_applied_jobs)
                if(this.state.applicant_data.number_of_applied_jobs >=10)
                {
                    alert("You have applied 10 times ");
                    this.props.history.push('/viewjob');
                    window.location.reload();
                }
                else{
                    axios.post('http://localhost:4000/api/findjob',{id: this.state.id}).then(res =>
                    {
                        console.log(res.data)
                        this.setState({
                           job:res.data
                        });
                    }
                );
                }
               
                
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
    onChangesop(event){
        this.setState({sop: event.target.value});
    }
    async onSubmit(e){
        e.preventDefault();
            // alert(this.state.sop.split(" ").length)
            if(this.state.sop.split(" ").length>250){
                window.alert("word limit crossed");
              
            }
            else if(this.state.sop === ''){
                window.alert("enter statement of purpose");
            }
            else{

                const newApp = {
                    sop: this.state.sop,
                    recruiter_email: this.state.job.email,
                    name_recruiter: this.state.job.name,
                    // deadline_of_application: this.state.job.deadline,
                    date_of_application: Date.now(),
                    job_salary_per_month: this.state.job.salary,
                    status_of_job:this.state.job.status,
                    job_id: this.state.job._id,
                    applicant_email: localStorage.getItem('email'),
                    status: "applied",
                    job_title: this.state.job.title,
                    name_applicant:localStorage.getItem('name'),
                    skills_applicant: this.state.applicant_data.skills,
                    education_applicant: this.state.applicant_data.education,
                    job_type:this.state.job.job_type,
                    // rating: this.state.applicant_data.rating,
                }
                console.log(newApp)
               
                await axios.post('http://localhost:4000/api/addapplication', newApp)
                    .then(res => {alert("Submitted Application");
                        console.log(res.data);
                        
                        
                    })
                    .catch(err =>
                        {
                            console.log(err)
                        });
                
                
                await axios.post('http://localhost:4000/api/increment_application_count', {email: localStorage.getItem("email")})
                .then(res => {
                    console.log(res.data);
                })
                .catch(err =>
                    {             
                        console.log(err)
                    });
                    await axios.post('http://localhost:4000/api/increment_job_count', {id : this.state.id})
                .then(res => {
                    console.log(res.data);
                })
                .catch(err =>
                    {             
                        console.log(err)
                    });
                    this.setState({
                        sop:''
                    });
                    this.props.history.push('/viewjob');
            }
    }
    render() {
        
        let dashboard = (
            <div>
            <form onSubmit={this.onSubmit}>
                <div >
                    <label>Sop: </label>
                    <input type="text" 
                           className="form-control" 
                           value={this.state.sop}
                           onChange={this.onChangesop}
                           />  
                </div>
                <br></br>
                <div >
                      <input  type="submit" value="Submit" className="btn btn-primary"  /> 
                </div>
            </form>
           
        </div>
        );
        return (
            <div>
                {dashboard}
           </div>
        )
    }
}