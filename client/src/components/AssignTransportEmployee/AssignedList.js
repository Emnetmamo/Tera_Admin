// src/components/AssignTransportEmployee/AssignedList.js

import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import '../../assets/css/AssignTransportEmployees.css'; // Import the CSS file for styling

const AssignedList = ({ searchQuery }) => {
  // Dummy data (replace with actual data)
  const assignedListData = [
    { id: 1, fullName: 'Debebe Wesson', licenseNumber: '12345', licensePlate: 'ABC123', code: '001', assignedRoute: 'Route 1', assignedEmployee: "Abebe Tessema"},
    { id: 2, fullName: 'Jane Smith', licenseNumber: '67890', licensePlate: 'XYZ789', code: '002', assignedRoute: 'Route 2',assignedEmployee: "Grima Hayle"  },
    // Add more data as needed
  ];

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [employeeForm, setEmployeeForm] = useState({ employeeName: '' });

  const handleChangeEmployee = (driver) => {
    setSelectedDriver(driver);
    setShowChangeModal(true);
  };

  const handleModalClose = () => {
    setSelectedDriver(null);
    setShowChangeModal(false);
    setEmployeeForm({ employeeName: '' });
  };

  const handleEmployeeFormChange = (event) => {
    const { name, value } = event.target;
    setEmployeeForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleChangeEmployeeSubmit = () => {
    // Implement employee change logic here
    console.log(`Change transport employee for taxi driver with ID: ${selectedDriver.id}`);
    handleModalClose();
  };

  return (
    <div className="assigned-list">
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
          {assignedListData.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.fullName}</td>
              <td>{driver.licenseNumber}</td>
              <td>{driver.licensePlate}</td>
              <td>{driver.code}</td>
              <td>{driver.assignedRoute}</td>
              <td>{driver.assignedEmployee}</td>
              <td>
                <Button variant="warning" onClick={() => handleChangeEmployee(driver)}>
                  Change Employee
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for employee change */}
      <Modal show={showChangeModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Transport Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="employeeName">
              <Form.Label>New Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new employee name"
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
          <Button variant="warning" onClick={handleChangeEmployeeSubmit}>
            Confirm Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignedList;
