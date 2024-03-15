// src/components/AssignTransportEmployee/AssignedList.js

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Select from 'react-select'; 
import { ToastContainer, toast } from 'react-toastify';
import '../../assets/css/AssignTransportEmployees.css';
import axios from 'axios';

const AssignedList = ({ searchTerm }) => {
  const [assignedDrivers, setAssignedDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // fetch the data of the drivers that havee employees assigned
  useEffect(() => {
    const fetchDriversData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/driver/TaxiDriverData/getAssignedDrivers');
        if (response.status === 200) {
          setAssignedDrivers(response.data);
        } else {
          console.error('Failed to fetch assigned drivers:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching assigned drivers:', error.message);
      }
    };
    fetchDriversData();
  }, []);

  // Logic to fetch the employee list except the one currently assigned 
  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        if (selectedDriver) {
          const response = await axios.get('http://localhost:5000/api/assignTransportEmployee/getEmployeeExceptCurrent', {
            params: {
              cityDistrict: selectedDriver.cityDistrict,
              currentEmployeeId: selectedDriver.AssignedTransportEmployee._id
            }
          });
          if (response.status === 200) {
            setEmployeeList(response.data);
          } else {
            console.error('Failed to fetch employee list:', response.data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching employee list:', error.message);
      }
    };
    fetchEmployeeList();
  }, [selectedDriver]);


  const handleChangeEmployee = (driver) => {
    setSelectedDriver(driver);
    setShowChangeModal(true);
  };

  const handleModalClose = () => {
    setSelectedDriver(null);
    setShowChangeModal(false);
    setSelectedEmployee(null);
  };

  // Handler for selecting an employee from dropdown
  const handleEmployeeSelection = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setSelectedEmployee(selectedOption.value);
    } else {
      setSelectedEmployee(null);
    }
  };

  // Logic that handles the employee change for a selected driver 
  const handleEmployeeChange = async () => {
    if (!selectedDriver || !selectedEmployee) {
      console.error('Driver or employee not selected');
      toast.error('Driver or employee not selected');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/assignTransportEmployee/changeEmployee', {
        driverId: selectedDriver._id,
        employeeId: selectedEmployee._id,
        fullName: selectedEmployee.fullName,
        workId: selectedEmployee.employeeId,
        cityDistrict: selectedEmployee.cityDistrict,
        assignedRoute: selectedEmployee.assignedRoute,
      });

      if (response.status === 200) {
        const updatedDriverList = assignedDrivers.map(driver => {
          if (driver._id === selectedDriver._id) {
            return { ...driver, AssignedTransportEmployee: selectedEmployee };
          }
          return driver;
        });
        setAssignedDrivers(updatedDriverList);
        toast.success('Employee has been Changed successfully.');
        setShowChangeModal(false);
      } else {
        console.error('Failed to change employee:', response.data.message);
      }
    } catch (error) {
      console.error('Error changing employee:', error.message);
    }
  };

  const assignedDriver = assignedDrivers.filter((driver) => {
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
    <div className="assigned-list">
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
            {assignedDriver.map((driver, index) => (
              <tr key={index}>
                <td>{driver.firstName} {driver.lastName}</td>
                <td>{driver.licensenumber}</td>
                <td>{driver.licenseplate}</td>
                <td>{driver.cityDistrict}</td>
                <td>{driver.Assignedroute}</td>
                <td>{driver.AssignedTransportEmployee.fullName}</td>
                <td>
                  <Button className='btn-change' onClick={() => handleChangeEmployee(driver)}>
                    Change Employee
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
     {/* Modal for changing Employees */}
      <Modal show={showChangeModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Transport Employee</Modal.Title>
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
        <Button className='btn-change' onClick={handleEmployeeChange}>
          Confirm Change
        </Button>
      </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignedList;





