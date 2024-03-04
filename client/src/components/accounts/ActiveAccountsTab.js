// ./components/accounts/ActiveAccountsTab.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const ActiveAccountsTab = ({ activeAccounts, fetchActiveAccounts, handleForceUpdate, searchTerm }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [deactivationReason, setDeactivationReason] = useState('');

  const openModal = (accountId) => {
    setSelectedAccountId(accountId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setDeactivationReason('');
  };

  const deactivateAccount = async () => {
    try {
      await axios.put(`http://localhost:5000/api/transportEmployee/accounts/${selectedAccountId}/deactivate`, {
        reason: deactivationReason,
      });
      fetchActiveAccounts();
      handleForceUpdate();
      closeModal();
    } catch (error) {
      console.error('Error deactivating account:', error);
    }
  };

  // Sort activeAccounts by updatedAt in descending order
  const sortedActiveAccounts = activeAccounts
    .filter((account) => {
      // Filter based on search term (name or employee ID)
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        account.fullName.toLowerCase().includes(searchTermLowerCase) ||
        account.employeeId.toLowerCase().includes(searchTermLowerCase)
      );
    })
    .slice()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Employee Id</th>
            <th>City District</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedActiveAccounts.map((account) => (
            <tr key={account._id}>
              <td>{account.fullName}</td>
              <td>{account.sex}</td>
              <td>{account.employeeId}</td>
              <td>{account.cityDistrict}</td>
              <td>{account.status}</td>
              <td>
                <button className='btn btn-danger' onClick={() => openModal(account._id)}>
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for deactivation */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Choose a reason for deactivation:</h6>
          <select
            className='form-control'
            value={deactivationReason}
            onChange={(e) => setDeactivationReason(e.target.value)}
          >
            <option value='' disabled defaultValue>
              Select a status
            </option>
            <option value='Quit Job'>Quit Job</option>
            <option value='Fired from Job'>Fired from Job</option>
            <option value='On a disciplinary action'>On a disciplinary action</option>
            <option value='Promoted'>Promoted</option>
            <option value='Lost account control'>Lost account control</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Close
          </Button>
          <Button variant='danger' onClick={deactivateAccount}>
            Deactivate
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActiveAccountsTab;
