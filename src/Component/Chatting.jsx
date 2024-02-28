import React from 'react'
import { HiDotsVertical } from "react-icons/hi";

const Chatting = () => {
  return (
    <div className='w-full h-screen bg-violet-100 rounded-xl'>
      <div className='flex justify-between mx-3 pt-4 border-b border-solid border-sky-700 pb-3'>
          <div className='flex gap-3 items-center '>
            <img className='w-16 h-16 rounded-full object-cover overflow-hidden relative group' src="images/frnd1.jpg" alt="frnd" />
            <div >
              <h3 className='font-nova text-md font-semibold text-darkblue'>Sohana Ahmed</h3>
              <h4 className='font-nunito text-sm font-normal text-darkblue '>online</h4>
            </div>
          </div>
          <div className='mt-3 text-xl'>
          <HiDotsVertical />
          </div>
      </div>
    </div>
  )
}

export default Chatting