// routes/restaurants.js
const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// create restaurant (for now open to anyone; add admin checks later)
router.post('/', async (req, res, next) => {
  try {
    const { name, description, address, phone } = req.body;
    if (!name) return res.status(400).json({ message: 'Restaurant name required' });
    const r = new Restaurant({ name, description, address, phone });
    await r.save();
    res.status(201).json(r);
  } catch (err) { next(err); }
});

// list restaurants
router.get('/', async (req, res, next) => {
  try {
    const list = await Restaurant.find().sort({ name: 1 });
    res.json(list);
  } catch (err) { next(err); }
});

// get single restaurant
router.get('/:id', async (req, res, next) => {
  try {
    const r = await Restaurant.findById(req.params.id);
    if (!r) return res.status(404).json({ message: 'Not found' });
    res.json(r);
  } catch (err) { next(err); }
});

// update
router.put('/:id', async (req, res, next) => {
  try {
    const r = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!r) return res.status(404).json({ message: 'Not found' });
    res.json(r);
  } catch (err) { next(err); }
});

// delete
router.delete('/:id', async (req, res, next) => {
  try {
    const r = await Restaurant.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
