// src/components/TaxiDrivers/OldTaxiDrivers.js


import React from 'react';
import { Table } from 'react-bootstrap';

const OldTaxiDriversPage = () => {
  const oldDriversData = [
    { fullName: 'Old Driver 1', email: 'olddriver1@example.com', licenseNumber: 'OLD123', licensePlate: 'OLD789', code: 'OD1', assignedRoute: 'Route Old 1', assignedEmployee: 'EmpOld1' },
    { fullName: 'Old Driver 2', email: 'olddriver2@example.com', licenseNumber: 'OLD456', licensePlate: 'OLDUVW', code: 'OD2', assignedRoute: 'Route Old 2', assignedEmployee: 'EmpOld2' },
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
        {oldDriversData.map((driver, index) => (
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

export default OldTaxiDriversPage;
