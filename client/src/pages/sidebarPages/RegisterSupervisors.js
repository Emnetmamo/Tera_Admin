// src/pages/sidebarPages/RegisterSupervisors.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { BsPerson, BsEnvelope, BsGenderAmbiguous, BsCalendar, BsPhone, BsHouse, BsGeoAlt } from 'react-icons/bs';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/RegisterSupervisors.css';

const RegisterSupervisorsPage = () => {
  const sampleData = {
    "District1": ["Route1", "Route2", "Route3"],
    "District2": ["RouteA", "RouteB", "RouteC"],
  };

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("Choose District");
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("Choose Route");
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    sex: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    setRoutes(sampleData[selectedDistrict] || []);
  }, [selectedDistrict]);

  useEffect(() => {
    setDistricts(["Choose District", ...Object.keys(sampleData)]);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async () => {
    
      setIsRegistering(true);

      const supervisorData = {
        fullName: formData.fullName,
        email: formData.email,
        sex: formData.sex || '',
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        cityDistrict: selectedDistrict,
        assignedRoute: selectedRoute,
      };
    
      try {
        // Send a POST request to the server to register the supervisor
        await axios.post('http://localhost:5000/api/supervisor/register', supervisorData);
        toast.success('Supervisor registered successfully!', { autoClose: 3000 });
        // Clear the form data after successful registration
        setFormData({
          fullName: '',
          email: '',
          sex: '',
          dateOfBirth: '',
          phoneNumber: '',
          address: '',
        });
        setSelectedDistrict('Choose District');
        setSelectedRoute('Choose Route');

    } catch (error) {
      toast.error('Failed to register supervisor. Please try again.', { autoClose: 5000 });
      console.error('Error registering supervisor:', error.message);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      <Form className="register-form">
        <h2>Supervisor Registration</h2>
        <p>Username and Password will be automatically generated and sent via the entered Email!</p>

        <Form.Group controlId="fullName">
          <Form.Label>
            <BsPerson /> Full Name
          </Form.Label>
          <Form.Control type="text" placeholder="Enter full name" onChange={handleInputChange} value={formData.fullName} />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>
                <BsEnvelope /> Email Address
              </Form.Label>
              <Form.Control type="email" placeholder="Enter email address" onChange={handleInputChange} value={formData.email} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="sex">
              <Form.Label>
                <BsGenderAmbiguous /> Sex
              </Form.Label>
              <Form.Control as="select" defaultValue="Choose..." onChange={handleInputChange} value={formData.sex}>
                <option disabled>Choose...</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>
                <BsCalendar /> Date of Birth
              </Form.Label>
              <Form.Control type="date" onChange={handleInputChange} value={formData.dateOfBirth} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="phoneNumber">
              <Form.Label>
                <BsPhone /> Phone Number
              </Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" onChange={handleInputChange} value={formData.phoneNumber} />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="address">
          <Form.Label>
            <BsHouse /> Address
          </Form.Label>
          <Form.Control type="text" placeholder="Enter address" onChange={handleInputChange} value={formData.address} />
        </Form.Group>

        <Form.Group controlId="cityDistrict">
          <Form.Label>
            <BsGeoAlt /> City Administration District
          </Form.Label>
          <Form.Control
            as="select"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            {districts.map((district, index) => (
              <option key={index}>{district}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="assignedRoute">
          <Form.Label>
            <BsGeoAlt /> Assigned Route
          </Form.Label>
          <Form.Control
            as="select"
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
          >
            <option disabled>Choose...</option>
            {routes.map((route, index) => (
              <option key={index}>{route}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type="button" className="register-button" onClick={handleRegister} disabled={isRegistering}>
          {isRegistering ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              Registering...
            </>
          ) : (
            'Register'
          )}
        </Button>
      </Form>

      <ToastContainer />
    </>
  );
};

export default RegisterSupervisorsPage;
