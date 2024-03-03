import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../../assets/css/UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    fatherName: '',
    grandfatherName: '',
    email: '',
    phoneNumber: '',
    username: '',
    city: '',
    address: '',
    department: '',
  });
  const [loading, setLoading] = useState(true);
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transportEmployee/active');
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put('http://localhost:5000/api/transportEmployee/profile', userData);
      notifySuccess('Profile update successful!');
    } catch (error) {
      console.error('Error updating profile:', error);
      notifyError('Coud not update profile! please refresh your webpage!');
    }
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  return (
    <Card className="user-profile-card">
      <Card.Body>
        <Card.Title>User Profile</Card.Title>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="fatherName">
                <Form.Label>Father's Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fatherName"
                  value={userData.fatherName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="grandfatherName">
                <Form.Label>Grandfather's Name</Form.Label>
                <Form.Control
                  type="text"
                  name="grandfatherName"
                  value={userData.grandfatherName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              as="select"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
            >
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Dire Dawa">Dire Dawa</option>
              <option value="Adama">Adama</option>
              <option value="Gonder">Gonder</option>
              <option value="Hawassa">Hawassa</option>
              <option value="Harar">Harar</option>
              <option value="Mekele">Mekele</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={userData.department}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button type="button" className="update-btn" onClick={handleUpdateProfile}>
            Update Profile
          </Button>
          <Button variant="secondary" className="back-btn" onClick={() => window.history.back()}>Back</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
