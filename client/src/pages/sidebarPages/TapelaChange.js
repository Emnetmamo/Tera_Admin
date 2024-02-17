import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../../assets/css/TapelaChangePage.css';

const TapelaChangePage = () => {

  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Micki', licensePlate: 'ABC123', supervisor: 'Emnet Mamo', route: 'Route 1', tapela: 'Tapela 1' },
    { id: 2, name: 'Jelalo', licensePlate: 'DEF456', supervisor: 'Nahom Biniyam', route: 'Route 2', tapela: 'Tapela 2' },

  ]);


  return (
    <div>
      <h2 className="page-title">Tapela Change Notice Page</h2>
      <Table striped bordered hover="tapela-table">
        <thead>
          <tr>
            <th><p>Driver Name</p></th>
            <th><p>License Plate</p></th>
            <th><p>Assigned Supervisor</p></th>
            <th><p>Assigned Route</p></th>
            <th><p>Tapela</p></th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id}>
              <td>{driver.name}</td>
              <td>{driver.licensePlate}</td>
              <td>{driver.supervisor}</td>
              <td>{driver.route}</td>
              <td>{driver.tapela}</td> 
            </tr>
            
          ))}
          <Button varient="primary">Update</Button>
        
        </tbody>
      </Table>
    </div>
  );
};

export default TapelaChangePage;
