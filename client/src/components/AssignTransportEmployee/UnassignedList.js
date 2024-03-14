// src/components/AssignTransportEmployee/UnassignedList.js

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../assets/css/AssignTransportEmployees.css'; // Import the CSS file for styling

const UnassignedList = ({ searchQuery }) => {
  const [unassignedListData, setUnassignedListData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    // Fetch unassigned drivers data
    const fetchDriversData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/driver/TaxiDriverData/getNewTaxiDriversData');

        if (response.status === 200) {
          setUnassignedListData(response.data);
        } else {
          console.error('Failed to fetch unassigned drivers:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching unassigned drivers:', error.message);
      }
    };

    fetchDriversData();
  }, []);

  useEffect(() => {
    // Fetch transport employees data for modal
    const fetchEmployeesData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/assignTransportEmployee/TransportEmployeeData');

        if (response.status === 200) {
          setEmployeeList(response.data);
        } else {
          console.error('Failed to fetch transport employees:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching transport employees:', error.message);
      }
    };

    fetchEmployeesData();
  }, []);

  
  const handleAssignEmployee = (driver) => {
    setSelectedDriver(driver);
    setShowAssignModal(true);
  };

  const handleModalClose = () => {
    setSelectedDriver(null);
    setSelectedEmployee(null);
    setShowAssignModal(false);
  };

  const handleEmployeeSelection = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleEmployeeAssignment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/driver/TaxiDriverData/assignTransportEmployee', {
        driverId: selectedDriver._id,
        employeeId: selectedEmployee._id,
      });
     
      if (response.status === 200) {
        console.log('Employee assigned successfully');
        handleModalClose();
      } else {
        console.error('Failed to assign employee:', response.data.message);
      }
    } catch (error) {
      console.error('Error assigning employee:', error.message);
    }
  };


  return (
    <div className="unassigned-list">
      <Table striped bordered hover responsive>
        {/* Table header */}
        <thead>
          <tr>
            <th>Full Name</th>
            <th>License Number</th>
            <th>License Plate</th>
            <th>Code</th>
            <th>Assigned Route</th>
            <th>Assigned Transport Employee</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {unassignedListData.map((driver, index) => (
            <tr key={index}>
              <td>{driver.firstName} {driver.lastName}</td>
              <td>{driver.licensenumber}</td>
              <td>{driver.licenseplate}</td>
              <td>{driver.Code}</td>
              <td>{driver.Assignedroute}</td>
              <td>{driver.AssignedTransportEmployee}</td>
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
              <Form.Label>Select Employee</Form.Label>
              <Form.Control as="select" onChange={(e) => handleEmployeeSelection(JSON.parse(e.target.value))}>
                <option value="">Select Employee</option>
                {employeeList.map((employee) => (
                  <option key={employee._id} value={JSON.stringify(employee)}>
                    {employee.fullName} - {employee.assignedRoute}
                  </option>
                ))}
              </Form.Control>
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
