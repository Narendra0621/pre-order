import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

const RestaurantCard = ({ restaurant, index = 0 }) => {
  const {
    id,
    name,
    description,
    address,
    cuisine,
    rating,
    reviewCount,
    image,
    isOpen,
    closingTime,
    deliveryTime,
    deliveryFee
  } = restaurant;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <Link to={`/restaurant/${id}`} className="block">
        <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={`${name} - Ashlyn Ciara on Unsplash`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              style={{ width: '100%', height: '192px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                isOpen 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {isOpen ? 'Open' : 'Closed'}
              </span>
            </div>

            {/* Cuisine Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                {cuisine}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors duration-200">
                {name}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center space-x-1 text-yellow-400">
                <StarOutlineOutlinedIcon className="w-4 h-4" />
                <span className="text-sm font-medium text-white">{rating}</span>
                <span className="text-xs text-white/60">({reviewCount})</span>
              </div>
            </div>

            <p className="text-white/70 text-sm mb-4 line-clamp-2">
              {description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Delivery Time</span>
                <span className="text-white">{deliveryTime}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Delivery Fee</span>
                <span className="text-white">${deliveryFee}</span>
              </div>
              {!isOpen && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Closes at</span>
                  <span className="text-white">{closingTime}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-white/50">
                📍 {address}
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm font-medium rounded-full hover:from-teal-600 hover:to-blue-600 transition-all duration-200"
              >
                {isOpen ? 'Order Now' : 'View Menu'}
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;