// src/components/AssignSupervisor/AssignSupervisorModal.js

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AssignSupervisorModal = ({ show, handleClose, employeeId, supervisorList }) => {
  // Add your logic for assigning supervisor here

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Supervisor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add your form or content for assigning supervisor */}
        <p>Employee ID: {employeeId}</p>
        {/* Display the list of available supervisors */}
        <ul>
          {supervisorList.map((supervisor) => (
            <li key={supervisor.id}>{supervisor.name}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" >
          Assign
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignSupervisorModal;
