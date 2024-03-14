// src/pages/DashboardPage.js

import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BsPerson, BsBriefcase, BsGeoAlt, BsEnvelope, BsPhone, BsPersonCircle } from 'react-icons/bs';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../assets/css/Dashboard.css'; 

const DashboardPage = () => {
  const { userId } = useParams();
  const [dashboardData, setDashboardData] = useState({});


  // fetch admin's data logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/dashboard/dashboard-data/${userId}`);

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
  }, [userId]);

  console.log(dashboardData);
  
  return (
    <div className="container">
      <h2 className='welcomeText'>Welcome to Admin's Dashboard</h2>
      {/* Grid for user info */}
      <Row>
        <Col>
          <div className="dashboard-cards">
            <BsPerson className="dashboard-icon" />
            <p className="dashboard-text">{`${dashboardData.firstName} ${dashboardData.lastName}`}</p>
          </div>
        </Col>
        <Col>
          <div className="dashboard-cards">
            <BsEnvelope className="dashboard-icon" />
            <p className="dashboard-text">{dashboardData.email}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="dashboard-cards">
            <BsPersonCircle className="dashboard-icon" />
            <p className="dashboard-text">username: {dashboardData.username}</p>
          </div>
        </Col>
        <Col>
          <div className="dashboard-cards">
            <BsBriefcase className="dashboard-icon" />
            <p className="dashboard-text">{dashboardData.department} department</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="dashboard-cards">
            <BsPhone className="dashboard-icon" />
            <p className="dashboard-text">{dashboardData.phoneNumber}</p>
          </div>
        </Col>
        <Col>
          <div className="dashboard-cards">
            <BsGeoAlt className="dashboard-icon" />
            <p className="dashboard-text">{dashboardData.city}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
