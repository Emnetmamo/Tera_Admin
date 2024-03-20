const User = require('../models/Admin');
const Driver = require('../../Driver/model/drivermodel');
const TransportEmployee = require('../models/TransportEmployee');

// Function to fetch email addresses based on notification type
const getEmailsByNotificationType = async (notificationType) => {
  let emails = [];
  switch (notificationType) {
    case 'all':
      emails = await User.find().distinct('email');
      break;
    case 'drivers':
      emails = await Driver.find().distinct('email');
      break;
    case 'transportEmployees':
      emails = await TransportEmployee.find().distinct('email');
      break;
    default:
      break;
  }
  return emails;
};

// Controller function to handle sending notifications
const sendNotification = async (req, res) => {
  try {
    const { notificationType, message } = req.body;
    const emails = await getEmailsByNotificationType(notificationType);
    console.log('Notification sent to:', emails);
    console.log('Message:', message);
    res.status(200).json({ success: true, message: 'Notifications sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { sendNotification };
