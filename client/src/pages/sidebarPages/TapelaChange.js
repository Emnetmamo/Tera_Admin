import React, { useState, useEffect } from 'react';
import { Table, Button, FormControl, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { BiSearch } from 'react-icons/bi';

const TapelaChangePage = () => {
  const [search, setSearch] = useState('');
  const [driversData, setDriversData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [newRoute, setNewRoute] = useState('');
  const [newSupervisor, setNewSupervisor] = useState('');
  const [changeOption, setChangeOption] = useState('route');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const fetchDriversData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/driver/TaxiDriverData/getAssignedDrivers');
        if (response.status === 200) {
          setDriversData(response.data);
        } else {
          console.error('Failed to fetch driver details:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching driver details:', error.message);
      }
    };
    fetchDriversData();
  }, []);

  const handleChangeRoute = (driver) => {
    setSelectedDriver(driver);
    setShowChangeModal(true);
  };

  const handleModalClose = () => {
    setSelectedDriver(null);
    setShowChangeModal(false);
    setNewRoute('');
    setNewSupervisor('');
    setChangeOption('route');
  };

  const handleRouteChange = async () => {
    if (!selectedDriver || (!newRoute && !newSupervisor)) {
      console.error('Driver or new route/supervisor not specified');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('driverId', selectedDriver._id);
      formData.append('changeOption', changeOption);
      formData.append(changeOption === 'route' ? 'newRoute' : 'newSupervisor', changeOption === 'route' ? newRoute : newSupervisor);

      const response = await axios.post('http://localhost:5000/api/assignTransportEmployee/change', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const updatedDriversData = driversData.map(driver => {
          if (driver._id === selectedDriver._id) {
            if (changeOption === 'route') {
              return { ...driver, Assignedroute: newRoute };
            } else {
              return { ...driver, AssignedTransportEmployee: { fullName: newSupervisor } };
            }
          }
          return driver;
        });
        setDriversData(updatedDriversData);
        setShowChangeModal(false);
      } else {
        console.error('Failed to change route/supervisor:', response.data.message);
      }
    } catch (error) {
      console.error('Error changing route/supervisor:', error.message);
    }
  };

  const filteredDriversData = driversData.filter((driver) => {
    const searchTermLowerCase = search.toLowerCase();
    return (
      (driver.firstName && driver.firstName.toLowerCase().includes(searchTermLowerCase)) ||
      (driver.licenseplate && driver.licenseplate.toLowerCase().includes(searchTermLowerCase)) ||
      (driver.licensenumber && driver.licensenumber.toLowerCase().includes(searchTermLowerCase))
    );
  });

  return (
    <div>
      <h2 className="page-title">Tapela Change Notice Page</h2>
      <div className="search-bar">
        <FormControl
          type="text"
          placeholder="Search drivers by Name/ License Plate/ License Number..."
          value={search}
          onChange={handleSearch}
        />
        <BiSearch className="search-icon" />
      </div>
      <Table striped bordered hover className="tapela-table">
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>License Plate</th>
            <th>Assigned Supervisor</th>
            <th>Assigned Route</th>
            <th>City District</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {filteredDriversData.map((driver, index) => (
            <tr key={index}>
              <td>{driver.firstName} {driver.lastName}</td>
              <td>{driver.licenseplate}</td>
              <td>{driver.AssignedTransportEmployee.fullName}</td>
              <td>{driver.Assignedroute}</td>
              <td>{driver.cityDistrict}</td>
              <td>
                <Button className='btn-change' onClick={() => handleChangeRoute(driver)}>
                  Change Route
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showChangeModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`Change ${changeOption === 'route' ? 'Route' : 'Supervisor'}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="changeOption">
              <Form.Check
                type="radio"
                label="Change Route"
                checked={changeOption === 'route'}
                onChange={() => setChangeOption('route')}
              />
              <Form.Check
                type="radio"
                label="Change Supervisor"
                checked={changeOption === 'supervisor'}
                onChange={() => setChangeOption('supervisor')}
              />
            </Form.Group>
            {changeOption === 'route' ? (
              <Form.Group controlId="newRoute">
                <Form.Label>New Route</Form.Label>
                <FormControl
                  type="text"
                  value={newRoute}
                  onChange={(e) => setNewRoute(e.target.value)}
                  placeholder="Enter new route"
                />
              </Form.Group>
            ) : (
              <Form.Group controlId="newSupervisor">
                <Form.Label>New Supervisor</Form.Label>
                <FormControl
                  type="text"
                  value={newSupervisor}
                  onChange={(e) => setNewSupervisor(e.target.value)}
                  placeholder="Enter new supervisor"
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button className='btn-change' onClick={handleRouteChange}>
            Confirm Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TapelaChangePage;
