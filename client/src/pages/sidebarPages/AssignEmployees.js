// src/pages/AssignTransportEmployeesPage.js

import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import UnassignedList from '../../components/AssignTransportEmployee/UnassignedList';
import AssignedList from '../../components/AssignTransportEmployee/AssignedList';
import '../../assets/css/AssignTransportEmployees.css'; // Import the CSS file for styling
import { BiSearch } from 'react-icons/bi';

const AssignTransportEmployeesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="assign-transport-employees-page">
      <h2>Assign Transport Employees to Taxi Drivers</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search drivers..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <BiSearch className="search-icon" />
      </div>

      <Tabs defaultActiveKey="unassignedList" id="assign-transport-employees-tabs">
        <Tab eventKey="unassignedList" title="Unassigned List">
          <UnassignedList searchQuery={searchQuery} />
        </Tab>
        <Tab eventKey="assignedList" title="Assigned List">
          <AssignedList searchQuery={searchQuery} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AssignTransportEmployeesPage;
