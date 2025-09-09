import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../utils/api'
import { AuthContext } from '../../utils/auth'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const res = await API.post('/auth/register', { name, email, password })
      login(res.data.token, res.data.user)
      nav('/')
    }catch(err){ alert(err?.response?.data?.message || 'Register failed') }
  }

  return (
    <div className="max-w-md mx-auto glass p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="p-3 rounded-md bg-transparent border border-white/6" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-3 rounded-md bg-transparent border border-white/6" />
        <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="p-3 rounded-md bg-transparent border border-white/6" />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  )
}
