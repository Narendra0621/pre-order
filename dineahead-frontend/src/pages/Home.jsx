import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import API from '../utils/api'
import { AuthContext } from '../utils/auth'

export default function Home(){
  const [restaurants, setRestaurants] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(()=>{ fetchRestaurants() },[])

  async function fetchRestaurants(){
    try{
      const res = await API.get('/restaurants')
      setRestaurants(res.data)
    }catch(e){ console.error(e) }
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Pick a restaurant</h1>
        <p className="text-sm text-gray-300">Pre-order your meal and skip the wait.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurants.map(r=>(
          <Link to={`/restaurant/${r._id}`} key={r._id} className="glass p-4 rounded-xl hover:scale-[1.01] transition">
            <h3 className="text-xl font-semibold">{r.name}</h3>
            <p className="text-sm text-gray-300 mt-1">{r.description}</p>
            <div className="mt-3 text-xs text-gray-400">{r.address}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
