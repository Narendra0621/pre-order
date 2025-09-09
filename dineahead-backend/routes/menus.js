// routes/menus.js
const express = require('express');
const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// add menu item to restaurant
router.post('/:restaurantId/items', async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, price, category, isAvailable } = req.body;
    const rest = await Restaurant.findById(restaurantId);
    if (!rest) return res.status(404).json({ message: 'Restaurant not found' });
    const item = new MenuItem({ restaurant: restaurantId, name, description, price, category, isAvailable });
    await item.save();
    res.status(201).json(item);
  } catch (err) { next(err); }
});

// list items for a restaurant
router.get('/:restaurantId/items', async (req, res, next) => {
  try {
    const list = await MenuItem.find({ restaurant: req.params.restaurantId, isAvailable: true }).sort({ name: 1 });
    res.json(list);
  } catch (err) { next(err); }
});

// get single item
router.get('/item/:id', async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
});

// update item
router.put('/item/:id', async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
});

// delete item
router.delete('/item/:id', async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
