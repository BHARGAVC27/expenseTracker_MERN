const mongoose = require('mongoose');

//Schema Design
const BudgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Automatically sets the current date
    }
});

module.exports = mongoose.model('Budget', BudgetSchema);

