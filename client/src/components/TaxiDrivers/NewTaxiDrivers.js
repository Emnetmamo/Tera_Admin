// src/components/TaxiDrivers/NewTaxiDriversPage.js


import React, { useState , useEffect} from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const NewTaxiDriversPage = ({searchTerm}) => {
  const [newDriversData, setnewDriversData] = useState([]);
    
  useEffect(() => {
    // Fetch driver details logic
    const fetchdriversData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/driver/TaxiDriverData/getNewTaxiDriversData');

        if (response.status === 200) {
          setnewDriversData(response.data);
        } else {
          console.error('Failed to fetch user details:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchdriversData();
  }, []); 


  const driversDatas = newDriversData
  .filter((newDriversData) => {
    // Filter based on search term (Name or licenseplate or license Number or Code)
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      (newDriversData.firstName && newDriversData.firstName.toLowerCase().includes(searchTermLowerCase)) ||
      (newDriversData.licenseplate && newDriversData.licenseplate.toLowerCase().includes(searchTermLowerCase))||
      (newDriversData.licensenumber && newDriversData.licensenumber.toLowerCase().includes(searchTermLowerCase))||
      (newDriversData.Code && newDriversData.Code.toLowerCase().includes(searchTermLowerCase))

    );
  });

  return (
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
        {driversDatas.map((driver, index) => (
          <tr key={index}>
             <td>{driver.firstName} {driver.lastName}</td>
            <td>{driver.licensenumber}</td>
            <td>{driver.licenseplate}</td>
            <td>{driver.Code}</td>
            <td>{driver.Assignedroute}</td>
            <td>{driver.AssignedTransportEmployee}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default NewTaxiDriversPage;
