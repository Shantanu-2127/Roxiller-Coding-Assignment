const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/Transaction');

// Middleware
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());


// Routes
const initializeDatabaseRoute = require('./frontend/routes/initializeDatabase');
const transactionsRoute = require('./frontend/routes/transactionsRoute');
const statisticsRoute = require('./frontend/routes/statisticsRoute');
const barChartRoute = require('./frontend/routes/barChart');
const pieChartRoute = require('./frontend/routes/pieChart');
const combinedResponseRoute = require('./frontend/routes/combined');

app.use('/api/initialize-database', initializeDatabaseRoute);
app.use('/api/transactions', transactionsRoute);
app.use('/api/statistics', statisticsRoute);
app.use('/api/bar-chart', barChartRoute);
app.use('/api/pie-chart', pieChartRoute);
app.use('/api/combined', combinedResponseRoute);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${ PORT }`);
});