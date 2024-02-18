// src/pages/AssignSupervisorPage.js

import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import UnassignedList from '../../components/AssignSupervisor/UnassignedList';
import AssignedList from '../../components/AssignSupervisor/AssignedList';
import '../../assets/css/AssignSupervisor.css'; // Import the CSS file for styling
import { BiSearch } from 'react-icons/bi';


const AssignSupervisorPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="assign-supervisor-page">
      <h2>Assign Supervisor to Transport Employee</h2>
      {/* <h2>ASSIGN SUPERVISORS TO TRANSPORT EMPLOYEES</h2> */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Employees..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <BiSearch className="search-icon" />
      </div>
      <Tabs defaultActiveKey="unassignedList" id="assign-supervisor-tabs">
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

export default AssignSupervisorPage;
