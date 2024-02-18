// src/pages/Register.js

import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { BsPerson, BsEnvelope, BsLock, BsPhone, BsHouse, BsFileEarmarkText, BsImage, BsGeoAlt } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/Registration.css'; // Import the CSS file for styling

const AdminsRegistrationPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const notify = (message, type) => toast[type](message);

  const handleRegister = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      notify('Passwords do not match', 'error');
      return;
    }

    // Add logic for admin registration here
    notify('Admin registration logic goes here', 'success');
  };

  return (
    <>
      <ToastContainer />
      <Form className="admins-registration-form">
        <h2>Admins Registration</h2>
        <a href="/" className="back-to-login-link">Back to Login</a>
        <Row>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label>
                <BsPerson /> First Name
              </Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fatherName">
              <Form.Label>
                <BsPerson /> Father's Name
              </Form.Label>
              <Form.Control type="text" placeholder="Enter father's name" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="grandfatherName">
              <Form.Label>
                <BsPerson /> Grandfather's Name
              </Form.Label>
              <Form.Control type="text" placeholder="Enter grandfather's name" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>
                <BsEnvelope /> Email
              </Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="phoneNumber">
              <Form.Label>
                <BsPhone /> Phone Number
              </Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="username">
              <Form.Label>
                <BsPerson /> Username
              </Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="password">
              <Form.Label>
                <BsLock /> Password
              </Form.Label>
              <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="confirmPassword">
              <Form.Label>
                <BsLock /> Confirm Password
              </Form.Label>
              <Form.Control type="password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="city">
              <Form.Label>
                <BsGeoAlt /> City
              </Form.Label>
              <Form.Control as="select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="" disabled>Select city</option>
                <option value="City 1">Addis Ababa</option>
                <option value="City 2">Dire Dewa</option>
                <option value="City 3">Adama</option>
                <option value="City 3">Gonder</option>
                {/* Add more cities as needed */}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="address">
              <Form.Label>
                <BsHouse /> Address
              </Form.Label>
              <Form.Control type="text" placeholder="Enter address" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="department">
          <Form.Label>
            <BsFileEarmarkText /> Department
          </Form.Label>
          <Form.Control type="text" placeholder="Enter department" />
        </Form.Group>

        <Form.Group controlId="idUpload">
          <Form.Label>
            <BsImage /> Upload ID
          </Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Form.Group controlId="photoUpload">
          <Form.Label>
            <BsImage /> Upload Photo
          </Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Button type="button" className="register-button" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </>
  );
};

export default AdminsRegistrationPage;
