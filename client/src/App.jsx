import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Frontend/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import HeroImg from './Components/HeroImg'
import PrivateRoute from './Components/PrivateRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<HeroImg/>} />
          <Route path='/dashboard' element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
      <ToastContainer position='top-left' />
    </div>
  )
}
