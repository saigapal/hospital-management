const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./routes/api');
const usersRoutes = require('./routes/users');
const doctorsRoutes = require('./routes/doctors');
const patientsRoutes = require('./routes/patients');
const appointmentsRoutes = require('./routes/appointments');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });

// Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use(bodyParser.json());

// Existing API
app.use('/api', routes);

// Hospital Management APIs
app.use('/api/users', usersRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/appointments', appointmentsRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        error: err.message || 'Internal Server Error'
    });
});

// Serve React frontend
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Handle React routes
app.get('*', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'client', 'dist', 'index.html')
    );
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});