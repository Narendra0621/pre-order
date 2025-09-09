import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import API from '../utils/api'
import { AuthContext } from '../utils/auth'

export default function Restaurant(){
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [items, setItems] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(()=>{ fetch(); },[id])

  async function fetch(){
    try{
      const [rRes, mRes] = await Promise.all([
        API.get(`/restaurants/${id}`),
        API.get(`/menus/${id}/items`)
      ])
      setRestaurant(rRes.data)
      setItems(mRes.data)
    }catch(e){ console.error(e) }
  }

  async function add(itemId){
    try{
      await API.post('/cart/add', { menuItemId: itemId, quantity: 1 })
      alert('Added to cart')
    }catch(err){
      const msg = err?.response?.data?.message || 'Could not add to cart'
      alert(msg)
    }
  }

  return (
    <div>
      {!restaurant ? <div>Loading...</div> : (
        <>
          <div className="glass p-6 rounded-xl mb-6">
            <h2 className="text-2xl font-bold">{restaurant.name}</h2>
            <p className="text-sm text-gray-300">{restaurant.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map(it=>(
              <div key={it._id} className="glass p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{it.name}</div>
                    <div className="text-sm text-gray-300">{it.description}</div>
                    <div className="mt-2 text-sm font-medium">₹ {it.price}</div>
                  </div>
                  <div>
                    <button onClick={()=>add(it._id)} className="btn btn-primary">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
