// src/components/AssignSupervisor/UnassignedList.js

import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import '../../assets/css/AssignSupervisor.css'; // Import the CSS file for styling

const UnassignedList = ({ searchQuery }) => {
  // Dummy data (replace with actual data)
  const unassignedListData = [
    { id: 1, fullName: 'John Doe', cityDistrict: 'District A', assignedRoute: 'Route 1', supervisor: '' },
    { id: 2, fullName: 'Jane Smith', cityDistrict: 'District B', assignedRoute: 'Route 2', supervisor: '' },
    // Add more data as needed
  ];

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [supervisorForm, setSupervisorForm] = useState({ supervisorName: '' });

  const handleAssignSupervisor = (employee) => {
    setSelectedEmployee(employee);
    setShowAssignModal(true);
  };

  const handleModalClose = () => {
    setSelectedEmployee(null);
    setShowAssignModal(false);
    setSupervisorForm({ supervisorName: '' });
  };

  const handleSupervisorFormChange = (event) => {
    const { name, value } = event.target;
    setSupervisorForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSupervisorAssignment = () => {
    // Implement supervisor assignment logic here
    console.log(`Assign supervisor to transport employee with ID: ${selectedEmployee.id}`);
    handleModalClose();
  };

  return (
    <div className="unassigned-list">
      <Table striped bordered hover responsive>
        {/* Table header */}
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Full Name</th>
            <th>City District</th>
            <th>Assigned Route</th>
            <th>Supervisor</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {unassignedListData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.fullName}</td>
              <td>{employee.cityDistrict}</td>
              <td>{employee.assignedRoute}</td>
              <td>{employee.supervisor}</td>
              <td>
                <Button variant="primary" onClick={() => handleAssignSupervisor(employee)}>
                  Assign Supervisor
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for supervisor assignment */}
      <Modal show={showAssignModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Supervisor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="supervisorName">
              <Form.Label>Supervisor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter supervisor name"
                name="supervisorName"
                value={supervisorForm.supervisorName}
                onChange={handleSupervisorFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSupervisorAssignment}>
            Confirm Assignment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UnassignedList;
