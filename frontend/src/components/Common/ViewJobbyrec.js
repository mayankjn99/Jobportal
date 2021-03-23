import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

export default class Viewjob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            apps: [],
            id: this.props.location.state.id
        }
        this.Asortbyname =this.Asortbyname.bind(this);
        this.Dsortbyname = this.Dsortbyname.bind(this);
        this.AsortbyDate =this.AsortbyDate.bind(this);
         this.DsortbyDate = this.DsortbyDate.bind(this);
         this.Asortbyrating =this.Asortbyrating.bind(this);
         this.Dsortbyrating = this.Dsortbyrating.bind(this);
         this.rejectapp = this.rejectapp.bind(this);
         this.shortlistapp = this.shortlistapp.bind(this);
         this.acceptapp = this.acceptapp.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('Type') === "Recruiter" && localStorage.getItem('Login') === "true" ){
            const newUser = {
                // name: this.state.name,
                email: localStorage.getItem('email') ,
                id: this.state.id
              
            }
            console.log(localStorage.getItem('email') )
            axios.post('http://localhost:4000/api/findapplicationforrec',newUser).then(res => {
                
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
    Asortbyname = () =>{
        let  n = this.state.apps.length;
        console.log("HI")
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1-i; j++)
            {
                if(this.state.apps[j].name_applicant > this.state.apps[j+1].name_applicant)
                {
                    var temp=  this.state.apps[j];
                    this.state.apps[j] =  this.state.apps[j+1];
                    this.state.apps[j+1] = temp;
                }
            }
        }
        // console.log(this.state.apps[0].salary)
        // console.log(this.state.apps[1].salary)
        this.setState({apps: this.state.apps});
    }
    Dsortbyname = () =>{
        let  n = this.state.apps.length;
      
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                if( this.state.apps[j].name_applicant <  this.state.apps[j+1].name_applicant)
                {
                    var temp=  this.state.apps[j];
                    this.state.apps[j] =  this.state.apps[j+1];
                    this.state.apps[j+1] = temp;
                }
            }
        }
        this.setState({apps: this.state.apps});
    }
    AsortbyDate = () =>{
        let  n = this.state.apps.length;
        console.log("HI")
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1-i; j++)
            {
                if(this.state.apps[j].date_of_application > this.state.apps[j+1].date_of_application)
                {
                    var temp=  this.state.apps[j];
                    this.state.apps[j] =  this.state.apps[j+1];
                    this.state.apps[j+1] = temp;
                }
            }
        }
        console.log(this.state.apps[0].salary)
        console.log(this.state.apps[1].salary)
        this.setState({apps: this.state.apps});
    }
    DsortbyDate = () =>{
        let  n = this.state.apps.length;
      
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                if( this.state.apps[j].date_of_application <  this.state.apps[j+1].date_of_application)
                {
                    var temp=  this.state.apps[j];
                    this.state.apps[j] =  this.state.apps[j+1];
                    this.state.apps[j+1] = temp;
                }
            }
        }
        this.setState({apps: this.state.apps});
    }

Asortbyrating = () =>{
    let  n = this.state.apps.length;
    for(var i=0; i < n-1; i++)
    {
        for(var j=0; j < n-1-i; j++)
        {
            if( this.state.apps[j].rating>  this.state.apps[j+1].rating)
            {
                var temp=  this.state.apps[j];
                this.state.apps[j] =  this.state.apps[j+1];
                this.state.apps[j+1] = temp;
            }
        }
    }

    this.setState({apps: this.state.apps});
}
Dsortbyrating = () =>{
    let  n = this.state.apps.length;
    for(var i=0; i < n-1; i++)
    {
        for(var j=0; j < n-1; j++)
        {
            if( this.state.apps[j].rating <  this.state.apps[j+1].rating)
            {
                var temp=  this.state.apps[j];
                this.state.apps[j] =  this.state.apps[j+1];
                this.state.apps[j+1] = temp;
            }
        }
    }
    this.setState({apps: this.state.apps});
  
}
acceptapp = (id,job_id) => {
    axios.post('http://localhost:4000/api/findpositions',{'id': job_id})
    .then(response => { 
        console.log(response.data)
        if(response.data.no_of_accepted < response.data.max_no_pos){
   
    axios.post('http://localhost:4000/api/jobacceptedupdate',{'id': job_id})
    .then(response => { 
        console.log(response.data)
    });
    axios.post('http://localhost:4000/api/statusaccepted',{'id': id})
    .then(response => { 
        console.log(response.data)
    });
    }
    else{
        alert("can't Accept ");
    }
});
    // window.location.reload();
}
rejectapp = (id) => {
    axios.post('http://localhost:4000/api/statusrejected',{'id': id})
    .then(response => { 
        console.log(response.data)
    });
    window.location.reload();
}
shortlistapp = (id) => {
    console.log("Hi")
    
    console.log(id)
    axios.post('http://localhost:4000/api/statusshortlisted',{'id': id})
    .then(response => { 
        console.log(response.data)
    });
    window.location.reload();
   
}
    render() {
        return (
            <div>
                <div>
                    <p>Sort Options</p>
                    <Button variant="info" style = {{backgroundColor:'Red'}} onClick={this.Asortbyname} >Name ascending</Button>&nbsp;
                    <Button variant="info" style = {{backgroundColor:'Dark-Green'}} onClick={this.Dsortbyname} >Name descending </Button>&nbsp;
                    <Button variant="info" style = {{backgroundColor:'Blue'}}onClick={this.AsortbyDate} >Date ascending</Button>&nbsp;
                    <Button variant="info" style = {{backgroundColor:'Brown'}} onClick={this.DsortbyDate} >Date descending </Button>&nbsp;
                    <Button variant="info" style = {{backgroundColor:'Green'}} onClick={this.Asortbyrating} >Rating ascending</Button>&nbsp; 
                    <Button variant="info" style = {{backgroundColor:'Orange'}} onClick={this.Dsortbyrating} >Rating descending</Button>
                </div>
                <div>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Applicant Name</th>
                        <th>Skills</th>
                        <th>Date of Application</th>
                        <th>SOP</th>
                           {/* <th>Education</th> */}
                        {/* <th>Rating</th> */}
                        <th>Stage of Applicantion</th>
                        <th>B1</th>
                        <th>B2</th>
                        
                    </tr>
                </thead>
                <tbody>
                { 
                    this.state.apps.map((job, i) => {
                        
                        let b1=null;
                        let b2=null;
                        if(job.status != 'accepted'){
                        b2 = ( 
                            <Button style = {{backgroundColor:'Black'}} variant="danger" onClick={() => {this.rejectapp(job._id) }}>Reject</Button>
                        );
                        }
                        console.log(job.stage_of_application)
                        // if(job.stage_of_application===0){
                            
                        //     b1 = (<Button style = {{backgroundColor:'Red'}} variant="danger" >Applied</Button>);
                        // }
                       
                        if(job.stage_of_application===0){
                            console.log(job)
                            b1 = (<Button style = {{backgroundColor:'Red'}} variant="danger"onClick={() => {this.shortlistapp(job._id) }} >Shortlist</Button>);
                           
                        }
                        else{
                            b1= (<Button style = {{backgroundColor:'Red'}} variant="danger"onClick={() => {this.acceptapp(job._id,job.job_id) }} >Accept</Button>);

                        }

                        return (
                            
                            <tr key={i}>
                                <td>{job.name_applicant}</td>
                                <td>{job.skills_applicant} </td>
                                <td>{job.date_of_application}</td>
                                <td>{job.sop}</td>
                                <td>{job.status}</td>
                                <td>{b1}</td>
                                <td>{b2}</td>
                                {/* <td>{job.education_applicant.institution_name}</td> */}
                                
                               
        
                            </tr>
                        )
                    })
                }
                </tbody>
                </table>
                </div>
           </div>
        )
    }
}