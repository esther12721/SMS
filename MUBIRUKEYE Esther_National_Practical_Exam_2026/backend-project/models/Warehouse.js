const mongoose = require('mongoose');
module.exports = mongoose.model('Warehouse', new mongoose.Schema({
  warehouseCode: { type: String, unique: true, required: true },
  warehouseName: { type: String, required: true },
  warehouseLocation: String
}, { timestamps: true }));
