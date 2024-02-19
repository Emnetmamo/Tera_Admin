// src/pages/LoginPage.js

import React, { useState } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { BsPerson, BsLock } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/images/logoo.png';
import '../assets/css/Login.css';
import LogVid from "../assets/videos/AdminLogin.mp4";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      if (response.status === 200) {
        // Login successful, navigate to the dashboard
        
        notifySuccess('Login successful!');
        setTimeout(() => {
          navigate('/dashboard');
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
  };

  return (
    <>
      <ToastContainer />
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
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Admin Login</h1>
                <Form.Group controlId="username" style={{ marginBottom: "10px" }}>
                  <Form.Label>
                    <BsPerson /> Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    onChange={handleInputChange}
                    value={formData.username}
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>
                    <BsLock /> Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                    value={formData.password}
                  />
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
    </>
  );
};

export default LoginPage;
