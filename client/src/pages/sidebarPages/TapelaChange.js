import React, { useState, useEffect } from 'react';
import { Table, Button, FormControl, Modal, Form } from 'react-bootstrap';
import Select from 'react-select';
import { BiSearch } from 'react-icons/bi';
import data from '../../data/data'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TapelaChangePage = () => {
  const [search, setSearch] = useState('');
  const [driversData, setDriversData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [newTerminal, setNewTerminal] = useState(null);
  const [newRoute, setNewRoute] = useState(null);
  const [newTransportEmployee, setNewTransportEmployee] = useState(null);
  const [terminals, setTerminals] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [transportEmployees, setTransportEmployees] = useState([]);
  const [modalKey, setModalKey] = useState(0); // Key for forcing modal re-render

  useEffect(() => {
    const fetchDriversData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tapelachange/getData');
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

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeRoute = (driver) => {
    setSelectedDriver(driver);

    if (data.District_Datas && data.District_Datas.length > 0) {
      const districtData = data.District_Datas.find(district => district.District.name.en === driver.cityDistrict);
      if (districtData) {
        const driverTerminal = driver.Terminal;
        const availableTerminals = districtData.District.terminals.filter(t => t.name.en !== driverTerminal);
        setTerminals(availableTerminals);
        setShowChangeModal(true);
      } else {
        console.error(`District data not found for city district: ${driver.cityDistrict}`);
      }
    } else {
      console.error('District data is missing or empty.');
    }
  };

  const handleModalClose = () => {
    setSelectedDriver(null);
    setShowChangeModal(false);
    setNewTerminal(null);
    setNewRoute(null);
    setNewTransportEmployee(null);
    setModalKey(prevKey => prevKey + 1); // Update modal key to force re-render
  };

  const handleNewTerminalChange = (selectedOption) => {
    console.log('Selected Terminal:', selectedOption);
    setNewTerminal(selectedOption);
    
    if (selectedOption && selectedOption.value && selectedOption.value.routes) {
      const selectedRoutes = selectedOption.value.routes.map((route, index) => ({
        value: {
          origin: { en: route.origin.en },
          destination: { en: route.destination.en }
        },
        label: `${route.origin.en} - ${route.destination.en}`
      }));
      console.log('Selected Routes:', selectedRoutes);
      setRoutes(selectedRoutes);
      fetchTransportEmployees(selectedOption.value.name.en);
    } else {
      setRoutes([]);
      setTransportEmployees([]);
    }
  };
  
  const fetchTransportEmployees = async (terminalName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tapelachange/employees?terminal=${terminalName}`);
      if (response.status === 200) {
        const employeeOptions = response.data.map(employee => ({
          value: employee._id,
          label: employee.fullName
        }));
        setTransportEmployees(employeeOptions);
      } else {
        console.error('Failed to fetch transport employees:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching transport employees:', error.message);
    }
  };

  const handleRouteChange = async () => {
    if (!selectedDriver || !newRoute || !newTerminal || !newTransportEmployee) {
      console.error('Driver, new route, terminal, or transport employee not specified');
      return;
    }

    const originDestination = `${newRoute.value.origin.en} - ${newRoute.value.destination.en}`;

    try {
      const response = await axios.post('http://localhost:5000/api/tapelachange/updateRouteAndDistrict', {
        driverId: selectedDriver._id,
        newRoute: originDestination,
        newTerminal: newTerminal.value.name.en, // Send newTerminal directly as well
        newEmployeeId: newTransportEmployee.value
      });

      if (response.status === 200) {
        const updatedDriversData = driversData.map(driver => {
          if (driver._id === selectedDriver._id) {
            return {
              ...driver,
              Assignedroute: originDestination,
              cityDistrict: newTerminal.value.name.en,
              AssignedTransportEmployee: {
                fullName: newTransportEmployee.label,
                _id: newTransportEmployee.value
              }
            };
          }
          return driver;
        });
        setDriversData(updatedDriversData);
        setShowChangeModal(false);
        toast.success('Tapela has been changed successfully');
      } else {
        console.error('Failed to change route:', response.data.message);
        toast.error('Failed to change Tapela');
      }
    } catch (error) {
      console.error('Error changing route:', error.message);
      toast.error('Error changing Tapela');
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
      <h2 className="page-title text-center">Tapela Change</h2>
      <div className="search-bar">
        <FormControl
          type="text"
          placeholder="Search drivers by Name/ License Plate/ License Number..."
          value={search}
          onChange={handleSearch}
        />
        <BiSearch className="search-icon" />
      </div>

      {filteredDriversData.length === 0 ? (
    <div>No data matches your search.</div>
      ) : (
      <Table striped bordered hover className="tapela-table">
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>License Plate</th>
            <th>City District</th>
            <th>Terminal</th>
            <th>Assigned Route</th>
            <th>Assigned Employee</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {filteredDriversData.map((driver, index)=> (
            <tr key={index}>
              <td>{driver.firstName} {driver.lastName}</td>
              <td>{driver.licenseplate}</td>
              <td>{driver.cityDistrict}</td>
              <td>{driver.Terminal}</td>
              <td>{driver.Assignedroute}</td>
              <td>{driver.AssignedTransportEmployee ? driver.AssignedTransportEmployee.fullName : 'Not Assigned'}</td>
              <td>
                <Button className='btn-change' onClick={() => handleChangeRoute(driver)}>
                  Change Route
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      )}
      <Modal key={modalKey} show={showChangeModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Terminal and Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newTerminal">
              <Form.Label>New Terminal</Form.Label>
              <Select
                options={terminals.map(terminal => ({ value: terminal, label: terminal.name.en }))}
                onChange={handleNewTerminalChange}
                value={newTerminal}
              />
            </Form.Group>
            <Form.Group controlId="newRoute">
              <Form.Label>New Route</Form.Label>
              <Select
                options={routes}
                onChange={(selectedOption) => setNewRoute(selectedOption)}
                value={newRoute}
                isDisabled={!newTerminal}
              />
            </Form.Group>
            <Form.Group controlId="newTransportEmployee">
              <Form.Label>New Transport Employee</Form.Label>
              <Select
                options={transportEmployees}
                onChange={setNewTransportEmployee}
                value={newTransportEmployee}
                isDisabled={!newTerminal}
              />
            </Form.Group>
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
      <ToastContainer />
    </div>
  );
};

export default TapelaChangePage;

