// ./components/accounts/DeactivatedAccountsTab.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const DeactivatedAccountsTab = ({ deactivatedAccounts, fetchDeactivatedAccounts, handleForceUpdate, searchTerm }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [reactivationReason, setReactivationReason] = useState('');

  const openModal = (accountId) => {
    setSelectedAccountId(accountId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setReactivationReason('');
  };

  const activateAccount = async () => {
    try {
      await axios.put(`http://localhost:5000/api/transportEmployee/accounts/${selectedAccountId}/activate`, {
        reason: reactivationReason,
      });
      fetchDeactivatedAccounts();
      handleForceUpdate();
      closeModal();
    } catch (error) {
      console.error('Error activating account:', error);
    }
  };

  // Sort deactivatedAccounts by updatedAt in descending order
  const sortedDeactivatedAccounts = deactivatedAccounts
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
          {sortedDeactivatedAccounts.map((account) => (
            <tr key={account._id}>
              <td>{account.fullName}</td>
              <td>{account.sex}</td>
              <td>{account.employeeId}</td>
              <td>{account.cityDistrict}</td>
              <td>{account.status}</td>
              <td>
                <button className='btn btn-success' onClick={() => openModal(account._id)}>
                  Activate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Reactivation */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Choose a reason for reactivation:</h6>
          <select
            className='form-control'
            value={reactivationReason}
            onChange={(e) => setReactivationReason(e.target.value)}
          >
            <option value='' disabled defaultValue>
              Select a status
            </option>
            <option value='Hired back'>Hired back</option>
            <option value='Got a new Account'>Got a new Account</option>
            <option value='Returned from disciplinary action'>Returned from disciplinary action</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Close
          </Button>
          <Button variant='success' onClick={activateAccount}>
            Activate
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeactivatedAccountsTab;
