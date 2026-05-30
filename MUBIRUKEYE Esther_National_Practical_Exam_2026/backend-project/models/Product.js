const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productCode: String,
  productName: String,
  category: String,
  quantityInStock: Number,
  unitPrice: Number,

  costPrice: Number,
  sellingPrice: Number,
});

module.exports = mongoose.model('Product', productSchema);