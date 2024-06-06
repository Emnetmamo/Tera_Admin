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
  const [forceUpdate, setForceUpdate] = useState(false); // State variable to force update

  useEffect(() => {
    const fetchDriversData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/driver/TaxiDriverData/getNewTaxiDriversData');
        if (response.status === 200) {
          // Sort the drivers based on timestamps in descending order
          const sortedDrivers = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setUnassignedDrivers(sortedDrivers);
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
    const fetchEmployeesData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/assignTransportEmployee/TransportEmployeeData', {
          params: { cityDistrict: selectedDriver.cityDistrict, Terminal: selectedDriver.Terminal }
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

  // Function to force update and reset modal state
  const resetModalState = () => {
    setSelectedDriver(null);
    setSelectedEmployee(null);
    setShowAssignModal(false);
    setForceUpdate(prevState => !prevState); // Toggle forceUpdate state to trigger re-render
  };

  // Function to handle modal close
  const handleModalClose = () => {
    resetModalState(); // Reset modal state
  };

  const handleAssignEmployee = (driver) => {
    setSelectedDriver(driver);
    setShowAssignModal(true);
  };

  const handleEmployeeSelection = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setSelectedEmployee(selectedOption.value);
    } else {
      setSelectedEmployee(null);
    }
  };

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
              <th>License Plate</th>
              <th>City District</th>
              <th>Terminal</th>
              <th>Assigned Route</th>
              <th>Assigned Transport Employee</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unassignedDriver.map((driver, index) => (
              <tr key={index}>
                <td>{driver.firstName} {driver.lastName}</td>
                <td>{driver.licenseplate}</td>
                <td>{driver.cityDistrict}</td>
                <td>{driver.Terminal}</td>
                <td>{driver.Assignedroute}</td>
                <td>{driver.AssignedTransportEmployee ? driver.AssignedTransportEmployee.fullName : "Not Assigned"}</td>
                <td>
                  <Button className='btn-assign' onClick={() => handleAssignEmployee(driver)}>
                    Assign Employee
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal key={forceUpdate} show={showAssignModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Transport Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>{selectedDriver && `${selectedDriver.cityDistrict} District ${selectedDriver.Terminal} Terminal Transport Employees`}</h6>
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
