import React from 'react';
import axios from 'axios';

const ActiveAccountsTab = ({ activeAccounts, fetchActiveAccounts }) => {
  const deactivateAccount = async (accountId) => {
    try {
      await axios.put(`/api/deactivate-account/${accountId}`);
      fetchActiveAccounts();
    } catch (error) {
      console.error('Error deactivating account:', error);
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
          {activeAccounts.map(account => {
            return  <tr key={account._id}>
              <td>{account.name}</td>
              <td>{account.username}</td>
              <td>
                <button className='btn btn-danger' onClick={() => deactivateAccount(account._id)}>Deactivate</button>
              </td>
            </tr>
          }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveAccountsTab;
