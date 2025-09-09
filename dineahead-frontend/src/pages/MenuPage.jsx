import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../utils/auth';
import MenuItemCard from '../components/MenuItemCard';
import { fetchRestaurantById, fetchRestaurantMenu, addToCart } from '../utils/api';
import toast from 'react-hot-toast';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

const MenuPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

  useEffect(() => {
    fetchRestaurantAndMenu();
  }, [id]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === selectedCategory));
    }
  }, [menuItems, selectedCategory]);

  const fetchRestaurantAndMenu = async () => {
    try {
      const [restaurantResponse, menuResponse] = await Promise.all([
        fetchRestaurantById(id),
        fetchRestaurantMenu(id)
      ]);
      
      setRestaurant(restaurantResponse.data);
      setMenuItems(menuResponse.data);
      setFilteredItems(menuResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load restaurant menu');
      setLoading(false);
    }
  };

  const handleAddToCart = async (menuItem, quantity) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await addToCart({ 
        menuItemId: menuItem.id, 
        quantity,
        restaurantId: id
      });
      toast.success(`Added ${menuItem.name} to cart!`);
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to add item to cart';
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Restaurant not found</h2>
          <p className="text-white/70 mb-6">The restaurant you're looking for doesn't exist.</p>
          <Link
            to="/restaurants"
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-full hover:from-teal-600 hover:to-blue-600 transition-all duration-200"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            to="/restaurants"
            className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200"
          >
            <ArrowBackOutlinedIcon className="w-5 h-5" />
            <span>Back to Restaurants</span>
          </Link>
        </motion.div>

        {/* Restaurant Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl p-8 mb-8 border border-white/10"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <img
                src={restaurant.image}
                alt={`${restaurant.name} - Ashlyn Ciara on Unsplash`}
                className="w-full h-48 lg:h-32 object-cover rounded-xl"
                style={{ width: '100%', height: '192px' }}
              />
            </div>
            <div className="lg:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
                  <p className="text-white/70 mb-2">{restaurant.description}</p>
                  <p className="text-white/60 text-sm">📍 {restaurant.address}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                    <StarOutlineOutlinedIcon className="w-5 h-5" />
                    <span className="text-lg font-semibold text-white">{restaurant.rating}</span>
                    <span className="text-sm text-white/60">({restaurant.reviewCount} reviews)</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    restaurant.isOpen 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {restaurant.isOpen ? 'Open' : 'Closed'}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Cuisine</span>
                  <div className="text-white font-medium">{restaurant.cuisine}</div>
                </div>
                <div>
                  <span className="text-white/60">Delivery Time</span>
                  <div className="text-white font-medium">{restaurant.deliveryTime}</div>
                </div>
                <div>
                  <span className="text-white/60">Delivery Fee</span>
                  <div className="text-white font-medium">${restaurant.deliveryFee}</div>
                </div>
                <div>
                  <span className="text-white/60">Min Order</span>
                  <div className="text-white font-medium">${restaurant.minimumOrder}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                    : 'glass border border-white/20 text-white/70 hover:text-white hover:border-white/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Menu Items */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <MenuItemCard
                key={item.id}
                menuItem={item}
                onAddToCart={handleAddToCart}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-white mb-2">No items found</h3>
            <p className="text-white/70 mb-6">
              No menu items available in the {selectedCategory.toLowerCase()} category
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-full hover:from-teal-600 hover:to-blue-600 transition-all duration-200"
            >
              View All Items
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;