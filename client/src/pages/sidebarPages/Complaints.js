import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TransportEmployeePage from '../../components/complaints/TransportEmployeePage';
import TaxiDriverPage from '../../components/complaints/TaxiDriverPage';
import PassengerPage from '../../components/complaints/PassengerPage';
import '../../assets/css/Complaints.css';

const ComplaintsPage = () => {
  const [key, setKey] = useState('transportEmployee');

  useEffect(() => {
    const savedKey = localStorage.getItem('complaintsActiveTab');
    if (savedKey) {
      setKey(savedKey);
    }
  }, []);

  const handleSelect = (k) => {
    setKey(k);
    localStorage.setItem('complaintsActiveTab', k);
  };

  return (
    <div className="complaints-container">
      <h2 className='text-center'>Complaints</h2>
      <Tabs activeKey={key} onSelect={handleSelect} id="complaints-tabs">
        <Tab eventKey="transportEmployee" title="From Transport Employee">
          <TransportEmployeePage />
        </Tab>
        <Tab eventKey="taxiDriver" title="From Taxi Driver">
          <TaxiDriverPage />
        </Tab>
        <Tab eventKey="passenger" title="From Passenger">
          <PassengerPage />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ComplaintsPage;
