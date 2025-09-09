import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import RestaurantCard from '../components/RestaurantCard';
import { fetchRestaurants } from '../utils/api';

const LandingPage = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedRestaurants = async () => {
      try {
        const response = await fetchRestaurants();
        // Get top 3 restaurants by rating
        const sorted = response.data.sort((a, b) => b.rating - a.rating);
        setFeaturedRestaurants(sorted.slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedRestaurants();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Restaurants Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Featured <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Restaurants</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover the most popular restaurants in your area and start pre-ordering your favorite meals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <>
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="glass rounded-xl p-6 border border-white/10">
                    <div className="animate-pulse">
                      <div className="w-full h-48 bg-white/10 rounded-lg mb-4"></div>
                      <div className="h-6 bg-white/10 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-white/10 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              featuredRestaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  index={index}
                />
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="/restaurants"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 glass border border-white/20 text-white font-semibold rounded-full text-lg hover:bg-white/10 transition-all duration-300"
            >
              View All Restaurants
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              How It <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Three simple steps to skip the wait and enjoy your meal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Browse & Choose',
                description: 'Explore restaurants near you and browse their menus to find your favorite dishes',
                icon: '🍽️'
              },
              {
                step: '02',
                title: 'Pre-Order',
                description: 'Place your order in advance and customize it exactly how you like it',
                icon: '📱'
              },
              {
                step: '03',
                title: 'Skip the Wait',
                description: 'Arrive at the restaurant and your food will be ready for pickup or enjoy at your reserved table',
                icon: '⚡'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="glass rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="text-6xl mb-6">{item.icon}</div>
                  <div className="text-sm font-bold text-teal-400 mb-2">STEP {item.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 border border-white/10"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Dine Ahead</span>?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of food lovers who are already saving time and enjoying better dining experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/auth/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-full text-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-300"
              >
                Get Started Free
              </motion.a>
              <motion.a
                href="/restaurants"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass border border-white/20 text-white font-semibold rounded-full text-lg hover:bg-white/10 transition-all duration-300"
              >
                Browse Restaurants
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;