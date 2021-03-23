import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

// import UsersList from './components/Users/UsersList'
// import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Navbar from './components/templates/Navbar'
// import Profile from './components/Users/Profile'
import Login from './components/Common/Login'
import Profile from './components/Common/ApplicantProfile'
import RecProfile from './components/Common/RecruiterProfile'
import Appnavbar from './components/Common/Applicantnavbar'
import RecruiterNav from './components/Common/Recruiternavbar'
import AddJob from './components/Common/Addjob.js'
import JobList from './components/Common/Joblisting'
import Jobedit from './components/Common/Editjob'
import Jobview from './components/Common/Jobview'
import Applicantion from './components/Common/Applicationofapp'
import Viewappjob from './components/Common/ViewJobbyrec'
import Apply from './components/Common/Applyjob'
import Viewaccjob from './components/Common/Viewaccjobs'

class App extends React.Component{

render(){
  let navbar =null;

  let Type = localStorage.getItem('Type');
  // console.log(Type);
  if(Type === "Applicant")
    navbar = <Appnavbar/>;
  else if(Type === "Recruiter")
    navbar = <RecruiterNav/>
  else
    navbar= <Navbar/>;
  return (
    <Router>
      <div className="container">
        {navbar}
        <br/>
        <Route exact path="/" render={()=> {
            if(Type === "Applicant") 
            {
              
              return <Profile/>
            }
            else if(Type === "Recruiter")
              return <RecProfile/>
           
            else 
              return <Register/>
          }}  />
        {/* <Route path="/" exact component={Home}/> */}
        {/* <Route path="/users" exact component={UsersList}/> */}
        <Route path="/register" component={Register}/>
        {/* <Route path="/profile" component={Profile}/> */}
        <Route path="/login" component={Login}/>
        <Route path="/ApplicantProfile" component={Profile}/>
        <Route path="/RecruiterProfile" component={RecProfile}/>
        <Route path="/addjob" component={AddJob}/>
        <Route path="/listing" component={JobList}/>
        <Route path="/editjob" component={Jobedit}/>
        <Route path="/viewjob" component={Jobview}/>
        <Route path="/myapplications" component={Applicantion}/>
        <Route path="/viewappjobs" component={Viewappjob}/>
        <Route path="/toapply" component={Apply}/>
        <Route path="/viewaccjobs" component={Viewaccjob}/>
       
      </div>
    </Router>
  );
}
}

export default App;
