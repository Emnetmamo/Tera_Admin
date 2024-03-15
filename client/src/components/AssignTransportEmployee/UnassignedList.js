// src/components/AssignTransportEmployee/UnassignedList.js

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import '../../assets/css/AssignTransportEmployees.css';

const UnassignedList = ({ searchTerm }) => {

  const [unassignedDrivers, setUnassignedDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetching drivers data with no driver assigned yet
  useEffect(() => {
    const fetchDriversData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/driver/TaxiDriverData/getNewTaxiDriversData');
        if (response.status === 200) {
          setUnassignedDrivers(response.data);
        } else {
          console.error('Failed to fetch unassigned drivers:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching unassigned drivers:', error.message);
      }
    };
    fetchDriversData();
  }, []);

  // Fetching similar employees data based on selected driver's city district
  useEffect(() => {
    const fetchEmployeesData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/assignTransportEmployee/TransportEmployeeData', {
          params: { cityDistrict: selectedDriver.cityDistrict }
        });
        if (response.status === 200) {
          setEmployeeList(response.data);
        } else {
          console.error('Failed to fetch transport employees:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching transport employees:', error.message);
      }
    };
    if (selectedDriver) {
      fetchEmployeesData();
    }
  }, [selectedDriver]);

  // Handler for opening assign employee modal
  const handleAssignEmployee = (driver) => {
    setSelectedDriver(driver);
    setShowAssignModal(true);
  };

  // Handler for closing modal
  const handleModalClose = () => {
    setSelectedDriver(null);
    setSelectedEmployee(null);
    setShowAssignModal(false);
  };

  // Handler for selecting an employee from dropdown
  const handleEmployeeSelection = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setSelectedEmployee(selectedOption.value);
    } else {
      setSelectedEmployee(null);
    }
  };

  // Handler for assigning employee to the selected driver
  const handleEmployeeAssignment = async () => {
    if (!selectedDriver || !selectedEmployee) {
      console.error('Driver or employee not selected');
      toast.error('Driver or employee not selected');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/assignTransportEmployee/assign', {
        driverId: selectedDriver._id,
        employeeId: selectedEmployee._id,
        fullName: selectedEmployee.fullName,
        workId: selectedEmployee.employeeId,
        cityDistrict: selectedEmployee.cityDistrict,
        assignedRoute: selectedEmployee.assignedRoute,
      });

      if (response.status === 200) {
        const updatedDriverList = unassignedDrivers.filter(driver => driver._id !== selectedDriver._id);
        setUnassignedDrivers(updatedDriverList);
        toast.success('An Employee has been assigned. The driver is now added to the Assigned list.');
        handleModalClose();
      } else {
        console.error('Failed to assign employee:', response.data.message);
        toast.error('Failed to assign employee');
      }
    } catch (error) {
      console.error('Error assigning employee:', error.message);
      toast.error('Error assigning employee');
    }
  };

  const unassignedDriver = unassignedDrivers.filter((driver) => {
    // Filter based on search term (Name or license plate or license number or code)
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      (driver.firstName && driver.firstName.toLowerCase().includes(searchTermLowerCase)) ||
      (driver.licenseplate && driver.licenseplate.toLowerCase().includes(searchTermLowerCase)) ||
      (driver.licensenumber && driver.licensenumber.toLowerCase().includes(searchTermLowerCase)) ||
      (driver.Code && driver.Code.toLowerCase().includes(searchTermLowerCase))
    );
  });

  return (
    <div className="unassigned-list">
      <ToastContainer />
      <div className="table-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>License Number</th>
              <th>License Plate</th>
              <th>City District</th>
              <th>Assigned Route</th>
              <th>Assigned Transport Employee</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unassignedDriver.map((driver, index) => (
              <tr key={index}>
                <td>{driver.firstName} {driver.lastName}</td>
                <td>{driver.licensenumber}</td>
                <td>{driver.licenseplate}</td>
                <td>{driver.cityDistrict}</td>
                <td>{driver.Assignedroute}</td>
                <td>{driver.AssignedTransportEmployee ? driver.AssignedTransportEmployee.fullName : "Not Assigned"}</td>
                <td>
                  <Button className='btn-assign'  onClick={() => handleAssignEmployee(driver)}>
                    Assign Employee
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Modal for assigning employees to a driver */}
      <Modal show={showAssignModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Transport Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>{selectedDriver && `${selectedDriver.cityDistrict} Transport Employees`}</h6>
          <Form>
            <Form.Group controlId="employeeName">
              <Form.Label>Select an Employee</Form.Label>
              <Select
                options={employeeList.map(employee => ({
                  value: employee,
                  label: `${employee.fullName} - ${employee.employeeId}`
                }))}
                value={selectedEmployee ? { value: selectedEmployee, label: selectedEmployee.fullName } : null}
                onChange={selectedOption => handleEmployeeSelection(selectedOption)}
                placeholder="Search employee..."
                isClearable
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button className='btn-assign' onClick={handleEmployeeAssignment}>
            Confirm Assignment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UnassignedList;
