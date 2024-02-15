// src/pages/RegisterSupervisors.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { BsPerson, BsEnvelope, BsGenderAmbiguous, BsCalendar, BsPhone, BsHouse, BsGeoAlt } from 'react-icons/bs';
import '../../assets/css/RegisterSupervisors.css'; // Import the CSS file for styling

const RegisterSupervisorsPage = () => {
  // Sample data for city administration districts and routes
  const sampleData = {
    "District1": ["Route1", "Route2", "Route3"],
    "District2": ["RouteA", "RouteB", "RouteC"],
    // Add more districts and routes as needed
  };

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("Choose District");
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("Choose Route");

  useEffect(() => {
    // Update routes based on the selected district
    setRoutes(sampleData[selectedDistrict] || []);
  }, [selectedDistrict]);

  useEffect(() => {
    // Update the list of districts
    setDistricts(["Choose District", ...Object.keys(sampleData)]);
  }, []);

  const handleRegister = () => {
    // Add logic for supervisor registration here
    console.log('Registration logic goes here');
  };

  return (
    <Form className="register-form">
      <h2>Supervisor Registration</h2>
      <p>Username and Password will be automatically generated and sent via the entered Email!</p>
      <Form.Group controlId="fullName">
        <Form.Label>
          <BsPerson /> Full Name
        </Form.Label>
        <Form.Control type="text" placeholder="Enter full name" />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group controlId="email">
            <Form.Label>
              <BsEnvelope /> Email Address
            </Form.Label>
            <Form.Control type="email" placeholder="Enter email address" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="sex">
            <Form.Label>
              <BsGenderAmbiguous /> Sex
            </Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
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
            <Form.Control type="date" />
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

      <Form.Group controlId="address">
        <Form.Label>
          <BsHouse /> Address
        </Form.Label>
        <Form.Control type="text" placeholder="Enter address" />
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

      <Button type="button" className="register-button" onClick={handleRegister}>
        Register
      </Button>
    </Form>
  );
};

export default RegisterSupervisorsPage;
