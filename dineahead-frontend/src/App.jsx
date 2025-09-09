import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Restaurant from './pages/Restaurant'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import { AuthProvider } from './utils/auth'
import './styles/index.css'

export default function App(){
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <nav className="container flex items-center justify-between py-4">
          <Link to="/" className="text-xl font-bold">dineAhead</Link>
          <div className="flex gap-3">
            <Link to="/orders" className="glass px-3 py-2 rounded-full">Orders</Link>
            <Link to="/cart" className="glass px-3 py-2 rounded-full">Cart</Link>
            <Link to="/login" className="glass px-3 py-2 rounded-full">Login</Link>
          </div>
        </nav>
        <main className="container">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/restaurant/:id" element={<Restaurant/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/orders" element={<Orders/>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}
