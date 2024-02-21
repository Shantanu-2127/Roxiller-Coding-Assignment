const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        // Fetch JSON from the third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;

        // Initialize the database with seed data
        await Transaction.insertMany(data);

        res.json({ success: true, message: 'Database initialized successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;