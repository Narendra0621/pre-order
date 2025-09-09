// models/Restaurant.js
const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  address: { type: String },
  phone: { type: String },
  // optionally owner/admin field later
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
