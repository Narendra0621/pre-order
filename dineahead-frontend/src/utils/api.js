import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
})

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

// Restaurant endpoints
export const fetchRestaurants = () => API.get('/restaurants')
export const fetchRestaurantById = (id) => API.get(`/restaurants/${id}`)
export const fetchRestaurantMenu = (restaurantId) => API.get(`/menus/${restaurantId}`)

// Order endpoints
export const fetchOrders = () => API.get('/orders')
export const createOrder = (orderData) => API.post('/orders', orderData)
export const fetchOrderById = (id) => API.get(`/orders/${id}`)
export const updateOrderStatus = (id, status) => API.patch(`/orders/${id}`, { status })

// Cart endpoints
export const fetchCart = () => API.get('/cart')
export const addToCart = (itemData) => API.post('/cart', itemData)
export const updateCartItem = (itemId, quantity) => API.patch(`/cart/${itemId}`, { quantity })
export const removeFromCart = (itemId) => API.delete(`/cart/${itemId}`)
export const clearCart = () => API.delete('/cart')

// User endpoints
export const fetchUserProfile = () => API.get('/users/me')
export const updateUserProfile = (userData) => API.patch('/users/me', userData)

// Menu item endpoints
export const fetchMenuItems = (filters) => API.get('/menus', { params: filters })
export const fetchMenuItemById = (id) => API.get(`/menus/items/${id}`)

export default API
