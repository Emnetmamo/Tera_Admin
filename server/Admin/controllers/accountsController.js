// controllers/accountsController.js

const TransportEmployee = require('../models/TransportEmployee');

// Activate a transport employee account
const activateTransportEmployee = async (req, res) => {
  const { id } = req.params;
    const { reason } = req.body;
    try {
      const transportEmployee = await TransportEmployee.findByIdAndUpdate(
        id,
        { isActive: true, status: reason, updatedAt: Date.now() },
        { new: true } // return the updated document
      );

      res.json({ message: 'Transport employee account activated successfully' });
    } catch (error) {
      console.error('Error activating transport employee account:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Deactivate a transport employee account
  const deactivateTransportEmployee = async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    try {
      const transportEmployee = await TransportEmployee.findByIdAndUpdate(
        id,
        { isActive: false, status: reason, updatedAt: Date.now() },
        { new: true } // return the updated document
      );

      res.json({ message: 'Transport employee account deactivated successfully', updatedTransportEmployee: transportEmployee });
    } catch (error) {
      console.error('Error deactivating transport employee account:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const getActiveAccounts = async (req, res) => {
    try {
      const activeAccounts = await TransportEmployee.find({ isActive: true });
      res.json(activeAccounts);
    } catch (error) {
      console.error('Error fetching active accounts:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Controller to get deactivated transport employee accounts
  const getDeactivatedAccounts = async (req, res) => {
    try {
      const deactivatedAccounts = await TransportEmployee.find({ isActive: false });
      res.json(deactivatedAccounts);
    } catch (error) {
      console.error('Error fetching deactivated accounts:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  module.exports = { 
    activateTransportEmployee, 
    deactivateTransportEmployee ,
    getActiveAccounts, 
    getDeactivatedAccounts};