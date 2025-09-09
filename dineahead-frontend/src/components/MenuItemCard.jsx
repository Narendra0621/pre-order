import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const MenuItemCard = ({ menuItem, onAddToCart, index = 0 }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const {
    id,
    name,
    description,
    price,
    image,
    isAvailable,
    isVegetarian,
    isPopular,
    prepTime,
    calories
  } = menuItem;

  const handleAddToCart = async () => {
    if (!isAvailable) return;
    
    setIsAdding(true);
    try {
      await onAddToCart(menuItem, quantity);
      setQuantity(1); // Reset quantity after adding
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 ${
        !isAvailable ? 'opacity-60' : ''
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={`${name} - Laura Geror on Unsplash`}
          className="w-full h-full object-cover"
          style={{ width: '100%', height: '192px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {isPopular && (
            <span className="px-2 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-xs font-medium">
              Popular
            </span>
          )}
          {isVegetarian && (
            <span className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-medium">
              Vegetarian
            </span>
          )}
        </div>

        {!isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full font-medium">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">
            {name}
          </h3>
          <div className="text-right">
            <div className="text-xl font-bold text-teal-400">
              ${price}
            </div>
          </div>
        </div>

        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Details */}
        <div className="flex items-center justify-between text-xs text-white/60 mb-4">
          <span>⏱️ {prepTime}</span>
          <span>🔥 {calories} cal</span>
        </div>

        {/* Add to Cart Section */}
        {isAvailable && (
          <div className="flex items-center justify-between">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={decrementQuantity}
                className="w-8 h-8 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:border-white/40 transition-colors duration-200"
              >
                <RemoveOutlinedIcon className="w-4 h-4" />
              </motion.button>
              
              <span className="text-white font-medium min-w-[2rem] text-center">
                {quantity}
              </span>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={incrementQuantity}
                className="w-8 h-8 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:border-white/40 transition-colors duration-200"
              >
                <AddOutlinedIcon className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm font-medium rounded-full hover:from-teal-600 hover:to-blue-600 transition-all duration-200 flex items-center space-x-2 ${
                isAdding ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <AddOutlinedIcon className="w-4 h-4" />
              <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MenuItemCard;