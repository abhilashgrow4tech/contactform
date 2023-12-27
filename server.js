// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

// Initialize express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Data storage (In-memory for simplicity)
let contacts = [];

// Routes
app.get('/contacts', (req, res) => {
 res.status(200).json(contacts);
});

app.post('/contacts', (req, res) => {
 const newContact = {
    id: contacts.length + 1,
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
 };

 contacts.push(newContact);
 res.status(201).json(newContact);
});

app.put('/contacts/:id', (req, res) => {
 const contact = contacts.find(c => c.id === parseInt(req.params.id));

 if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
 }

 contact.name = req.body.name;
 contact.email = req.body.email;
 contact.message = req.body.message;

 res.status(200).json(contact);
});

app.delete('/contacts/:id', (req, res) => {
 const contact = contacts.find(c => c.id === parseInt(req.params.id));

 if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
 }

 const index = contacts.indexOf(contact);
 contacts.splice(index, 1);

 res.status(200).json({ message: 'Contact deleted successfully' });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));