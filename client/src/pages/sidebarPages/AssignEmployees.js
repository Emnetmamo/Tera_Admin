// src/pages/AssignTransportEmployeesPage.js

import React, { useState } from 'react';
import { FormControl,Tab, Tabs } from 'react-bootstrap';
import UnassignedList from '../../components/AssignTransportEmployee/UnassignedList';
import AssignedList from '../../components/AssignTransportEmployee/AssignedList';
import '../../assets/css/AssignTransportEmployees.css'; 
import { BiSearch } from 'react-icons/bi';

const AssignTransportEmployeesPage = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('unassignedList');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="assign-transport-employees-page">
      <h2 className='title'>Assign Transport Employees to Taxi Drivers</h2>
      <div className="search-bar">
        <FormControl
          type="text"
          placeholder="Search drivers by Name/ License Number/ License Number/ Code..."
          value={search}
          onChange={handleSearchChange}
        />
        <BiSearch className="search-icon" />
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={handleTabChange}
        id="assign-transport-employees-tabs"
      >
        <Tab eventKey="unassignedList" title="Unassigned List">
          {activeTab === 'unassignedList' && <UnassignedList searchTerm={search} />}
        </Tab>
        <Tab eventKey="assignedList" title="Assigned List">
          {activeTab === 'assignedList' && <AssignedList searchTerm={search} />}
        </Tab>
      </Tabs>
    </div>
  );
};

export default AssignTransportEmployeesPage;
