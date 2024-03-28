import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../../assets/css/UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams(); // Get userId from URL

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
    photoupload: '',
  });
  const [loading, setLoading] = useState(true);
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const updatedData = () => {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/update/adminData/${userId}`);
        if (response.status ===200){
          setUserData(response.data);
          setLoading(false);
        } else {
          console.error('Failed to fetch user data:', response.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); // Add userId to dependency array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = updatedData(); // Update this line to use the function
      const response = await axios.put(`http://localhost:5000/api/admin/update/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.status === 200) {
        notifySuccess('Profile updated successfully!');
        setUserData(response.data);
      } else {
        notifyError('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      notifyError('Could not update profile! Please refresh your webpage.');
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
          <Form.Group controlId="photoUpload">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type="file"
              name="photoUpload"
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
