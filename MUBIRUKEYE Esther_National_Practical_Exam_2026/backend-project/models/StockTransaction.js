const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  productId: String,
  transactionType: String, // IN or OUT
  quantityMoved: Number,

  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('StockTransaction', transactionSchema);