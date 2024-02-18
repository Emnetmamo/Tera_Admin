// src/components/AssignSupervisor/ChangeSupervisorModal.js

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ChangeSupervisorModal = ({ show, handleClose, employeeId, currentSupervisor, supervisorList }) => {
  // Add your logic for changing supervisor here

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Supervisor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add your form or content for changing supervisor */}
        <p>Employee ID: {employeeId}</p>
        <p>Current Supervisor: {currentSupervisor}</p>
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
          Change
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeSupervisorModal;
