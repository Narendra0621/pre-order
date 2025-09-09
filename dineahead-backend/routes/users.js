// routes/users.js
const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// get my profile
router.get('/me', auth, async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) { next(err); }
});

// update profile (simple)
router.put('/me', auth, async (req, res, next) => {
  try {
    const updates = {};
    ['name','phone'].forEach(k => { if (req.body[k]) updates[k] = req.body[k]; });
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) { next(err); }
});

module.exports = router;
