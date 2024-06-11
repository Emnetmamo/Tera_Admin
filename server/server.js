const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');


//Admin Dashboard route imports 
const adminRoutes = require('./Admin/routes/registerRoutes');
const authRoutes = require('./Admin/routes/authRoutes');
const sidebarRoutes = require('./Admin/routes/sidebarRoutes');
const dashboardRoutes = require('./Admin/routes/dashboardRoutes');
const transportEmployeeRoutes = require('./Admin/routes/transportEmployeeRoutes');
const EmployeeDataRoutes = require ('./Admin/routes/employeeDataRoutes')
const transportEmployeeAccountsRoutes = require('./Admin/routes/accountsRoutes');
const driverDataRoutes = require('./Admin/routes/driversDataRoutes');
const assignEmployeeRoutes = require('./Admin/routes/assignEmployeeRoutes');
const notificationroute=require('./Admin/routes/notificationRoutes');
const ComplaintsReplyRoutes = require('./Admin/routes/complaintReplyRoutes');
const tapelaChangeRoutes= require('./Admin/routes/tapelachangeroute');


// const assignEmployeeRoutes = require('./Admin/routes/assignEmployeeRoutes')
// const notificationroute=require('./Admin/routes/notificationRoutes')
// const assignEmployeeRoutes = require('./Admin/routes/assignEmployeeRoutes')
// const notificationroute=require('./Admin/routes/notificationRoutes')
const updateroute = require('./Admin/routes/updateroute');

//Transport Employee App Routes imports 
const appAuthRoutes = require('./TransportEmployee/routes/authRoutes');
const profileRoutes = require('./TransportEmployee/routes/profileRoutes');
const attendanceRoutes = require('./TransportEmployee/routes/attendanceRoutes');
const punishmentRoutes = require('./TransportEmployee/routes/punishmentRoutes');
const complaintsRoutes = require ('./TransportEmployee/routes/complaintRoutes');
const warningRoutes = require('./TransportEmployee/routes/warningRoutes');
const dailyReportRoutes = require('./TransportEmployee/routes/dailyReportRoutes');
const notificationRoutes = require('./TransportEmployee/routes/notificationRoutes');
const employeeCommRoutes = require('./TransportEmployee/routes/employeeComRoutes');


//Taxi Driver App Routes imports
const { Server } = require('http');
const driverRoutes = require('./Driver/routes/authroute');
const driverupdateRoutes = require('./Driver/routes/dprofileRoutes');
const paymentRoutes = require('./Driver/routes/paymentroute');
// const warningRoutes = require('./TransportEmployee/routes/warningRoutes');
const complaintroutes = require('./Driver/routes/complaintroute');



// Passenger App Routes imports
const passengerRoutes = require('./Passenger/routes/registerRoute');
const passengerAuthRoutes= require('./Passenger/routes/loginRoutes');
const passengerProfileRoutes = require('./Passenger/routes/profileRoutes');
const passengerComplaintRoutes = require('./Passenger/routes/PassengerComplaintRoutes');
const passengerNotificationRoutes = require('./Passenger/routes/notificationRoutes');



// ESP32 route imports

const ESP32Routes = require('./ESP32/routes/QrRoutes');

dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 5000;


//  middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Check MongoDB connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


 ////////    Admin Routes     /////

// Set up static directory for uploads for Admin
app.use('/uploads', express.static('uploads'));

app.use('/api/admin', adminRoutes); // Register routes 
app.use('/api/auth', authRoutes); // Login routes
app.use('/api/sidebar', sidebarRoutes);  //sidebar routes
app.use('/api/dashboard', dashboardRoutes); //dashboard routes
app.use('/api/transportEmployee', transportEmployeeRoutes); // transport Employee Registration routes
app.use('/api/transportEmployee/Datas',EmployeeDataRoutes); // transport Employee data routes
app.use('/api/transportEmployee/accounts', transportEmployeeAccountsRoutes); // transport Employee Account routes
app.use('/api/driver/TaxiDriverData', driverDataRoutes); // Driver data fetch to admin routes
app.use('/api/assignTransportEmployee', assignEmployeeRoutes);// Assign Transport Employee to Taxi Drivers Routes
app.use('/api/notifications',notificationroute);
app.use('/api/complaints', ComplaintsReplyRoutes); // Give reply to the complaints of rivers and Employees Routes
app.use('/api/admin/update',updateroute);
app.use('/api/tapelachange',tapelaChangeRoutes);

///////    Transport Employee Mobilee app Routes    //////

//Set up static files  directory
app.use('/TransportEmployee/uploads', express.static(path.join(__dirname, 'TransportEmployee/uploads')));

 app.use('/mobileApp/api/auth', appAuthRoutes); // Login routes
 app.use('/mobileApp/api/profile', profileRoutes) // profile related routes 
 app.use('/mobileApp/api/attendance',attendanceRoutes); // Attendance related routes
 app.use('/mobileApp/api/punishment',punishmentRoutes) // Punishment related routes
 app.use('/mobileApp/api/complaint',complaintsRoutes) // complaint related routes
 app.use('/mobileApp/api/warning',warningRoutes) // warning related routes
 app.use('/mobileApp/api/dailyReport',dailyReportRoutes) // daily Report related routes
 app.use('/mobileApp/api/notifications',notificationRoutes) // Notification related routes 
 app.use('/mobileApp/api/employeeComm',employeeCommRoutes) // Employee Comm related routes 
 

 
 /////////   Taxi Drivers Mobile App Routes   ////////////

app.use('/api/driver', driverRoutes); // Driver Registration routes
app.use('/api/driver/update', driverupdateRoutes); // Driver Profile Update routes
app.use('/api/driver/payment', paymentRoutes); // Payment routes
app.use('/api/driver/warning', warningRoutes); // Warning routes
app.use('/api/driver/complaint', complaintroutes); // Complaint routes



/// Passenger Mobile App  Routes //////


app.use('/Passenger/uploads', express.static(path.join(__dirname, 'Passenger/uploads')));

app.use('/api/Passenger', passengerRoutes); // Passenger Registration routes
app.use('/api/Passenger/auth', passengerAuthRoutes); // Passenger Login routes
app.use('/api/Passenger/Profile', passengerProfileRoutes);  // Passenger Profile routes
app.use('/api/Passenger/complaints', passengerComplaintRoutes); // Passenger Complaints routes
app.use('/api/Passenger/notification', passengerNotificationRoutes); // Passenger Notification routes



// ESP32 Connection 
app.use('/api/ESP32', ESP32Routes); // ESP32 routes
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});