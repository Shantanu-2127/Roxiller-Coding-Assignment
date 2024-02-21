const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const axios = require('axios');



router.get("/", async (req, res) => {

    const apiURL = [
        'http://localhost:4000/api/statistics',
        'http://localhost:4000/api/bar-chart',
        'http://localhost:4000/api/pie-chart',
    ];
try{
    const responseData = [];

    // Fetch data from each API in parallel
    const apiRequests = apiURL.map(url => axios.get(url));

    // Wait for all requests to complete
    const responses = await Promise.all(apiRequests);

    // Process responses
    responses.forEach(response => {
      responseData.push(response.data);
    });

    // Send combined JSON response
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

module.exports = router;
