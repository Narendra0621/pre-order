// routes/cart.js
const express = require('express');
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// get current user's cart
router.get('/', auth, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate({ path: 'items.menuItem' })
      .populate('restaurant');
    res.json(cart || { user: req.user._id, items: [] });
  } catch (err) { next(err); }
});

// add item to cart
router.post('/add', auth, async (req, res, next) => {
  try {
    const { menuItemId, quantity } = req.body;
    if (!menuItemId) return res.status(400).json({ message: 'menuItemId required' });
    const qty = Math.max(1, parseInt(quantity || 1));

    const menuItem = await MenuItem.findById(menuItemId).populate('restaurant');
    if (!menuItem || !menuItem.isAvailable) return res.status(404).json({ message: 'Menu item not available' });

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // create new cart with this restaurant
      cart = new Cart({
        user: req.user._id,
        restaurant: menuItem.restaurant._id,
        items: [{ menuItem: menuItemId, quantity: qty }]
      });
    } else {
      // enforce one-restaurant rule
      if (cart.restaurant.toString() !== menuItem.restaurant._id.toString()) {
        return res.status(400).json({
          message: 'You can only add items from one restaurant per cart. Clear cart to switch restaurants.'
        });
      }
      // add or update item
      const existingIndex = cart.items.findIndex(i => i.menuItem.toString() === menuItemId);
      if (existingIndex > -1) {
        cart.items[existingIndex].quantity += qty;
      } else {
        cart.items.push({ menuItem: menuItemId, quantity: qty });
      }
    }

    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate({ path: 'items.menuItem' });
    await cart.populate('restaurant');
    res.json(cart);
  } catch (err) { next(err); }
});

// update item quantity
router.put('/update/:itemId', auth, async (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (!quantity) return res.status(400).json({ message: 'Quantity required' });
    
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    
    const itemIndex = cart.items.findIndex(i => i.menuItem.toString() === req.params.itemId);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });
    
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate({ path: 'items.menuItem' });
    await cart.populate('restaurant');
    res.json(cart);
  } catch (err) { next(err); }
});

// remove item from cart
router.delete('/remove/:itemId', auth, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    
    cart.items = cart.items.filter(i => i.menuItem.toString() !== req.params.itemId);
    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate({ path: 'items.menuItem' });
    await cart.populate('restaurant');
    res.json(cart);
  } catch (err) { next(err); }
});

// clear cart
router.delete('/clear', auth, async (req, res, next) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: 'Cart cleared' });
  } catch (err) { next(err); }
});

module.exports = router;