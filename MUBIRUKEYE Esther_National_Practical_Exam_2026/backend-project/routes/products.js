const router = require('express').Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');

router.post('/', auth, async (req, res) => {
  try { res.json(await Product.create(req.body)); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.get('/', auth, async (_req, res) => res.json(await Product.find().sort('-createdAt')));
module.exports = router;
