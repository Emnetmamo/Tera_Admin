import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/VerifyPaymentsPage.css';

const VerifyPaymentsPage = () => {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [completedPayments, setCompletedPayments] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  const fetchPendingPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/driver/payment/pending-payments');
      setPendingPayments(response.data);
    } catch (error) {
      console.error('Error fetching pending payments: ', error);
      toast.error('Error fetching pending payments');
    }
  };

  const fetchCompletedPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/driver/payment/completed-payments');
      setCompletedPayments(response.data);
    } catch (error) {
      console.error('Error fetching completed payments: ', error);
      toast.error('Error fetching completed payments');
    }
  };

  useEffect(() => {
    fetchPendingPayments();
    fetchCompletedPayments();
  }, []);

  const handleVerifyPayment = async (txRef) => {
    try {
      const response = await axios.post('http://localhost:5000/api/driver/payment/update-payment-status', { txRef });
      if (response.status === 200) {
        toast.success('Payment status updated successfully');
        fetchPendingPayments();
        fetchCompletedPayments(); // Update completed payments list
      } else {
        toast.error('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment status: ', error);
      toast.error('Error updating payment status');
    }
  };

  return (
    <div className="verify-payments-page">
      <h1>Verify Payments</h1>
      <div className="tabs">
        <button
          className={activeTab === 'pending' ? 'active' : ''}
          onClick={() => setActiveTab('pending')}
        >
          Pending Payments
        </button>
        <button
          className={activeTab === 'completed' ? 'active' : ''}
          onClick={() => setActiveTab('completed')}
        >
          Completed Payments
        </button>
      </div>

      {activeTab === 'pending' && (
        <div className="table-container">
          {pendingPayments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Punishment Name</th>
                  <th>Punishment Price</th>
                  <th>Transaction Reference</th>
                  <th>Driver Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingPayments.map((payment) => (
                  <tr key={payment._id}>
                    <td>{payment.punishmentName}</td>
                    <td>{payment.punishmentPrice}</td>
                    <td>{payment.txRef}</td>
                    <td>{payment.driverName}</td>
                    <td>{payment.paymentStatus}</td>
                    <td>
                      <button
                        className="verify-button"
                        onClick={() => handleVerifyPayment(payment.txRef)}
                      >
                        Verify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No pending payments found</p>
          )}
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="table-container">
          {completedPayments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Punishment Name</th>
                  <th>Punishment Price</th>
                  <th>Transaction Reference</th>
                  <th>Driver Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {completedPayments.map((payment) => (
                  <tr key={payment._id}>
                    <td>{payment.punishmentName}</td>
                    <td>{payment.punishmentPrice}</td>
                    <td>{payment.txRef}</td>
                    <td>{payment.driverName}</td>
                    <td>{payment.paymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No completed payments found</p>
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default VerifyPaymentsPage;
