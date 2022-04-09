import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

export default class jobs extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            apps: []
        }
        this.Asortbyname =this.Asortbyname.bind(this);
        this.Dsortbyname = this.Dsortbyname.bind(this);
        this.AsortbyDate =this.AsortbyDate.bind(this);
         this.DsortbyDate = this.DsortbyDate.bind(this);
         this.Asortbyrating =this.Asortbyrating.bind(this);
         this.Dsortbyrating = this.Dsortbyrating.bind(this);
         this.AsortbyTitle = this.AsortbyTitle.bind(this);
         this.DsortbyTitle = this.DsortbyTitle.bind(this);

    }

    componentDidMount() {
        if(localStorage.getItem('Type') === "Recruiter" && localStorage.getItem('Login')  ){
           
            const newUser = {
                email: localStorage.getItem('email')
            };
             axios.post('http://localhost:4000/api/findapplicationforrec', newUser)
            .then(res => {
                console.log(res.data)
                this.setState({apps: res.data});
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

AsortbyTitle = () =>{
    let  n = this.state.apps.length;
    for(var i=0; i < n-1; i++)
    {
        for(var j=0; j < n-1-i; j++)
        {
            if( this.state.apps[j].job_title>  this.state.apps[j+1].job_title)
            {
                var temp=  this.state.apps[j];
                this.state.apps[j] =  this.state.apps[j+1];
                this.state.apps[j+1] = temp;
            }
        }
    }

    this.setState({apps: this.state.apps});
}
DsortbyTitle = () =>{
    let  n = this.state.apps.length;
    for(var i=0; i < n-1; i++)
    {
        for(var j=0; j < n-1; j++)
        {
            if( this.state.apps[j].job_title <  this.state.apps[j+1].job_title)
            {
                var temp=  this.state.apps[j];
                this.state.apps[j] =  this.state.apps[j+1];
                this.state.apps[j+1] = temp;
            }
        }
    }
    this.setState({apps: this.state.apps});
  
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
                    <Button variant="info" style = {{backgroundColor:'Orange'}} onClick={this.Dsortbyrating} >Rating descending</Button>&nbsp;
                    <Button variant="info" style = {{backgroundColor:'Green'}} onClick={this.AsortbyTitle} >Title ascending</Button>&nbsp; 
                    <Button variant="info" style = {{backgroundColor:'Orange'}} onClick={this.DsortbyTitle} >Title descending</Button>
                </div>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Name</th>
                        
                        <th>Date of joining</th>
                        <th>Job-Type</th>
                        
                    </tr>
                </thead>
                <tbody>
                { 
                    this.state.apps.map((job, i) => {
                        console.log(job)
                        return (
                            <tr key={i}>
                                <td>{job.job_title}</td>
                                <td>{job.name_applicant} </td>
                                <td>{job.date_of_application}</td>
                                <td>{job.job_type}</td>
                                
                               
        
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