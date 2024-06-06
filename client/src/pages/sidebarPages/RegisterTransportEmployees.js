// src/pages/sidebarPages/RegisterTransportEmployees.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col,Spinner } from 'react-bootstrap';
import { BsPerson, BsEnvelope, BsGenderAmbiguous, BsFillPersonFill, BsPhone, BsHouse, BsGeoAlt } from 'react-icons/bs';
import '../../assets/css/RegisterTransportEmployees.css';
import districtData from '../../data/data';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterTransportEmployeesPage = () => {
  
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("Choose District");
  const [routes, setRoutes] = useState([]);
  const [selectedTerminal, setselectedTerminal] = useState("Choose Termianl");

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    sex: '',
    phoneNumber: '',
    employeeId: '',
    address: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);

   // Use useEffect to set the initial state from the imported JSON data
   useEffect(() => {
    const districtNames = districtData.District_Datas.map(district => district.District.name.en);
    setDistricts(["Choose District", ...districtNames]);
  }, []);

 // Update routes based on the selected district
 useEffect(() => {
  const selectedDistrictData = districtData.District_Datas.find(district => district.District.name.en === selectedDistrict);
  if (selectedDistrictData) {
    const terminalNames = selectedDistrictData.District.terminals.map(terminal => terminal.name.en);
    setRoutes(terminalNames || []);
  }
}, [selectedDistrict]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async () => {
    
    setIsRegistering(true);

    const transportEmployeeData = {
      fullName: formData.fullName,
      email: formData.email,
      sex: formData.sex || '',
      phoneNumber: formData.phoneNumber,
      employeeId: formData.employeeId,
      address: formData.address,
      cityDistrict: selectedDistrict,
      Terminal: selectedTerminal,
    };
  
    try {
      // Send a POST request to the server to register the transport Employee
      await axios.post('http://localhost:5000/api/transportEmployee/register', transportEmployeeData);
      toast.success('Transport Employee registered successfully!', { autoClose: 3000 });
      // Clear the form data after successful registration
      setFormData({
        fullName: '',
        email: '',
        sex: '',
        phoneNumber: '',
        employeeId: '',
        address: '',
      });
      setSelectedDistrict('Choose District');
      setselectedTerminal('Choose Terminal');

  } catch (error) {
    toast.error('Failed to register transport Employee. Please try again.', { autoClose: 3000 });
    console.error('Error registering transport Employee:', error.message);
  } finally {
    setIsRegistering(false);
  }
};


  return (
    <>
    <Form className="register-form">
      <h2>Transport Employee Registration</h2>
      <p>A username and password will be automatically generated and sent via the entered Email!</p>
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
            <Form.Group controlId="phoneNumber">
              <Form.Label>
                <BsPhone /> Phone Number
              </Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" onChange={handleInputChange} value={formData.phoneNumber} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="employeeId">
              <Form.Label>
                <BsFillPersonFill /> Employee Id
              </Form.Label>
              <Form.Control type="text" placeholder="Enter Employees identification"  onChange={handleInputChange} value={formData.employeeId} />
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

        <Form.Group controlId="Terminal">
          <Form.Label>
            <BsGeoAlt /> Terminal
          </Form.Label>
          <Form.Control
            as="select"
            value={selectedTerminal}
            onChange={(e) => setselectedTerminal(e.target.value)}
          >
            <option >Choose Terminal...</option>
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

export default RegisterTransportEmployeesPage;
