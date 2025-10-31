import React, { useState } from 'react'
import Header from '../../../Components/Header'
import NoteCard from '../../../Components/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from '../../../Components/AddEditNotes'
import Modal from 'react-modal'

export default function Home() {
  const [openAddEditModel, setOpenEditModel]=useState({
    isShown:false,
    type:"add",
    data:null
  })
  return (
    <div>
      <Header/>
      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-20'>
        <NoteCard title="meeting on 2 octocer"
         date="2 oct, 2025"
         content="My meeting is on the topic of breast cancer
         My meeting is on the topic of breast cancer"
         tags="#meeting"
         isPinned={true}
         onEdit={()=>{}}
         onDelete={()=>{}}
         onPinNote={()=>{}}
         />
         <NoteCard title="meeting on 2 octocer"
         date="2 oct, 2025"
         content="My meeting is on the topic of breast cancer
         My meeting is on the topic of breast cancer"
         tags="#meeting"
         isPinned={true}
         onEdit={()=>{}}
         onDelete={()=>{}}
         onPinNote={()=>{}}
         />
         <NoteCard title="meeting on 2 octocer"
         date="2 oct, 2025"
         content="My meeting is on the topic of breast cancer
         My meeting is on the topic of breast cancer"
         tags="#meeting"
         isPinned={true}
         onEdit={()=>{}}
         onDelete={()=>{}}
         onPinNote={()=>{}}
         />
         <NoteCard title="meeting on 2 octocer"
         date="2 oct, 2025"
         content="My meeting is on the topic of breast cancer
         My meeting is on the topic of breast cancer"
         tags="#meeting"
         isPinned={true}
         onEdit={()=>{}}
         onDelete={()=>{}}
         onPinNote={()=>{}}
         />
        </div>
      </div>
      <button className='w-16 h-16 bg-blue-500 justify-center flex items-center rounded hover:bg-blue-700 absolute right-10 bottom-10' 
      onClick={()=>{
        setOpenEditModel({isShown:true, type:'add', data:null})
      }}>
        <MdAdd className='text-[32px] text-white'/>
      </button>

      <Modal isOpen={openAddEditModel.isShown}
      onRequestClose={()=>{}}
      style={
         
          {
            overlay:{
              backgroundColor:"rgba(0,0,0,0.2)"
            },
          }
      }
      contentLabel=""
      className="w-[40%] bg-white max-h-3/5 p-5 mt-40 mx-auto">
     <AddEditNotes
      type={openAddEditModel.type}
      noteData={openAddEditModel.data}
      onclose={(()=>
    {
      setOpenEditModel({isShown:false, data:null , type:"add"})
    })}/>
     </Modal>
    </div>
  )
}
