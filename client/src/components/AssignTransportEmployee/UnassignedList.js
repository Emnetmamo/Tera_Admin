// src/components/AssignTransportEmployee/UnassignedList.js

import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import '../../assets/css/AssignTransportEmployees.css'; // Import the CSS file for styling


const UnassignedList = ({ searchQuery }) => {
  // Dummy data (replace with actual data)
  const unassignedListData = [
    { id: 1, fullName: 'Alemu Zewdu', licenseNumber: '12345', licensePlate: 'ABC123', code: '001', assignedRoute: '4kilo-Bole',assignedEmployee: "Daniel Wegen" },
    { id: 2, fullName: 'Taye Adane', licenseNumber: '67890', licensePlate: 'XYZ789', code: '002', assignedRoute: 'Bole-6Kilo', assignedEmployee: "Ayana Murad"},
    // Add more data as needed
  ];

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [employeeForm, setEmployeeForm] = useState({ employeeName: '' });

  const handleAssignEmployee = (driver) => {
    setSelectedDriver(driver);
    setShowAssignModal(true);
  };

  const handleModalClose = () => {
    setSelectedDriver(null);
    setShowAssignModal(false);
    setEmployeeForm({ employeeName: '' });
  };

  const handleEmployeeFormChange = (event) => {
    const { name, value } = event.target;
    setEmployeeForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleEmployeeAssignment = () => {
    // Implement employee assignment logic here
    console.log(`Assign transport employee to taxi driver with ID: ${selectedDriver.id}`);
    handleModalClose();
  };

  return (
    <div className="unassigned-list">
      <Table striped bordered hover responsive>
        {/* Table header */}
        <thead>
          <tr>
            <th>No_</th>
            <th>Full Name</th>
            <th>License Number</th>
            <th>License Plate</th>
            <th>Code</th>
            <th>Assigned Route</th>
            <th>Assigned Employee</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {unassignedListData.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.fullName}</td>
              <td>{driver.licenseNumber}</td>
              <td>{driver.licensePlate}</td>
              <td>{driver.code}</td>
              <td>{driver.assignedRoute}</td>
              <td>{driver.assignedEmployee}</td> 
              <td>
                <Button variant="primary" onClick={() => handleAssignEmployee(driver)}>
                  Assign Employee
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for employee assignment */}
      <Modal show={showAssignModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Transport Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="employeeName">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter employee name"
                name="employeeName"
                value={employeeForm.employeeName}
                onChange={handleEmployeeFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEmployeeAssignment}>
            Confirm Assignment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UnassignedList;
