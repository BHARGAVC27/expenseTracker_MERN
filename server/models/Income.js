const mongoose = require('mongoose');

// Define the Income schema
const IncomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically sets the current date
  },
});

// Create the Income model
const Income = mongoose.model('Income', IncomeSchema);

module.exports = Income;