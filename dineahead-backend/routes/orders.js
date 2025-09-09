// routes/orders.js
const express = require('express');
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// create order from cart
router.post('/create', auth, async (req, res, next) => {
  try {
    // Optionally accept: payment details, pickup time, special instructions
    const cart = await Cart.findOne({ user: req.user._id }).populate({ path: 'items.menuItem' });
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    // Build items snapshot & total
    let total = 0;
    const orderItems = cart.items.map(it => {
      const price = it.menuItem.price;
      total += price * it.quantity;
      return {
        menuItem: it.menuItem._id,
        quantity: it.quantity,
        priceAtPurchase: price
      };
    });

    // Optionally deduce restaurant: if items from multiple restaurants handle differently.
    // For this design, if items are from multiple restaurants we will not restrict; but we also store first restaurant.
    let restaurant = null;
    if (cart.items.length > 0 && cart.items[0].menuItem.restaurant) {
      restaurant = cart.items[0].menuItem.restaurant;
    }

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount: total,
      restaurant
    });
    await order.save();

    // clear cart
    await Cart.findOneAndDelete({ user: req.user._id });

    await order.populate('items.menuItem').execPopulate?.(); // older mongoose helper, safe if available
    res.status(201).json(order);
  } catch (err) { next(err); }
});

// get orders for current user
router.get('/', auth, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('items.menuItem').populate('restaurant');
    res.json(orders);
  } catch (err) { next(err); }
});

// get single order
router.get('/:id', auth, async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate('items.menuItem').populate('restaurant');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) { next(err); }
});

module.exports = router;
