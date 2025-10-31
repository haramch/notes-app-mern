import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../../Components/Header'
import axios from 'axios'
import { useAuthContext } from '../../../contexts/AuthContext'

const initialState = { email: "", password: "" }

export default function Login() {
  const [login, setLogin] = useState(initialState)
  const [message, setMessage] = useState("")
  const { storeToken } = useAuthContext()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    const { email, password } = login

    if (!email || !password) {
      setMessage("Please enter both Email and Password")
      return
    }

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_HOST}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      )

      console.log("Login response:", result.data)

      if (result.data.message.toLowerCase().includes("success")) {
        const { token } = result.data
        storeToken(token)
        setMessage("Login successful")
        setTimeout(() => navigate("/dashboard"), 500)
      } else {
        setMessage(result.data.message)
      }

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message)
      setMessage(error.response?.data?.message || "Server error")
    }
  }

  return (
    <div>
      <Header />
      <div className='w-full min-h-screen bg-gray-100 flex justify-center items-center p-2.5 sm:p-5'>
        <form
          className='w-full max-w-[500px] bg-white flex flex-col gap-4 p-6 rounded-xl shadow-xl'
          onSubmit={handleSubmit}
        >
          <h1 className='text-xl font-bold text-gray-800'>Sign In</h1>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-gray-700'>Email</label>
            <input
              type="email"
              name='email'
              value={login.email}
              placeholder="Enter email"
              className="w-full border border-gray-300 text-sm focus:outline-none p-2"
              onChange={handleLogin}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-gray-700'>Password</label>
            <input
              type="password"
              name='password'
              placeholder="Enter password"
              value={login.password}
              className="w-full border border-gray-300 text-sm focus:outline-none p-2"
              onChange={handleLogin}
            />
          </div>

          {message && (
            <div className='text-center text-sm font-semibold text-red-600'>
              {message}
            </div>
          )}

          <button
            className="flex justify-center items-center gap-2 bg-blue-700 text-white p-3 mt-2 text-sm font-bold transition-all duration-150 ease-linear hover:opacity-80 rounded-md"
            type='submit'
          >
            Login
          </button>

          <p className='text-sm text-gray-700 mt-4 text-center'>
            Not registered yet?{" "}
            <Link to="/signup" className="font-medium underline text-blue-600">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
