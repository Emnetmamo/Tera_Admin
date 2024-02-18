// src/components/TaxiDrivers/AllDrivers.js

import React from 'react';
import { Table } from 'react-bootstrap';

const AllDriversPage = () => {
  const driversData = [
    { fullName: 'Driver 1', email: 'driver1@example.com', licenseNumber: 'ABC123', licensePlate: 'XYZ789', code: 'D1', assignedRoute: 'Route 1', assignedEmployee: 'Emp1' },
    { fullName: 'Driver 2', email: 'driver2@example.com', licenseNumber: 'DEF456', licensePlate: 'UVW123', code: 'D2', assignedRoute: 'Route 2', assignedEmployee: 'Emp2' },
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
        {driversData.map((driver, index) => (
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

export default AllDriversPage;
