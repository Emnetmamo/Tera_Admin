import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/css/NotificationsPage.css';

const NotificationsPage = () => {
  const [notificationType, setNotificationType] = useState('all');
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleNotificationTypeChange = (event) => {
    setNotificationType(event.target.value);
  };

  const handleNotificationMessageChange = (event) => {
    setNotificationMessage(event.target.value);
  };

  const handleSendNotification = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/notifications/sendNotification', {
        notificationType: notificationType,
        message: notificationMessage
      });
      console.log('Notification sent successfully:', response.data);
      setNotificationType('all');
      setNotificationMessage('');
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again later.');
    }
  };

  return (
    <div className="notifications-container">
      <h2 className="title">Notifications</h2>
      <div className="input-section">
        <label htmlFor="notificationType" className="label">Select Recipients:</label>
        <select id="notificationType" value={notificationType} onChange={handleNotificationTypeChange} className="select">
          <option value="all">All</option>
          <option value="drivers">Drivers</option>
          <option value="transportEmployees">Transport Employees</option>
        </select>
      </div>
      <div className="input-section">
        <label htmlFor="notificationMessage" className="label">Notification Message:</label>
        <textarea id="notificationMessage" value={notificationMessage} onChange={handleNotificationMessageChange} className="textarea"></textarea>
      </div>
      <button onClick={handleSendNotification} className="send-button">Send Notification</button>
    </div>
  );
};

export default NotificationsPage;
