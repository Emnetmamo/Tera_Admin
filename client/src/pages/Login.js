// src/components/LoginPage.js

import React from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { BsPerson, BsLock } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logoo.png';
import '../assets/css/Login.css';
import LogVid from "../assets/videos/AdminLogin.mp4";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform your login logic here
    // Navigate to the dashboard after successful login
    navigate('/dashboard');
  };

  const handleRegister = () => {
    // Navigate to the registration page
    navigate('/register');
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

              <p style={{ marginTop: '15px', textAlign: 'center' }}>
                Don't have an account? <span className="register-link" onClick={handleRegister}>Register</span>
              </p>
            </Form>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default LoginPage;

