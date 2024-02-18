// src/components/AssignSupervisor/AssignedList.js

import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import '../../assets/css/AssignSupervisor.css'; // Import the CSS file for styling

const AssignedList = ({ searchQuery }) => {
  // Dummy data (replace with actual data)
  const assignedListData = [
    { id: 1, fullName: 'John Doe', cityDistrict: 'District A', assignedRoute: 'Route 1', supervisor: 'Supervisor 1' },
    { id: 2, fullName: 'Jane Smith', cityDistrict: 'District B', assignedRoute: 'Route 2', supervisor: 'Supervisor 2' },
    // Add more data as needed
  ];

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [supervisorForm, setSupervisorForm] = useState({ supervisorName: '' });

  const handleChangeSupervisor = (employee) => {
    setSelectedEmployee(employee);
    setShowChangeModal(true);
  };

  const handleModalClose = () => {
    setSelectedEmployee(null);
    setShowChangeModal(false);
    setSupervisorForm({ supervisorName: '' });
  };

  const handleSupervisorFormChange = (event) => {
    const { name, value } = event.target;
    setSupervisorForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleChangeSupervisorSubmit = () => {
    // Implement supervisor change logic here
    console.log(`Change supervisor for transport employee with ID: ${selectedEmployee.id}`);
    handleModalClose();
  };

  return (
    <div className="assigned-list">
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
          {assignedListData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.fullName}</td>
              <td>{employee.cityDistrict}</td>
              <td>{employee.assignedRoute}</td>
              <td>{employee.supervisor}</td>
              <td>
                <Button variant="warning" onClick={() => handleChangeSupervisor(employee)}>
                  Change Supervisor
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for supervisor change */}
      <Modal show={showChangeModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Supervisor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="supervisorName">
              <Form.Label>New Supervisor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new supervisor name"
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
          <Button variant="warning" onClick={handleChangeSupervisorSubmit}>
            Confirm Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignedList;
