const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const search = req.query.search || '';
        const month = req.query.month || ''; // Include month from query
    
        const query = {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } },
          ],
        };
    
        const transactions = await Transaction.find(query)
          .skip((page - 1) * perPage)
          .limit(perPage);
    
        res.status(200).json(transactions );
      } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

module.exports = router;
