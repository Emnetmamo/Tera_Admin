import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import '../../assets/css/AssignTransportEmployees.css';

const UnassignedList = ({ searchQuery }) => {

  const [unassignedListData, setUnassignedListData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetching drivers data
  useEffect(() => {
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

  // Fetching employees data based on selected driver's city district
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
  const handleEmployeeSelection = (employee) => {
    setSelectedEmployee(employee);
  };

  // Handler for assigning employee to driver
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
        const updatedDriverList = unassignedListData.filter(driver => driver._id !== selectedDriver._id);
        setUnassignedListData(updatedDriverList);
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
  
  return (
    <div className="unassigned-list">
      <ToastContainer />
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
          {unassignedListData.map((driver, index) => (
            <tr key={index}>
              <td>{driver.firstName} {driver.lastName}</td>
              <td>{driver.licensenumber}</td>
              <td>{driver.licenseplate}</td>
              <td>{driver.cityDistrict}</td>
              <td>{driver.Assignedroute}</td>
              <td>{driver.AssignedTransportEmployee ? driver.AssignedTransportEmployee.fullName : "Not Assigned"}</td>
              <td>
                <Button variant="primary" onClick={() => handleAssignEmployee(driver)}>
                  Assign Employee
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
                onChange={selectedOption => handleEmployeeSelection(selectedOption.value)}
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
          <Button variant="primary" onClick={handleEmployeeAssignment}>
            Confirm Assignment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UnassignedList;
