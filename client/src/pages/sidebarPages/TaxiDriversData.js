// src/pages/NewDriversDataPage.js

import React, { useState } from 'react';
import { FormControl, Tab, Tabs } from 'react-bootstrap';
import AllDrivers from '../../components/TaxiDrivers/AllDrivers';
import NewTaxiDrivers from '../../components/TaxiDrivers/NewTaxiDrivers';
import { BiSearch } from 'react-icons/bi'; 
import '../../assets/css/TaxiDrivers.css'; 

const TaxiDriversDataPage = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
    
  };

  return (
    <div className="drivers-data-page">
      <h2 className='text-center mb-4'>Taxi Drivers Data</h2>
      <div className="search-bar">
        <FormControl
          type="text"
          placeholder="Search drivers by Name/ License Number/ License Number/ Code..."
          value={search}
          onChange={handleSearch}
        />
        <BiSearch className="search-icon" />
      </div>
      <Tabs defaultActiveKey="allDrivers" id="drivers-tabs">
        <Tab eventKey="allDrivers" title="All Drivers">
          <AllDrivers searchTerm={search} />
        </Tab>
        <Tab eventKey="newTaxiDrivers" title="New Taxi Drivers">
          <NewTaxiDrivers searchTerm={search} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TaxiDriversDataPage;
