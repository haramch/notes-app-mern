import React from 'react'
import heroImg from '../../assets/images/heroImg.png'
import Header from '../Header'

export default function Index() {
  return (
    <div>
      <Header />
      <div className='flex justify-center items-center mt-30'>
        <img src={heroImg} alt="heroImg" className='justify-center items-center flex min-h-70 max-w-[500px] opacity-70' />
      </div>
    </div>
  )
}
