const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
    try {
        const selectedMonth = req.query.month; // assuming the month is passed as a query parameter
    
        const startDate = new Date(selectedMonth);
        const endDate = new Date(selectedMonth);
        endDate.setMonth(endDate.getMonth() + 1);
    
        const totalSaleAmount = await Transaction.aggregate([
          {
            $match: {
              dateOfSale: {
                $gte: startDate,
                $lt: endDate,
              },
              sold: true,
            },
          },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: { $toDouble: '$price' } },
            },
          },
        ]);
    
        const totalSoldItems = await Transaction.countDocuments({
          dateOfSale: {
            $gte: startDate,
            $lt: endDate,
          },
          sold: true,
        });
    
        const totalUnsoldItems = await Transaction.countDocuments({
          dateOfSale: {
            $gte: startDate,
            $lt: endDate,
          },
          sold: false,
        });
    
        res.status(200).json({
          totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
          totalSoldItems,
          totalUnsoldItems,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

module.exports = router;
