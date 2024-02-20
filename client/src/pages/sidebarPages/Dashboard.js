// src/pages/sidebarpages/DashboardPage.js

import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { BsPerson, BsBriefcase, BsGeoAlt, BsEnvelope, BsPhone } from 'react-icons/bs';
import profileImg from '../../assets/images/profileImg.jpg';

const DashboardPage = () => {
  
  return (
 
        <Row>
          <Col md={3}>
            <Image src={profileImg} alt="Profile"  fluid />
          </Col>
          <Col md={9}>
            <h2>Welcome to Admin's Dashboard</h2>
            <Row className="mb-3">
              <Col xs={1}>
                <BsPerson />
              </Col>
              <Col>
                <p>Abebe Tessema</p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={1}>
                <BsBriefcase />
              </Col>
              <Col>
                <p>Transport Routing Department</p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={1}>
                <BsGeoAlt />
              </Col>
              <Col>
                <p>Addis Ababa, Ethiopia</p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={1}>
                <BsEnvelope />
              </Col>
              <Col>
                <p>abebe@example.com</p>
              </Col>
            </Row>
            <Row>
              <Col xs={1}>
                <BsPhone />
              </Col>
              <Col>
                <p>+123 456 7890</p>
              </Col>
            </Row>
          </Col>
        </Row>
  );
};

export default DashboardPage;
