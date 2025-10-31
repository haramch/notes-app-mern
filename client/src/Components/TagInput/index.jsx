import React, { useState } from 'react'
import {MdAdd, MdClose} from 'react-icons/md'

export default function TagInput() {
    const [tag, setTag]=useState([])
    const [inputValue, setInputValue]=useState("")
    const handleInputChange=(e)=>
    {
        setInputValue(e.target.value)
    }
    const addNewTag=()=>
    {
        if(inputValue.trim()!=="")
        {
            setTag([...tag, inputValue.trim()])
            setInputValue("")
        }
    }
    const handleKeyDown=(e)=>
    {
       if(e.key==="Enter")
       {
        addNewTag();
       }
    }
    const handleRemoveTag=(tagToRemove)=>
    {
        setTag(tag.filter((tag)=>tag!==tagToRemove));
    }

  return (
    <div>
   {tag?.length > 0 && (
  <div className='flex items-center gap-2 flex-wrap mt-2'>
    {tag.map((tag, i) => (
      <span key={i} className='flex items-center gap-2 text-sm text-gray-900 bg-gray-100 px-3'>
        #{tag}
        <button onClick={() => handleRemoveTag(tag)}>
          <MdClose />
        </button>
      </span>
    ))}
  </div>
)} 

    <div className='flex items-center justify-between gap-4 mt-3'>
        <input type="text" className='text-sm bg-transparent border border-gray-300 px-3 py-2 rounded outline-none' placeholder='ADD TAGS' value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        <button className='h-8 w-8 border border-blue-700 hover:bg-blue-700 flex items-center justify-center rounded'
        onClick={()=>{addNewTag()}}>
            <MdAdd className='text-2xl text-blue-700 hover:text-white'/>
        </button>

    </div>
    </div>
  )
}
