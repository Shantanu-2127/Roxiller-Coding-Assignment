const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    // Define your transaction schema based on your JSON structure
    // Example: title, description, price, dateOfSale, category, etc.
    id : Number,
    title : String,
    description : String,
    price : String,
    category : String,
    image: String,
    sold : Boolean,
    dateOfSale : Date,
});

module.exports = mongoose.model('Transaction', transactionSchema);