const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

router.get("/", async (req, res) => {
  try {
    const selectedMonth = req.query.month; // assuming the month is passed as a query parameter

    const startDate = new Date(selectedMonth);
    const endDate = new Date(selectedMonth);
    endDate.setMonth(endDate.getMonth() + 1);

    const data = await Transaction.aggregate([
        {
          $match: {
            dateOfSale: { $gte: startDate, $lt: endDate }
          }
        },
        {
          $group: {
            _id: '$category',
            count: { $sum : 1 }
          }
        }
      ]);

      const formattedData = data.map(item => ({
        category: item._id,
        count: item.count
      }));
      res.json(formattedData);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
