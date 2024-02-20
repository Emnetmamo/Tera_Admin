<<<<<<< HEAD
import React, { useState } from 'react';
=======
// src/components/LoginPage.js

import React from 'react';
>>>>>>> 904cbe449a1c86518a9e9b6734eff50270b42c95
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { BsPerson, BsLock } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logoo.png';
import '../assets/css/Login.css';
import LogVid from "../assets/videos/AdminLogin.mp4";

const LoginPage = () => {
  const navigate = useNavigate();

<<<<<<< HEAD
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      if (response.status === 200) {
        // Login successful, extract userId from the response
        const { userId } = response.data;

        notifySuccess('Login successful!');

        // Redirect to the user-specific dashboard based on userId
     
        setTimeout(() => {
          navigate(`/dashboard/${userId}`);
        }, 2000); 
  
      } else {
        console.error('Login failed:', response.data.message);
        notifyError('Incorrect username or password');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      notifyError('An error occurred during login');
    }
  };

  const handleRegister = () => {
    navigate('/register');
=======
  const handleLogin = () => {
    // Perform your login logic here
    // Navigate to the dashboard after successful login
    navigate('/dashboard');
>>>>>>> 904cbe449a1c86518a9e9b6734eff50270b42c95
  };

  return (
    <Card className="login-card">
      <Row className="card-content">
        <Col xs={6} className="login-video-section">
          <video autoPlay muted loop className="login-video">
            <source src={LogVid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Col>
        <Col xs={6} className="login-form-section">
          <Card.Body className="modern-form">
            <Card.Img src={logo} alt="Logo" className="login-logo" />
            <Form className="login-form">
              <h1 style={{textAlign: "center", marginBottom: "30px"}}>Admin Login</h1>
              <Form.Group controlId="username" style={{marginBottom: "10px"}}>
                <Form.Label>
                  <BsPerson /> Username
                </Form.Label>
                <Form.Control type="text" placeholder="Enter your username" />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>
                  <BsLock /> Password
                </Form.Label>
                <Form.Control type="password" placeholder="Enter your password" />
              </Form.Group>

              <Button type="button" className="login-button" onClick={handleLogin}>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};


export default LoginPage;
