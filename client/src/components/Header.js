import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BsFillPersonFill, BsGlobe, BsGear, BsQuestionSquare, BsBell, BsBoxArrowRight } from 'react-icons/bs';
import demoLogo from "../assets/images/logoo.png";
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios'; // Import axios
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleLogout = () => {
    navigate('/'); // Redirect to the Login page
  };

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`); // Redirect to the UserProfile page
  };

  return (
    <Navbar className="header" variant="light">
     <Navbar.Brand href="/">
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
          <Nav.Link onClick={handleProfileClick} className="notification-icon"><BsFillPersonFill /> Profile</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={<><BsGlobe /> Language</>} id="language-dropdown" >
            <NavDropdown.Item>Amharic</NavDropdown.Item>
            <NavDropdown.Item>English</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link onClick={handleLogout} className="notification-icon"><BsBoxArrowRight /> Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
