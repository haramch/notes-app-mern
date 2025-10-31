import React from 'react'
import {MdOutlinePushPin, MdCreate, MdDelete} from 'react-icons/md'

export default function NoteCard({title, date, content, tags, isPinned, onEdit, onDelete, onPinNote}) {
  return (
    <div className='border border-gray-300 rounded p-4 bg-white hover:shadow-xl transition-all duration-300 ease-linear space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
            <h6 className='text-lg font-bold'>{title}</h6>
            <span className='text-gray-700 font-medium'>{date}</span>
        </div>
        <MdOutlinePushPin onClick={onPinNote} className={`cursor-pointer hover:text-blue-400 text-xl ${isPinned ? 'text-blue-400': 'text-gray-500'}`}/>
      </div>
      <p className=' text-gray-700'>{content?.slice(0, 60)}</p>
      <div className='flex items-center justify-between'>
        <div className='text-gray-700 font-medium'>{tags}</div>
        <div className='flex items-center gap-2'>
            <MdCreate className='cursor-pointer hover:text-blue-400 text-xl text-gray-700' onClick={onEdit}/>
            <MdDelete className='cursor-pointer hover:text-blue-400 text-xl text-gray-700' onClick={onDelete}/>
        </div>
      </div>
    </div>
  )
}
