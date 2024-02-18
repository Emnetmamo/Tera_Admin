// src/components/Sidebar.js

import React from 'react';
import { Nav, Image } from 'react-bootstrap';
import { BsHouseDoorFill, BsPersonPlus, BsPeople,BsBusFront, BsCardList, BsBoxArrowUpRight, BsPeopleFill, BsBell, BsCreditCard, BsFileText, BsChatSquareDots } from 'react-icons/bs';
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
      <Link to="/dashboard" className="nav-link">
        <BsHouseDoorFill /> Dashboard
      </Link>
      <Link to="/dashboard/register-supervisors" className="nav-link">
        <BsPersonPlus /> Register Supervisors
      </Link>
      <Link to="/dashboard/register-transport-employees" className="nav-link" >
        <BsPeople /> Register Transport Employees
      </Link>
      <Link to="/dashboard/taxi-drivers-data" className="nav-link">
        <BsBusFront /> Taxi Drivers Data
      </Link>
      <Link to="/dashboard/assign-supervisors" className="nav-link" >
        <BsPeopleFill /> Assign Supervisors
      </Link>
      <Link to="/dashboard/assign-employees" className="nav-link" >
        <BsBoxArrowUpRight /> Assign Transport Employees
      </Link>
      <Link to="/dashboard/activate-deactivate-accounts" className="nav-link" >
        <BsCardList /> Activate/Deactivate Accounts
      </Link>
      <Link to="/dashboard/tapela-change" className="nav-link" >
        <BsBell /> Tapela Change Notice
      </Link>
      <Link to="/dashboard/notifications" className="nav-link" >
        <BsBell /> Send Notifications
      </Link>
      <Link to="/dashboard/verify-payments" className="nav-link" >
        <BsCreditCard /> Verify Payments
      </Link>
      <Link to="/dashboard/weekly-reports" className="nav-link" >
        <BsFileText /> Review Weekly Reports
      </Link>
      <Link to="/dashboard/complaints" className="nav-link" >
        <BsChatSquareDots /> View Complaints
      </Link>
    </Nav>
  );
};

export default Sidebar;
