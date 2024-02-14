// src/components/Header.js

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { BsFillPersonFill, BsGlobe, BsGear, BsQuestionSquare, BsBell, BsBoxArrowRight } from 'react-icons/bs';
import demoLogo from "../assets/images/logo2.jpg";

import '../assets/css/Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <Navbar className="header" variant="light">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={demoLogo}  // replace with your logo path
          width="50"
          height="50"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link href="#profile" className="notification-icon"><BsFillPersonFill /> Profile</Nav.Link>
          <Nav.Link href="#language" className="notification-icon"><BsGlobe /> Language</Nav.Link>
          <Nav.Link href="#settings" className="notification-icon"><BsGear /> Settings</Nav.Link>
          <Nav.Link href="#help"className="notification-icon"><BsQuestionSquare /> Help</Nav.Link>
          <Nav.Link className="notification-icon"><BsBell /> Notifications </Nav.Link>
          <Nav.Link className="notification-icon"><BsBoxArrowRight /> Logout </Nav.Link>
        </Nav>
    
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
