import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import '../../assets/css/AllDrivers.css'; // Import CSS file for styling

const AllDriversPage = ({ searchTerm }) => {
  const [driversData, setDriversData] = useState([]);

  useEffect(() => {
    // Fetch driver details logic
    const fetchDriversData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/driver/TaxiDriverData/getTaxiDriversData');

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

  const filteredDriversData = driversData.filter((driver) => {
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
    <Table striped bordered hover responsive className="drivers-table">
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
        {filteredDriversData.map((driver, index) => (
          <tr key={index}>
            <td>{driver.firstName} {driver.lastName}</td>
            <td>{driver.licensenumber}</td>
            <td>{driver.licenseplate}</td>
            <td>{driver.Code}</td>
            <td>{driver.Assignedroute}</td>
            <td>{driver.AssignedTransportEmployee.fullName}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AllDriversPage;
