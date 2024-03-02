// src/components/Sidebar.js

import React, { useState, useEffect } from 'react';
import { Nav, Image } from 'react-bootstrap';
import { BsHouseDoorFill, BsPersonPlus, BsBusFront, BsCardList, BsBoxArrowUpRight, BsBell, BsCreditCard, BsFileText, BsChatSquareDots } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Sidebar.css';
import profileImg from "../assets/images/profileImg.jpg"; // user's photo

const Sidebar = () => {
  const { userId } = useParams();

  const [userInfo, setUserInfo] = useState({});
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sidebar/user-details/${userId}`);

        if (response.status === 200) {
          setUserInfo(response.data);
        } else {
          console.error('Failed to fetch user details:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchUserDetails();
  }, [userId]); // Include userId in the dependency array to re-fetch data when userId changes

  const baseRoute = `/dashboard/${userId}`; // Constant base route

  const handleItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <Nav className="flex-column sidebar">
      <div className="user-info">
        {/* <Image className="user-photo" src={userInfo.photoUpload || profileImg} roundedCircle width="100" height="100" /> */}
        <Image className="user-photo" src={`http://localhost:5000/${userInfo.photoUpload}` || profileImg} roundedCircle width="100" height="100" alt="Admin Photo"/>


        <div className="user-details">
          <p className="user-name">{`${userInfo.firstName} ${userInfo.fatherName}`}</p>
        </div>
      </div>
      <Link to={`${baseRoute}`} className={`nav-link ${selectedMenuItem === 'dashboard' ? 'active' : ''}`} onClick={() => handleItemClick('dashboard')}>
        <BsHouseDoorFill /> Dashboard
      </Link>
      <Link to={`${baseRoute}/register-transport-employees`} className={`nav-link ${selectedMenuItem === 'register-transport-employees' ? 'active' : ''}`} onClick={() => handleItemClick('register-transport-employees')}>
        <BsPersonPlus /> Register Transport Employees
      </Link>
      <Link to={`${baseRoute}/taxi-drivers-data`} className={`nav-link ${selectedMenuItem === 'taxi-drivers-data' ? 'active' : ''}`} onClick={() => handleItemClick('taxi-drivers-data')}>
        <BsBusFront /> Taxi Drivers Data
      </Link>
      <Link to={`${baseRoute}/assign-employees`} className={`nav-link ${selectedMenuItem === 'assign-employees' ? 'active' : ''}`} onClick={() => handleItemClick('assign-employees')}>
        <BsBoxArrowUpRight /> Assign Transport Employees
      </Link>
      <Link to={`${baseRoute}/activate-deactivate-accounts`} className={`nav-link ${selectedMenuItem === 'activate-deactivate-accounts' ? 'active' : ''}`} onClick={() => handleItemClick('activate-deactivate-accounts')}>
        <BsCardList /> Activate/Deactivate Accounts
      </Link>
      <Link to={`${baseRoute}/tapela-change`} className={`nav-link ${selectedMenuItem === 'tapela-change' ? 'active' : ''}`} onClick={() => handleItemClick('tapela-change')}>
        <BsBell /> Tapela Change Notice
      </Link>
      <Link to={`${baseRoute}/notifications`} className={`nav-link ${selectedMenuItem === 'notifications' ? 'active' : ''}`} onClick={() => handleItemClick('notifications')}>
        <BsBell /> Send Notifications
      </Link>
      <Link to={`${baseRoute}/verify-payments`} className={`nav-link ${selectedMenuItem === 'verify-payments' ? 'active' : ''}`} onClick={() => handleItemClick('verify-payments')}>
        <BsCreditCard /> Verify Payments
      </Link>
      <Link to={`${baseRoute}/weekly-reports`} className={`nav-link ${selectedMenuItem === 'weekly-reports' ? 'active' : ''}`} onClick={() => handleItemClick('weekly-reports')}>
        <BsFileText /> Review Weekly Reports
      </Link>
      <Link to={`${baseRoute}/complaints`} className={`nav-link ${selectedMenuItem === 'complaints' ? 'active' : ''}`} onClick={() => handleItemClick('complaints')}>
        <BsChatSquareDots /> View Complaints
      </Link>
    </Nav>
  );
};

export default Sidebar;
