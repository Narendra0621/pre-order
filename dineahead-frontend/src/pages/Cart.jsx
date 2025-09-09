import React, { useEffect, useState } from 'react'
import API from '../utils/api'
import { useNavigate } from 'react-router-dom'

export default function Cart(){
  const [cart, setCart] = useState({ items: [] })
  const nav = useNavigate()

  useEffect(()=>{ fetch() },[])

  async function fetch(){
    try{
      const res = await API.get('/cart')
      setCart(res.data || { items: [] })
    }catch(e){ console.error(e) }
  }

  async function update(itemId, qty){
    try{
      await API.post('/cart/update', { menuItemId: itemId, quantity: qty })
      fetch()
    }catch(e){ alert(e?.response?.data?.message || 'Update failed') }
  }

  async function clearCart(){
    try{
      await API.delete('/cart/clear')
      setCart({ items: [] })
    }catch(e){ alert('Could not clear') }
  }

  async function checkout(){
    try{
      await API.post('/orders/create')
      alert('Order placed')
      nav('/orders')
    }catch(e){ alert(e?.response?.data?.message || 'Checkout failed') }
  }

  const total = cart.items.reduce((s,it)=> s + (it.menuItem?.price || 0) * it.quantity, 0)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      <div className="glass p-4 rounded-xl">
        {cart.items.length===0 ? <div className="text-gray-400">Cart is empty</div> :
          <>
            {cart.items.map(it=>(
              <div key={it.menuItem._id} className="flex items-center justify-between py-2 border-b border-white/6">
                <div>
                  <div className="font-semibold">{it.menuItem.name}</div>
                  <div className="text-sm text-gray-300">₹{it.menuItem.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="glass px-3 rounded-full" onClick={()=>update(it.menuItem._id, it.quantity-1)}>-</button>
                  <div>{it.quantity}</div>
                  <button className="glass px-3 rounded-full" onClick={()=>update(it.menuItem._id, it.quantity+1)}>+</button>
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-between items-center">
              <div className="font-semibold">Total: ₹{total.toFixed(2)}</div>
              <div className="flex gap-3">
                <button onClick={clearCart} className="glass px-4 py-2 rounded-full">Clear</button>
                <button onClick={checkout} className="btn btn-primary">Checkout</button>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}
