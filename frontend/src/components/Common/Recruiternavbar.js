import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class recruiterNavbar extends Component {

  render() {
    return (
      <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        {/* <Link to="/" className="navbar-brand"> Pandora </Link> */}
        <div className="collpase navbar-collapse">  
        <ul className="navbar-nav mr-auto">      
          <li className="navbar-item">  
          <Link to="/addjob" className="nav-link">Add job</Link>
        </li>
          <li className="navbar-item">
          <Link to="/Recruiterprofile" className="nav-link">Recruiter Profile</Link>
          </li>
          <li className="navbar-item">
          <Link className="nav-link" to="/register" onClick={() => {
            localStorage.clear();
            window.location.href = "/register"; }}>Logout</Link>
          </li>
          <li className="navbar-item">
          <Link className="nav-link" to="/listing" >Job Listing</Link>
          </li>
          <li className="navbar-item">
          <Link className="nav-link" to="/viewaccjobs" >View Jobs</Link>
          </li>
          
        </ul>
        </div>
      </nav>
     </div>
    );
  }
}