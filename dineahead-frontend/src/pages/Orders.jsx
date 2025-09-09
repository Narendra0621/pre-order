import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchOrders } from '../utils/api'
import { motion } from 'framer-motion'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    try {
      const response = await fetchOrders()
      setOrders(response.data)
    } catch (e) {
      console.error('Error fetching orders:', e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Your <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Orders</span>
          </h1>
          <p className="text-white/70">Track and manage your orders</p>
        </motion.div>

        <div className="space-y-4">
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-white mb-2">No orders yet</h3>
              <p className="text-white/70 mb-6">Start ordering your favorite meals!</p>
              <Link
                to="/restaurants"
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-full hover:from-teal-600 hover:to-blue-600 transition-all duration-200"
              >
                Browse Restaurants
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-xl border border-white/10"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-white font-semibold text-lg">Order #{order._id.slice(-6)}</div>
                      <div className="text-white/60">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : order.status === 'cancelled'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.menuItem._id} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-2">
                          <div className="text-white">{item.menuItem.name}</div>
                          <div className="text-white/60">×{item.quantity}</div>
                        </div>
                        <div className="text-white font-medium">
                          ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center">
                    <div className="text-white/60">Total Amount</div>
                    <div className="text-white font-semibold text-lg">
                      ${order.totalAmount.toFixed(2)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
