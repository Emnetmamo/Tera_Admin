const Notification = require('../models/Notification');

const storeNotificationData = async (notificationType, message) => {
  try {
    switch (notificationType) {
      case 'all':
        await Notification.create({ type: 'all', message: message });
        break;
      case 'drivers':
        await Notification.create({ type: 'drivers', message: message });
        break;
      case 'transportEmployees':
        await Notification.create({ type: 'transportEmployees', message: message });
        break;
      default:
        break;
    }
    console.log('Notification data stored successfully');
  } catch (error) {
    console.error('Error storing notification data:', error);
    throw error;
  }
};

const sendNotification = async (req, res) => {
  try {
    const { notificationType, message } = req.body;
    console.log('Received notification:', { notificationType, message });
    await storeNotificationData(notificationType, message);
    res.status(200).json({ success: true, message: 'Notifications sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
module.exports = { sendNotification };
