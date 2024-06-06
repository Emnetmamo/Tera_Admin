// src/components/TaxiDrivers/NewTaxiDriversPage.js

import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const NewTaxiDriversPage = ({ searchTerm }) => {
  const [newDriversData, setNewDriversData] = useState([]);

  useEffect(() => {
    // Fetch driver details logic
    const fetchDriversData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/driver/TaxiDriverData/getNewTaxiDriversData');

        if (response.status === 200) {
          setNewDriversData(response.data);
        } else {
          console.error('Failed to fetch user details:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchDriversData();
  }, []);

  const driversData = newDriversData.filter((driver) => {
    // Filter based on search term (Name, license plate, license number, code)
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      (driver.firstName && driver.firstName.toLowerCase().includes(searchTermLowerCase)) ||
      (driver.licenseplate && driver.licenseplate.toLowerCase().includes(searchTermLowerCase)) ||
      (driver.licensenumber && driver.licensenumber.toLowerCase().includes(searchTermLowerCase)) ||
      (driver.Code && driver.Code.toLowerCase().includes(searchTermLowerCase))
    );
  });

  return (
    <div>
    {driversData.length === 0 ? (
    <div>No data matches your search.</div>
      ) : (
    <Table striped bordered hover className="drivers-table">
      <thead>
        <tr>
          <th>Full Name</th>
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
            <td>{driver.firstName} {driver.lastName}</td>
            <td>{driver.licensenumber}</td>
            <td>{driver.licenseplate}</td>
            <td>{driver.Code}</td>
            <td>{driver.Assignedroute}</td>
            <td>{driver.AssignedTransportEmployee ? driver.AssignedTransportEmployee.fullName : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    )}
    </div>
  );
};

export default NewTaxiDriversPage;
