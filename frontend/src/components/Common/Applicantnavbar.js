import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class applicantNavbar extends Component {

  render() {
    return (
      <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        {/* <Link to="/" className="navbar-brand"> Pandora </Link> */}
        <div className="collpase navbar-collapse">  
        <ul className="navbar-nav mr-auto">
          {/* <li className="navbar-item">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li> */}
          {/* <li className="navbar-item">
          <Link to="/orders" className="nav-link">View orders</Link>
          </li>
          <li className="navbar-item">
          <Link to="/product-review" className="nav-link">Review order</Link>
        </li>*/}
          <li className="navbar-item">
          <Link to="/ApplicantProfile" className="nav-link">ApplicantProfile</Link>
          </li> 
        
          <li className="navbar-item">
          <Link to="/viewjob" className="nav-link">Dashboard</Link>
          </li>
          <li className="navbar-item">
          <Link className="nav-link" to="/myapplications" >My Applications</Link>
          </li> 
          <li className="navbar-item">
          <Link className="nav-link" to="/register" onClick={() => {
            localStorage.clear();
            window.location.href = "/register"; }}>Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
     </div>
    );
  }
}