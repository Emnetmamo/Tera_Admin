// src/components/Sidebar.js

import React from 'react';
import { Nav, Image } from 'react-bootstrap';
import { BsHouseDoorFill, BsPerson, BsPeople, BsPersonPlus, BsCardList, BsBoxArrowUpRight, BsPeopleFill, BsBell, BsCreditCard, BsFileText, BsChatSquareDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../assets/css/Sidebar.css'; // Import the CSS file for styling
import profileImg from "../assets/images/profileImg.jpg"; // Replace with the path to the user's photo

const Sidebar = () => {


  return (
    <Nav className="flex-column sidebar">
      <div className="user-info">
        <Image className="user-photo" src={profileImg} roundedCircle width="80" height="80" />
        <div className="user-details">
          <p className="user-name">Mr Samuel Abebe</p>
          {/* <p className="user-department">Transport Routing Department</p> */}
        </div>
      </div>
      <Link to="/" className="nav-link">
        <BsHouseDoorFill /> Dashboard
      </Link>
      <Link to="/register-supervisors" className="nav-link">
        <BsPerson /> Register Supervisors
      </Link>
      <Link to="/register-transport-employees" className="nav-link" >
        <BsPeople /> Register Transport Employees
      </Link>
      <Link to="/new-drivers-data" className="nav-link">
        <BsPersonPlus /> New Drivers Data
      </Link>
      <Link to="/assign-supervisors" className="nav-link" >
        <BsPeopleFill /> Assign Supervisors
      </Link>
      <Link to="/assign-employees" className="nav-link" >
        <BsBoxArrowUpRight /> Assign Transport Employees
      </Link>
      <Link to="/activate-deactivate-accounts" className="nav-link" >
        <BsCardList /> Activate/Deactivate Accounts
      </Link>
      <Link to="/tapela-change" className="nav-link" >
        <BsBell /> Tapela Change Notice
      </Link>
      <Link to="/notifications" className="nav-link" >
        <BsBell /> Send Notifications
      </Link>
      <Link to="/verify-payments" className="nav-link" >
        <BsCreditCard /> Verify Payments
      </Link>
      <Link to="/weekly-reports" className="nav-link" >
        <BsFileText /> Review Weekly Reports
      </Link>
      <Link to="/complaints" className="nav-link" >
        <BsChatSquareDots /> View Complaints
      </Link>
    </Nav>
  );
};

export default Sidebar;
