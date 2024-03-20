// src/pages/NewTransportEmployeeDataPage.js

import React, { useState , useEffect} from 'react';
import { FormControl, Table } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi'; 
import '../../assets/css/TaxiDrivers.css'; 
import axios from 'axios';

const TransportEmployeeDataPage = () => {

 const [TransportEmployeeData, setTransportEmployeeData] = useState([]);
 const [search, setSearch] = useState('');


  useEffect(() => {
    // Fetch transport Employee data details logic
    const fetchTransportEmployeeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transportEmployee/Datas/getTransportEmployeeData');

        if (response.status === 200) {
          setTransportEmployeeData(response.data);
        } else {
          console.error('Failed to fetch employees details:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching employees details:', error.message);
      }
    };

    fetchTransportEmployeeData();
  }, []);

  const filteredTransportEmployeeData = TransportEmployeeData.filter((driver) => {
    // Filter based on search term (Name or email or work id  or city district or assigned route)
    const searchTermLowerCase = search.toLowerCase();
    return (
      (driver.fullName && driver.fullName.toLowerCase().includes(searchTermLowerCase)) ||
      (driver.email && driver.email.toLowerCase().includes(searchTermLowerCase)) ||
      (driver.employeeId && driver.employeeId.toLowerCase().includes(searchTermLowerCase)) ||
      (driver.cityDistrict && driver.cityDistrict.toLowerCase().includes(searchTermLowerCase)) ||
      (driver.assignedRoute && driver.assignedRoute.toLowerCase().includes(searchTermLowerCase))
    );
  });

  const handleSearch = (event) => {
    setSearch(event.target.value);
    
  };

  return (
    <div className="drivers-data-page">
      <h2 className='text-center mb-4'>Transport Employees Data</h2>
      <div className="search-bar">
        <FormControl
          type="text"
          placeholder="Search employee by Name/ work Id/ City District/ Assigned Routes..."
          value={search}
          onChange={handleSearch}
        />
        <BiSearch className="search-icon" />
      </div>
      <Table striped bordered hover responsive className="drivers-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Employee Id</th>
          <th>City District</th>
          <th>Assigned Route</th>
          <th>Assigned Drivers</th>
        </tr>
      </thead>
      <tbody>
        {filteredTransportEmployeeData.map((employee, index) => (
          <tr key={index}>
            <td>{employee.fullName}</td>
            <td>{employee.email}</td>
            <td>{employee.employeeId}</td>
            <td>{employee.cityDistrict}</td>
            <td>{employee.assignedRoute}</td>
            <td>{employee.assignedDrivers.map((driver, index) => (
                <div key={index}>
                    <p>{driver.fullName} - {driver.licensePlate}</p>
                </div>
                ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>

        
  );
};

export default TransportEmployeeDataPage;
