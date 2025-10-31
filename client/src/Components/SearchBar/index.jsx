import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6';
import {IoMdClose} from 'react-icons/io';

export default function SearchBar({value, onChange, handleSearch, onClearSearch}) {
  return (
    <div className='flex w-80 items-center justify-center rounded-md bg-gray-100 px-4'>
     <input type="text" placeholder='Search Notes' className='w-full text-xs py-3 outline-none'
     value={value} onChange={onChange}
      />
      {value && (
        <IoMdClose size={20} className="text-gray-600 cursor-pointer hover:text-blue-500" onClick={onClearSearch} />
      )}

      <FaMagnifyingGlass  size={20} className="text-gray-600 cursor-pointer hover:text-blue-500" onClick={handleSearch}/>
    </div>
  )
}
