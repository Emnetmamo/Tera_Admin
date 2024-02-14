// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './assets/css/Dashboard.css';
import LoginPage from './pages/Login';
import DashboardPage from './pages/sidebarPages/Dashboard';
import RegisterSupervisorsPage from './pages/sidebarPages/RegisterSupervisors';
import RegisterTransportEmployeesPage from './pages/sidebarPages/RegisterTransportEmployees';
import NewDriversDataPage from './pages/sidebarPages/NewDriversData';
import AssignSupervisorsPage from './pages/sidebarPages/AssignSupervisors';
import AssignEmployeesPage from './pages/sidebarPages/AssignEmployees';
import ActivateDeactivateAccountsPage from './pages/sidebarPages/ActivateDeactivateAccounts';
import TapelaChangePage from './pages/sidebarPages/TapelaChange';
import NotificationsPage from './pages/sidebarPages/Notifications';
import VerifyPaymentsPage from './pages/sidebarPages/VerifyPayments';
import WeeklyReportsPage from './pages/sidebarPages/WeeklyReports';
import ComplaintsPage from './pages/sidebarPages/Complaints';

const CardWrapper = ({ element }) => (
  <Card className="dashboard-card">
    <Card.Body>{element}</Card.Body>
  </Card>
);

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route
            path="/dashboard/*"
            element={
              <>
                <Header />
                <Container fluid>
                  <Row>
                    <Col sm={3}>
                      <Sidebar />
                    </Col>

                    <Col sm={9} className="main-content">
                      <Routes>
                        <Route index element={<CardWrapper element={<DashboardPage />} />} />
                        <Route path="/register-supervisors" element={<CardWrapper element={<RegisterSupervisorsPage />} />} />
                        <Route path="/register-transport-employees" element={<CardWrapper element={<RegisterTransportEmployeesPage />} />} />
                        <Route path="/new-drivers-data" element={<CardWrapper element={<NewDriversDataPage />} />} />
                        <Route path="/assign-supervisors" element={<CardWrapper element={<AssignSupervisorsPage />} />} />
                        <Route path="/assign-employees" element={<CardWrapper element={<AssignEmployeesPage />} />} />
                        <Route path="/activate-deactivate-accounts" element={<CardWrapper element={<ActivateDeactivateAccountsPage />} />} />
                        <Route path="/tapela-change" element={<CardWrapper element={<TapelaChangePage />} />} />
                        <Route path="/notifications" element={<CardWrapper element={<NotificationsPage />} />} />
                        <Route path="/verify-payments" element={<CardWrapper element={<VerifyPaymentsPage />} />} />
                        <Route path="/weekly-reports" element={<CardWrapper element={<WeeklyReportsPage />} />} />
                        <Route path="/complaints" element={<CardWrapper element={<ComplaintsPage />} />} />
                      </Routes>
                    </Col>
                  </Row>
                </Container>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
