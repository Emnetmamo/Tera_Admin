// src/components/Header.js

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { BsFillPersonFill, BsGlobe, BsGear, BsQuestionSquare, BsBell, BsBoxArrowRight } from 'react-icons/bs';
import demoLogo from "../assets/images/logoo.png";
import { useNavigate,useParams } from 'react-router-dom'; 

import '../assets/css/Header.css'; 

const Header = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
 
    navigate('/'); // Redirect to the Login page
  };

  return (
    <Navbar className="header" variant="light">
     <Navbar.Brand href={`/dashboard/${userId}`}>
        <img
          alt=""
          src={demoLogo}  
          width="90"
          height="90"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link href="#profile" className="notification-icon"><BsFillPersonFill /> Profile</Nav.Link>
          <Nav.Link href="#language" className="notification-icon"><BsGlobe /> Language</Nav.Link>
          <Nav.Link href="#settings" className="notification-icon"><BsGear /> Settings</Nav.Link>
          <Nav.Link href="#help" className="notification-icon"><BsQuestionSquare /> Help</Nav.Link>
          <Nav.Link className="notification-icon"><BsBell /> Notifications </Nav.Link>
          <Nav.Link onClick={handleLogout} className="notification-icon"><BsBoxArrowRight /> Logout </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
