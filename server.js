const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the form HTML (optional, if hosting the form)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle form submission
app.post('/listyourproperty', (req, res) => {
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
