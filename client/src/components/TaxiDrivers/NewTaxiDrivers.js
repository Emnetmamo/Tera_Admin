// src/components/TaxiDrivers/NewTaxiDriversPage.js


import React from 'react';
import { Table } from 'react-bootstrap';

const NewTaxiDriversPage = () => {
  const newDriversData = [
    { fullName: 'New Driver 1', email: 'newdriver1@example.com', licenseNumber: 'NEW123', licensePlate: 'NEW789', code: 'ND1', assignedRoute: 'Route New 1', assignedEmployee: 'EmpNew1' },
    { fullName: 'New Driver 2', email: 'newdriver2@example.com', licenseNumber: 'NEW456', licensePlate: 'NEWUVW', code: 'ND2', assignedRoute: 'Route New 2', assignedEmployee: 'EmpNew2' },
  ];

  return (
    <Table striped bordered hover className="drivers-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>License Number</th>
          <th>License Plate</th>
          <th>Code</th>
          <th>Assigned Route</th>
          <th>Assigned Transport Employee</th>
        </tr>
      </thead>
      <tbody>
        {newDriversData.map((driver, index) => (
          <tr key={index}>
            <td>{driver.fullName}</td>
            <td>{driver.email}</td>
            <td>{driver.licenseNumber}</td>
            <td>{driver.licensePlate}</td>
            <td>{driver.code}</td>
            <td>{driver.assignedRoute}</td>
            <td>{driver.assignedEmployee}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default NewTaxiDriversPage;
