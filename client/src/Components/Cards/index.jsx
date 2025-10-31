import React from 'react'

export default function Cards({onLogout, name}) {
    
     const getInitials = (name) => {
        if(!name) return "";
    const words = name.trim().split(' '); 
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);
  return (
    <div className='flex items-center justify-center gap-6'>
     <div className='text-gray-900 flex bg-gray-200 w-12 h-12 items-center justify-center font-medium rounded-full'>{initials}Z</div>
     <div>
        <p className='text-sm font-bold text-gray-900'>{name}Zayn</p>
        <button onClick={onLogout} className='text-sm underline cursor-pointer  text-gray-800'>Logout</button>
     </div>
    </div>
  )
}
