// src/components/LoginPage.js

import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { BsPerson, BsLock } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import logo from '../assets/images/logo2.jpg';
import '../assets/css/Login.css'; // Import the CSS file for styling

const LoginPage = () => {
  const navigate = useNavigate();  // Initialize useNavigate

  const handleLogin = () => {
    // Perform your login logic here

    // Navigate to the dashboard after successful login
    navigate('/dashboard');
  };

  return (
    <Card className="login-card">
      <Card.Body>
        <Card.Img src={logo} alt="Logo" className="login-logo" />
        <Form>
          <Form.Group controlId="username">
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

          <Button variant="primary" type="button" className="login-button" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginPage;
