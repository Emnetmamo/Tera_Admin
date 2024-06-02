// controllers/notificationController.js

const Notification = require('../../Admin/models/Notification');

// Route to fetch notifications
const getNotifications = async (req, res) => {
  try {
    // Fetch notifications with type "passengers" or "all", sorted by createdAt in descending order
    const notifications = await Notification.find({ type: { $in: ['passengers', 'all'] } })
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getNewNotification = async (req, res) => {
    try {
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
      
        // Find notifications created within the current day
        const notifications = await Notification.find({ 
            createdAt: { $gte: startOfDay, $lte: endOfDay },
            type: { $in: ["transportEmployees", "all"] } // Filter by types "transportEmployees" and "all"
        });
        
        // Get the count of notifications
        const count = notifications.length;
        
        res.json({ count });
    } catch (error) {
        console.error('Error fetching notification count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
  getNotifications,
  getNewNotification
};
