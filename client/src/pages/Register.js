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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [id]: files });
    } else {
      setFormData({ ...formData, [id]: value });

      // Clear errors on valid input
      if (errors[id]) {
        const updatedErrors = { ...errors };
        delete updatedErrors[id];
        setErrors(updatedErrors);
      }
    }
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

  const validatePassword = (password) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    const isValid = password.length >= minLength && hasLetter && hasDigit && hasSpecialChar;

    return {
      isValid,
      errors: {
        minLength: password.length >= minLength,
        hasLetter,
        hasDigit,
        hasSpecialChar
      }
    };
  };

  const handleRegister = async () => {
    const passwordValidation = validatePassword(formData.password);

    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, password: 'Passwords do not match', confirmPassword: 'Passwords do not match' });
      return;
    } else if (!passwordValidation.isValid) {
      setErrors({ ...errors, password: 'Password does not meet the criteria' });
      return;
    }

    // Check for empty required fields
    const newErrors = {};
    for (const key in formData) {
      if (formData[key] === '' && key !== 'photoUpload') {
        newErrors[key] = `${key} is required`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Check if username or email already exists
    const usernameExists = await checkExistingUser('username', formData.username);
    const emailExists = await checkExistingUser('email', formData.email);

    if (usernameExists) {
      setLoading(false);
      setErrors({ ...errors, username: 'Username already exists' });
      return;
    }

    if (emailExists) {
      setLoading(false);
      setErrors({ ...errors, email: 'Email already exists' });
      return;
    }

    // Continue with registration if username and email are unique
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'photoUpload' || key === 'idUpload') {
        const files = formData[key];
        for (let i = 0; i < files.length; i++) {
          formDataToSend.append(key, files[i]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
              <Form.Control 
                type="text" 
                placeholder="Enter first name" 
                onChange={handleInputChange} 
                className={errors.firstName ? 'is-invalid' : ''}
                required 
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fatherName">
              <Form.Label>
                <BsPerson /> Father's Name
              </Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter father's name" 
                onChange={handleInputChange} 
                className={errors.fatherName ? 'is-invalid' : ''}
                required 
              />
              <Form.Control.Feedback type="invalid">{errors.fatherName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="grandfatherName">
              <Form.Label>
                <BsPerson /> Grandfather's Name
              </Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter grandfather's name" 
                onChange={handleInputChange} 
                className={errors.grandfatherName ? 'is-invalid' : ''}
                required 
              />
              <Form.Control.Feedback type="invalid">{errors.grandfatherName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>
                <BsEnvelope /> Email
              </Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                onChange={handleInputChange} 
                className={errors.email ? 'is-invalid' : ''}
                required 
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="phoneNumber">
              <Form.Label>
                <BsPhone /> Phone Number
              </Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="Enter phone number" 
                onChange={handleInputChange} 
                className={errors.phoneNumber ? 'is-invalid' : ''}
                required 
              />
              <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="username">
              <Form.Label>
                <BsPerson /> Username
              </Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter username" 
                onChange={handleInputChange} 
                className={errors.username ? 'is-invalid' : ''}
                required 
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="password">
              <Form.Label>
                <BsLock /> Password
              </Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter password" 
                onChange={handleInputChange} 
                className={errors.password ? 'is-invalid' : ''}
                required 
              />
              <Form.Control.Feedback type="invalid">
                Password must be at least 8 characters long and include a letter, a number, and a special character.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="confirmPassword">
              <Form.Label>
                <BsLock /> Confirm Password
              </Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Confirm password" 
                onChange={handleInputChange} 
                className={errors.confirmPassword ? 'is-invalid' : ''}
                required 
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="city">
              <Form.Label>
                <BsGeoAlt /> City
              </Form.Label>
              <Form.Control 
                as="select" 
                value={formData.city} 
                onChange={handleInputChange} 
                className={errors.city ? 'is-invalid' : ''}
                required 
              >
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
              <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="address">
              <Form.Label>
                <BsHouse /> Address
              </Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter address" 
                onChange={handleInputChange} 
                className={errors.address ? 'is-invalid' : ''}
                required 
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="department">
          <Form.Label>
            <BsFileEarmarkText /> Department
          </Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter department" 
            onChange={handleInputChange} 
            className={errors.department ? 'is-invalid' : ''}
            required 
          />
          <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="idUpload">
          <Form.Label>
            <BsImage /> Upload ID
          </Form.Label>
          <Form.Control 
            type="file" 
            name='idUpload' 
            onChange={handleInputChange} 
            className={errors.idUpload ? 'is-invalid' : ''}
            required 
          />
          <Form.Control.Feedback type="invalid">{errors.idUpload}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="photoUpload">
          <Form.Label>
            <BsImage /> Upload Photo
          </Form.Label>
          <Form.Control 
            type="file" 
            name='photoUpload' 
            onChange={handleInputChange} 
            className={errors.photoUpload ? 'is-invalid' : ''}
            required 
          />
          <Form.Control.Feedback type="invalid">{errors.photoUpload}</Form.Control.Feedback>
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
