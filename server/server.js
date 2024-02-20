const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');


//route imports 
const adminRoutes = require('./Admin/routes/registerRoutes');
const authRoutes = require('./Admin/routes/authRoutes');
const sidebarRoutes = require('./Admin/routes/sidebarRoutes');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;


//  middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Check MongoDB connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Set up static directory for uploads
app.use('/uploads', express.static('uploads'));


 //Admin Routes 
app.use('/api/admin', adminRoutes); // Register routes 
app.use('/api/auth', authRoutes); // Login routes
app.use('/api/sidebar', sidebarRoutes);  //sidebar routes


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
