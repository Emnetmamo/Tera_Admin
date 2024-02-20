import React, { useEffect, useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { BsPerson, BsBriefcase, BsGeoAlt, BsEnvelope, BsPhone } from 'react-icons/bs';
import profileImg from '../../assets/images/profileImg.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DashboardPage = () => {
  const { userId } = useParams(); // Use useParams to get userId
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(http://localhost:5000/api/dashboard/dashboard-data/${userId});

        if (response.status === 200) {
          setDashboardData(response.data);
        } else {
          console.error('Failed to fetch dashboard data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error.message);
      }
    };

    fetchData();
  }, [userId]); // Include userId in the dependency array to re-fetch data when userId changes

  return (
    <Row>
      <Col md={3}>
        <Image  src={http://localhost:5000/${dashboardData.profileImage } || profileImg} alt="Profile" fluid />
       
      </Col>
      <Col md={9}>
        <h2>Welcome to Admin's Dashboard</h2>
        <Row className="mb-3">
          <Col xs={1}>
            <BsPerson />
          </Col>
          <Col>
            <p>{${dashboardData.firstName} ${dashboardData.lastName}}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={1}>
            <BsBriefcase />
          </Col>
          <Col>
            <p>{dashboardData.department} department</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={1}>
            <BsGeoAlt />
          </Col>
          <Col>
            <p>{dashboardData.city}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={1}>
            <BsEnvelope />
          </Col>
          <Col>
            <p>{dashboardData.email}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={1}>
            <BsPhone />
          </Col>
          <Col>
            <p>{dashboardData.phoneNumber}</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DashboardPage;