import React, { useState } from 'react'
import TagInput from '../TagInput'
import { MdClose } from 'react-icons/md';

export default function AddEditNotes({onclose, noteData, type}) {
    const [title, setTitle]=useState("");
    const [content, setContent]=useState("");
    const [tag, setTag]=useState([])
    const [message, setMessage]=useState("")
    
    const addNewNote=async()=>
    {

    }
     const editNote=async()=>
     {

     }

    const handleAddNote=()=>
    {
      if(!title)
      {
         setMessage("Please enetr the title");
         return;
      }
      if(!content)
      {
        setMessage("Please enter the content");
        return;
      }
      setMessage("")
   if(type==='edit')
   {
    editNote();
   }
   else
   {
    addNewNote();
   }
   

    }
   
  return (
    <div className='relative'>
        <button className='w-10 h-10 bg-gray-100 flex items-center justify-center absolute right-0 hover:bg-gray-200' onClick={onclose}>
            <MdClose className='text-xl text-gray-700'/>
        </button>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>Title</label>
        <input type="text"
        className='text-2xl text-gray-900 outline-none'
        placeholder='Go to Gym at 5'
        value={title} 
        onChange={(e)=>setTitle(e.target.value)} />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea type="text"
        className='text-sm text-gray-900 outline-none bg-gray-200 p-2 rounded' rows={10}
        placeholder='Content'
        value={content} 
        onChange={(e)=>setContent(e.target.value)}/>
      </div>
      <div className='mt-3'>
        <label className='input-label'>Tags</label>
        <TagInput tag={tag} setTag={setTag}/>
      </div>
      {message && (
        <p className='text-sm font-medium text-red-500 pt-4'>{message}</p>
      )}
      <button className='mt-5 bg-blue-500 text-white font-medium p-3 w-full hover:border border-blue-500 hover:text-blue-500 hover:bg-blue-500/10 transition-all duration-300 ease-in-out' onClick={handleAddNote}>
        ADD
      </button>
    </div>
  )
}
