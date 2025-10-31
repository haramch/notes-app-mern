import React, { use, useState } from 'react'
import Cards from '../Cards'
import {useNavigate} from 'react-router-dom'
import SearchBar from '../SearchBar'

export default function Header() {
  const [searchQuery, setSearchQuery]=useState("")
  const navigate=useNavigate()
  const handleSearch=()=>
  {

  }
 const onClearSearch=()=>
 {
  setSearchQuery("")
 }

  const onLogout=()=>
  {
    navigate("/login")
  }
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-2xl'>
      <h2 className='text-xl font-medium  text-gray-900 py-2'>Notes</h2>  
      <SearchBar value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} handleSearch={handleSearch} onClearSearch={onClearSearch}/>
      <Cards onLogout={onLogout}/>        
    </div>
  )
}
