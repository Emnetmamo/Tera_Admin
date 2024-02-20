import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { BsPerson, BsEnvelope, BsLock, BsPhone, BsHouse, BsFileEarmarkText, BsImage, BsGeoAlt } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/Registration.css';
import { useNavigate } from 'react-router-dom';

const AdminsRegistrationPage = () => {
  const notify = (message, type) => toast[type](message);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    fatherName: '',
    grandfatherName: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
    city: '',
    address: '',
    department: '',
    idUpload: '',
    photoUpload: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  
  const checkExistingUser = async (field, value) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/check-existing?field=${field}&value=${value}`);
      return response.data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleRegister = async () => {
    try {
      // Frontend password validation
      if (formData.password !== formData.confirmPassword) {
        notify("Passwords don't match", 'error');
        return;
      }

      // Check for empty required fields
      for (const key in formData) {
        if (formData[key] === '' && key !== 'photoUpload' ) {
          notify(`Fill in the ${key} field`, 'error');
          return;
        }
      }

      setLoading(true);

      // Check if username or email already exists
      const usernameExists = await checkExistingUser('username', formData.username);
      const emailExists = await checkExistingUser('email', formData.email);

      if (usernameExists) {
        setLoading(false);
        notify('Username already exists', 'error');
        return;
      }

      if (emailExists) {
        setLoading(false);
        notify('Email already exists', 'error');
        return;
      }

      // Continue with registration if username and email are unique
      const response = await axios.post('http://localhost:5000/api/admin/register', formData);

      setLoading(false);

      notify(response.data.message, 'success');

      setTimeout(() => {
        navigate('/');
      }, 2000); 

    } catch (error) {
      console.error(error);
      setLoading(false);
      notify('Registration failed', 'error');
    }
  };

  return (
    <>
      <ToastContainer />
      <Form className="admins-registration-form">
        <h2>Admins Registration</h2>
        <a href="/" className="back-to-login-link">
          Back to Login
        </a>
        <Row>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label>
                <BsPerson /> First Name
              </Form.Label>
              <Form.Control type="text" placeholder="Enter first name" onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fatherName">
              <Form.Label>
                <BsPerson /> Father's Name
              </Form.Label>
              <Form.Control type="text" placeholder="Enter father's name" onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="grandfatherName">
              <Form.Label>
                <BsPerson /> Grandfather's Name
              </Form.Label>
              <Form.Control type="text" placeholder="Enter grandfather's name" onChange={handleInputChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>
                <BsEnvelope /> Email
              </Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="phoneNumber">
              <Form.Label>
                <BsPhone /> Phone Number
              </Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" onChange={handleInputChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="username">
              <Form.Label>
                <BsPerson /> Username
              </Form.Label>
              <Form.Control type="text" placeholder="Enter username" onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="password">
              <Form.Label>
                <BsLock /> Password
              </Form.Label>
              <Form.Control type="password" placeholder="Enter password" onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="confirmPassword">
              <Form.Label>
                <BsLock /> Confirm Password
              </Form.Label>
              <Form.Control type="password" placeholder="Confirm password" onChange={handleInputChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="city">
              <Form.Label>
                <BsGeoAlt /> City
              </Form.Label>
              <Form.Control as="select" value={formData.city} onChange={handleInputChange} required>
                <option value="" disabled>
                  Select a city
                </option>
                <option value="Addis Ababa">Addis Ababa</option>
                <option value="Dire Dawa">Dire Dawa</option>
                <option value="Adama">Adama</option>
                <option value="Gonder">Gonder</option>
                <option value="Hawassa">Hawassa</option>
                <option value="Harar">Harar</option>
                <option value="Mekele">Mekele</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="address">
              <Form.Label>
                <BsHouse /> Address
              </Form.Label>
              <Form.Control type="text" placeholder="Enter address" onChange={handleInputChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="department">
          <Form.Label>
            <BsFileEarmarkText /> Department
          </Form.Label>
          <Form.Control type="text" placeholder="Enter department" onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="idUpload">
          <Form.Label>
            <BsImage /> Upload ID
          </Form.Label>
          <Form.Control type="file" onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="photoUpload">
          <Form.Label>
            <BsImage /> Upload Photo
          </Form.Label>
          <Form.Control type="file" onChange={handleInputChange} required />
        </Form.Group>

        <Button type="button" className="register-button" onClick={handleRegister} disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="mr-2" />
              Registering...
            </>
          ) : (
            'Register'
          )}
        </Button>
      </Form>
    </>
  );
};

export default AdminsRegistrationPage;