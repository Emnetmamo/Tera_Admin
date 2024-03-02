import React from 'react';
import axios from 'axios';

const DeactivatedAccountsTab = ({ deactivatedAccounts, fetchDeactivatedAccounts }) => {
  const activateAccount = async (accountId) => {
    try {
      await axios.put(`/api/activate-account/${accountId}`);
      fetchDeactivatedAccounts();
    } catch (error) {
      console.error('Error activating account:', error);
    }
  };

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deactivatedAccounts.map(account => {
            return <tr key={account._id}>
              <td>{account.name}</td>
              <td>{account.username}</td>
              <td>
                <button className='btn btn-success' onClick={() => activateAccount(account._id)}>Activate</button>
              </td>
            </tr>
          }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeactivatedAccountsTab;
