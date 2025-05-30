const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail address
    pass: 'your-email-password', // Replace with your Gmail app password
  },
});

// Endpoint to handle property listing form submission
app.post('/list-property', (req, res) => {
  const { title, location, price, propertyType, bedrooms, description } = req.body;

  // Validate input
  if (!title || !location || !price || !propertyType || !bedrooms || !description) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  // Create property object
  const newProperty = {
    id: Date.now(), // Unique ID based on timestamp
    title,
    location,
    price: Number(price),
    propertyType,
    bedrooms: Number(bedrooms),
    description,
  };

  // Read existing data and append the new property
  const filePath = path.join(__dirname, 'properties.json');
  let properties = [];
  if (fs.existsSync(filePath)) {
    properties = JSON.parse(fs.readFileSync(filePath));
  }
  properties.push(newProperty);

  // Save updated data to the file
  fs.writeFileSync(filePath, JSON.stringify(properties, null, 2));

  // Respond to the client
  res.status(201).json({ message: 'Property listed successfully!', property: newProperty });
});

// Endpoint to send support messages
app.post('/send-support-message', (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  // Mail options
  const mailOptions = {
    from: email,
    to: 'your-email@gmail.com', // Replace with your Gmail address
    subject: `Support Request from ${name}`,
    text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send email. Try again later.' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Your message has been sent successfully!' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
