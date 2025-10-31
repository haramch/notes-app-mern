import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Frontend/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'



export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
