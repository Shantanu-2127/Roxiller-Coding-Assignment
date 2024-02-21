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

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const data = [];
    for (const range of priceRanges) {
      const count = await Transaction.countDocuments({
        dateOfSale: { $gte: startDate, $lt: endDate },
        $expr: {
            $and: [
              { $gte: [{ $toDouble: '$price' }, range.min] }, // Convert price to integer before comparison
              { $lte: [{ $toDouble: '$price' }, range.max] }  // Convert price to integer before comparison
            ]
          }
      });
      data.push({ range: `${range.min}-${range.max}`, count });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
