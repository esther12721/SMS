const router = require('express').Router();
const auth = require('../middleware/auth');
const Warehouse = require('../models/Warehouse');

router.post('/', auth, async (req, res) => {
  try { res.json(await Warehouse.create(req.body)); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.get('/', auth, async (_req, res) => res.json(await Warehouse.find().sort('-createdAt')));
module.exports = router;
