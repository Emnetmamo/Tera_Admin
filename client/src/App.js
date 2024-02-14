// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import RegisterSupervisorsPage from './pages/RegisterSupervisors';
import RegisterTransportEmployeesPage from './pages/RegisterTransportEmployees';
import NewDriversDataPage from './pages/NewDriversData';
import AssignSupervisorsPage from './pages/AssignSupervisors';
import AssignEmployeesPage from './pages/AssignEmployees';
import ActivateDeactivateAccountsPage from './pages/ActivateDeactivateAccounts';
import TapelaChangePage from './pages/TapelaChange';
import NotificationsPage from './pages/Notifications';
import VerifyPaymentsPage from './pages/VerifyPayments';
import WeeklyReportsPage from './pages/WeeklyReports';
import ComplaintsPage from './pages/Complaints';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './assets/css/Dashboard.css'

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Container fluid>
          <Row>
            <Col sm={3}>
              <Sidebar />
            </Col>

            <Col sm={9} className="main-content">
              <Card className="dashboard-card">
                <Card.Body>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          <Route path="/register-supervisors" element={<RegisterSupervisorsPage />} />
          <Route path="/register-transport-employees" element={<RegisterTransportEmployeesPage />} />
          <Route path="/new-drivers-data" element={<NewDriversDataPage />} />
          <Route path="/assign-supervisors" element={<AssignSupervisorsPage />} />
          <Route path="/assign-employees" element={<AssignEmployeesPage />} />
          <Route path="/activate-deactivate-accounts" element={<ActivateDeactivateAccountsPage />} />
          <Route path="/tapela-change" element={<TapelaChangePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/verify-payments" element={<VerifyPaymentsPage />} />
          <Route path="/weekly-reports" element={<WeeklyReportsPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
        </Routes>
        </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;