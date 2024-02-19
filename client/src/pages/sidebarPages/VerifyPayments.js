import React from 'react';
import '../../assets/css/VerifyPaymentsPage.css';

const VerifyPaymentsPage = () => {
 
  const paymentsData = [
    { driverName: 'Miki', supervisor: 'Supervisor 1', penaltyType: 'Speeding Ticket', amount: 500, isPaid: true },
    { driverName: 'Jelalo', supervisor: 'Supervisor 2', penaltyType: 'Parking Violation', amount: 200, isPaid: false },
    
  ];

  const handleVerifyPayment = (driverName) => {
    alert(`Payment verified for ${driverName}`);
  };

  return (
    <div className="verify-payments-container">
      <h2>Verify Payments Page</h2>
      <table className="payments-table">
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>Supervisor</th>
            <th>Penalty Type</th>
            <th>Amount (ETB)</th>
            <th>Payment Status</th>
            <th>Verification</th>
          </tr>
        </thead>
        <tbody>
          {paymentsData.map((payment, index) => (
            <tr key={index}>
              <td>{payment.driverName}</td>
              <td>{payment.supervisor}</td>
              <td>{payment.penaltyType}</td>
              <td>{payment.amount}</td>
              <td className={payment.isPaid ? 'paid' : 'not-paid'}>
                {payment.isPaid ? 'Paid' : 'Not Paid'}
              </td>
              <td>
                <button onClick={() => handleVerifyPayment(payment.driverName)}>Verify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerifyPaymentsPage;
