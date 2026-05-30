const router = require('express').Router();
const auth = require('../middleware/auth');
const Tx = require('../models/StockTransaction');
const Product = require('../models/Product');

// STOCK LIST
router.get('/stock', auth, async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SUMMARY
router.get('/summary', auth, async (req, res) => {
  try {
    const { period = 'daily' } = req.query;

    const now = new Date();
    let start = new Date();

    if (period === 'daily') start.setHours(0, 0, 0, 0);
    if (period === 'weekly') start.setDate(now.getDate() - 7);
    if (period === 'monthly') start.setMonth(now.getMonth() - 1);

    const txs = await Tx.find({
      transactionDate: { $gte: start },
    });

    const stockIn = txs
      .filter(t => t.transactionType === 'IN')
      .reduce((a, b) => a + b.quantityMoved, 0);

    const stockOut = txs
      .filter(t => t.transactionType === 'OUT')
      .reduce((a, b) => a + b.quantityMoved, 0);

    res.json({
      period,
      stockIn,
      stockOut,
      transactions: txs,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;