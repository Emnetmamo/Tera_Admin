// controllers/transportEmployeeController.js

const { body } = require('express-validator');
const TransportEmployee = require('../models/TransportEmployee');
const nodemailer = require('nodemailer');

const generateRandomCredentials = () => {
  //  generate a random username and password to be sent via email
  const username = generateRandomString(8);
  const password = generateRandomString(12);
  return { username, password };
};

const generateRandomString = (length) => {
  // Logic to generate a random string
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const registerTransportEmployees = async (req, res) => {
  try {
    // Extract TransportEmployees data from request body
    const TransportEmployeesData = req.body;

    // Generate random credentials
    const { username, password } = generateRandomCredentials();

    // Add generated username and password to TransportEmployees data
    TransportEmployeesData.username = username;
    TransportEmployeesData.password = password;


    // Save TransportEmployees data to the database
    const newTransportEmployee = new TransportEmployee(TransportEmployeesData);
    await newTransportEmployee.save();

    // Send email with username and password
    sendCredentialsEmail(TransportEmployeesData.email, TransportEmployeesData.fullName, username, password);

    res.status(201).json({ message: 'Transport Employee is registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const sendCredentialsEmail = (email, fullName, username, password) => {
  // Logic to send email with username and password using nodemailer
 
    // Send email notification
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port : 465,
        secure: true,
        logger: true,
        debug: true,
        secureconnection: false,
        auth: {
          user: 'addisababatransportoffice@gmail.com',
          pass: 'csst jisc cfze rqgc',
        },
        tls: {
          rejectUnauthorized: true,
        },
      });

    // email body 
    const mailOptions = {
      from: 'addisababatransportoffice@gmail.com', //email we created to pose as the transport office sent the email
      to: email,
      subject: 'Transport Employee Registration Successful!',
      text: `Dear ${fullName}, you have been registered as a Transport Employee of Tera successfully. Your username is ${username} and your password is: ${password}. Please download the app and log in to your account using the given credentials. If you have any trouble, contact us on +251975649898 or +251941727332.`,
    };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { registerTransportEmployees };
