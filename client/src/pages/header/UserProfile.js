import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Form, Button, Row, Col, Spinner, Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BsPerson, BsEnvelope, BsPhone, BsFillHouseDoorFill, BsBuilding, BsUpload } from 'react-icons/bs';
import '../../assets/css/UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams();
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
    photoUpload: null,
  });
  const [loading, setLoading] = useState(true);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData((prevState) => ({
      ...prevState,
      photoUpload: file,
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/update/adminData/${userId}`);
        if (response.status === 200) {
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
  }, [userId]);

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await axios.put(`http://localhost:5000/api/admin/update/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        notifySuccess('Profile updated successfully!');
        setUserData(response.data);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        notifyError('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      notifyError('Could not update profile! Please refresh your webpage.');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="mt-3">
      <ToastContainer />
      <h1 className="text-center mb-4">Profile</h1>
      <Form>
        <Row>
          <Col md={4}>
            <Form.Group controlId="firstName">
              <Form.Label className='mb-2 mt-2'>
                <BsPerson /> First Name
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={userData.firstName}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="fatherName">
              <Form.Label className='mb-2 mt-2'>
                <BsPerson /> Father's Name
              </Form.Label>
              <Form.Control
                type="text"
                name="fatherName"
                value={userData.fatherName}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="grandfatherName">
              <Form.Label className='mb-2 mt-2'>
                <BsPerson /> Grandfather's Name
              </Form.Label>
              <Form.Control
                type="text"
                name="grandfatherName"
                value={userData.grandfatherName}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="email">
          <Form.Label className='mb-2 mt-2'>
            <BsEnvelope /> Email
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label className='mb-2 mt-2'>
            <BsPhone /> Phone Number
          </Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label className='mb-2 mt-2'>
            <BsPerson /> Username
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label className='mb-2 mt-2'>
            <BsFillHouseDoorFill /> City
          </Form.Label>
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
          <Form.Label className='mb-2 mt-2'>
            <BsBuilding /> Address
          </Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="department">
          <Form.Label className='mb-2 mt-2'>
            <BsBuilding /> Department
          </Form.Label>
          <Form.Control
            type="text"
            name="department"
            value={userData.department}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="photoUpload">
          <Form.Label className='mb-2 mt-2'>
            <BsUpload /> Photo
          </Form.Label>
          <Form.Control
            type="file"
            name="photoUpload"
            onChange={handleFileChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-2">
          <Button type="button" className="update-profile-btn" onClick={handleUpdateProfile}>
            Update Profile
          </Button>
          <Button variant="secondary" className="back-btn" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UserProfile;
