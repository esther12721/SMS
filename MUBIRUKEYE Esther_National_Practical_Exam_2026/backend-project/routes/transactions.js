const router = require('express').Router();
const auth = require('../middleware/auth');
const Tx = require('../models/StockTransaction');
const Product = require('../models/Product');

// CREATE
router.post('/', auth, async (req, res) => {
  try {
    const tx = await Tx.create(req.body);
    // adjust stock
    const delta = (tx.transactionType === 'IN' ? 1 : -1) * tx.quantityMoved;
    await Product.findOneAndUpdate({ productCode: tx.productCode }, { $inc: { quantityInStock: delta } });
    res.json(tx);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

// READ
router.get('/', auth, async (_req, res) => res.json(await Tx.find().sort('-transactionDate')));
router.get('/:id', auth, async (req, res) => res.json(await Tx.findById(req.params.id)));

// UPDATE
router.put('/:id', auth, async (req, res) => {
  try {
    const old = await Tx.findById(req.params.id);
    if (!old) return res.status(404).json({ message: 'Not found' });
    // revert old effect
    const revert = (old.transactionType === 'IN' ? -1 : 1) * old.quantityMoved;
    await Product.findOneAndUpdate({ productCode: old.productCode }, { $inc: { quantityInStock: revert } });
    const updated = await Tx.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const delta = (updated.transactionType === 'IN' ? 1 : -1) * updated.quantityMoved;
    await Product.findOneAndUpdate({ productCode: updated.productCode }, { $inc: { quantityInStock: delta } });
    res.json(updated);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  const tx = await Tx.findByIdAndDelete(req.params.id);
  if (tx) {
    const revert = (tx.transactionType === 'IN' ? -1 : 1) * tx.quantityMoved;
    await Product.findOneAndUpdate({ productCode: tx.productCode }, { $inc: { quantityInStock: revert } });
  }
  res.json({ message: 'Deleted' });
});

module.exports = router;
