import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import ActiveAccountsTab from '../../components/accounts/ActiveAccountsTab';
import DeactivatedAccountsTab from '../../components/accounts/DeactivatedAccountsTab';
import axios from 'axios';

const ActivateDeactivateAccountsPage = () => {
  const [activeAccounts, setActiveAccounts] = useState([]);
  const [deactivatedAccounts, setDeactivatedAccounts] = useState([]);

  useEffect(() => {
    fetchActiveAccounts();
    fetchDeactivatedAccounts();
  }, []);

  const fetchActiveAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transportEmployee/active');
      setActiveAccounts(response.data);
    } catch (error) {
      console.error('Error fetching active accounts:', error);
    }
  };

  const fetchDeactivatedAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transportEmployee/deactivated');
      setDeactivatedAccounts(response.data);
    } catch (error) {
      console.error('Error fetching deactivated accounts:', error);
    }
  };

  return (
    <div className='activate-deactivate'>
      <h2 className='text-center'>Activate or Deactivate Accounts Page</h2>
      <div className='container'>
        <Tabs defaultActiveKey="ActivatedAccounts" id="activate_deactivate-tabs">
          <Tab eventKey="ActivatedAccounts" title="Activated Accounts">
            <ActiveAccountsTab activeAccounts={activeAccounts} fetchActiveAccounts={fetchActiveAccounts} />
          </Tab>
          <Tab eventKey="DeactivatedAccounts" title="Deactivated Accounts">
            <DeactivatedAccountsTab deactivatedAccounts={deactivatedAccounts} fetchDeactivatedAccounts={fetchDeactivatedAccounts} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ActivateDeactivateAccountsPage;
