// src/pages/NewDriversDataPage.js

import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import AllDrivers from '../../components/TaxiDrivers/AllDrivers';
import OldTaxiDrivers from '../../components/TaxiDrivers/OldTaxiDrivers';
import NewTaxiDrivers from '../../components/TaxiDrivers/NewTaxiDrivers';
import { BiSearch } from 'react-icons/bi'; 
import '../../assets/css/TaxiDrivers.css'; // Import the CSS file for styling

const TaxiDriversDataPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="drivers-data-page">
      <h2>Taxi Drivers Data</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search drivers..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <BiSearch className="search-icon" />
      </div>
      <Tabs defaultActiveKey="allDrivers" id="drivers-tabs">
        <Tab eventKey="allDrivers" title="All Drivers">
          <AllDrivers searchQuery={searchQuery} />
        </Tab>
        <Tab eventKey="oldTaxiDrivers" title="Old Taxi Drivers">
          <OldTaxiDrivers searchQuery={searchQuery} />
        </Tab>
        <Tab eventKey="newTaxiDrivers" title="New Taxi Drivers">
          <NewTaxiDrivers searchQuery={searchQuery} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TaxiDriversDataPage;
