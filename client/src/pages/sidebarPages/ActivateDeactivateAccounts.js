import React, { useState, useEffect } from 'react';
import { Tab, Tabs, FormControl } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';
import ActiveAccountsTab from '../../components/accounts/ActiveAccountsTab';
import DeactivatedAccountsTab from '../../components/accounts/DeactivatedAccountsTab';
import axios from 'axios';

const ActivateDeactivateAccountsPage = () => {
  const [activeAccounts, setActiveAccounts] = useState([]);
  const [deactivatedAccounts, setDeactivatedAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false); // State variable to force update
  const [key, setKey] = useState('ActivatedAccounts');

  useEffect(() => {
    fetchActiveAccounts();
    fetchDeactivatedAccounts();
  }, [forceUpdate, key]);

  const fetchActiveAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transportEmployee/accounts/active');
      setActiveAccounts(response.data);
    } catch (error) {
      console.error('Error fetching active accounts:', error);
    }
  };

  const fetchDeactivatedAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transportEmployee/accounts/deactivated');
      setDeactivatedAccounts(response.data);
    } catch (error) {
      console.error('Error fetching deactivated accounts:', error);
    }
  };

  const handleForceUpdate = () => {
    setForceUpdate(prevState => !prevState); // Toggle forceUpdate state to trigger re-render
  };

  const handleTabSelect = (selectedKey) => {
    setKey(selectedKey);
  };

  return (
    <div className='activate-deactivate'>
      <h2 className='text-center mb-5'>Activate or Deactivate Accounts </h2>
      <div className='container'>
        <div className="search-bar">
          <FormControl
            placeholder='Search by Name or Employee ID'
            aria-label='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <BiSearch className="search-icon" />
        </div>
        <Tabs activeKey={key} onSelect={handleTabSelect} id='activate_deactivate-tabs' style={{ marginBottom: "20px" }}>
          <Tab eventKey='ActivatedAccounts' title='Activated Accounts'>
            <ActiveAccountsTab
              key={forceUpdate} // Pass forceUpdate as key to force re-render of ActiveAccountsTab
              activeAccounts={activeAccounts}
              fetchActiveAccounts={fetchActiveAccounts}
              handleForceUpdate={handleForceUpdate}
              searchTerm={searchTerm}
            />
          </Tab>
          <Tab eventKey='DeactivatedAccounts' title='Deactivated Accounts'>
            <DeactivatedAccountsTab
              key={forceUpdate} // Pass forceUpdate as key to force re-render of DeactivatedAccountsTab
              deactivatedAccounts={deactivatedAccounts}
              fetchDeactivatedAccounts={fetchDeactivatedAccounts}
              handleForceUpdate={handleForceUpdate}
              searchTerm={searchTerm}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ActivateDeactivateAccountsPage;
