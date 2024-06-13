const TransportEmployee = require('../../Admin/models/TransportEmployee');
const RouteChange = require('../model/routeChange');
const Incident = require('../model/Incident');

// Controller to send a taxi to a new route
const sendTaxi = async (req, res) => {
    try {
        const { userId, licensePlate, district, terminal, route } = req.body;

        // Validate request body
        if (!userId || !licensePlate || !district || !terminal || !route) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Fetch the TransportEmployee data associated with the userId
        const transportEmployee = await TransportEmployee.findById(userId);

        if (!transportEmployee) {
            return res.status(404).json({ error: 'TransportEmployee not found' });
        }

        const newRouteChange = new RouteChange({
            SentByEmployee: transportEmployee._id,
            licensePlate,
            district,
            terminal,
            route
        });

        const newSavedRoute = await newRouteChange.save();
        res.status(201).json(newSavedRoute);
    } catch (error) {
        console.error('Error in sendTaxi:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to report an incident
const reportIncident = async (req, res) => {
    try {
        const { userId, licensePlate, incidentType } = req.body;

        // Fetch the TransportEmployee data associated with the userId
        const transportEmployee = await TransportEmployee.findById(userId);

        // Create a new incident
        const incident = new Incident({
            SentByEmployee: transportEmployee._id,
            licensePlate,
            incidentType
        });

        // Save the incident to the database
        await incident.save();

        // Send success response
        res.status(201).json({ message: 'Incident reported successfully', incident });
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to fetch received route change messages
const fetchRouteChangeMessages = async (req, res) => {
    try {
        const { userId } = req.query;
        
        // Log the userId received in the request
        console.log('Received userId:', userId);

        // Fetch the TransportEmployee data associated with the userId to get the terminal
        const transportEmployee = await TransportEmployee.findById(userId);

        // Fetch route change messages with the same terminal as the user
        const routeChanges = await RouteChange.find({ terminal: transportEmployee.Terminal }).populate('SentByEmployee');

        res.status(200).json({ routeChanges });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Controller to fetch received incident messages
const fetchIncidentMessages = async (req, res) => {
    try {
        const { userId } = req.query;

        // Fetch all incident messages except those sent by the user
        const incidents = await Incident.find({ SentByEmployee: { $ne: userId } }).populate('SentByEmployee');

        res.status(200).json({ incidents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    sendTaxi,
    reportIncident,
    fetchRouteChangeMessages,
    fetchIncidentMessages
};
