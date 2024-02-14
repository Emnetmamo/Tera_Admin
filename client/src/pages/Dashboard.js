// src/components/Dashboard.js

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MainContent from '../components/MainContent';

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState('dashboard');

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <div>
      <Header />

      <Container fluid>
        <Row>
          <Col sm={3}>
            <Sidebar onPageChange={handlePageChange} />
          </Col>

          <MainContent selectedPage={selectedPage} />
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
