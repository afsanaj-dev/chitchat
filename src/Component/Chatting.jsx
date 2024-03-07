import React from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { BsTriangleFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";
import { GrGallery } from "react-icons/gr";
import ModalImage from "react-modal-image";

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
      <div className='mx-3 mt-3 h-[486px] overflow-y-scroll'>
        {/* ============= MSG Box Start==================== */}
        {/* ===============Reciver Message Start================= */}
        <div className='py-2'>
          <div className='relative bg-pink-400 rounded-lg py-3 px-8 inline-block ms-2'>
            <h2 className='font-nunito text-base font-medium'>Hello</h2>
            <BsTriangleFill className='absolute bottom-[-1px] left-[-7px] text-pink-400' />
          </div>
          <h3 className=' font-nunito text-base font-medium text-slate-500 mt-2'>Today, 2.01PM</h3>
        </div>
        <div className='py-2'>
          <div className='relative bg-pink-400 rounded-lg py-3 px-8 inline-block ms-2'>
            <h2 className='font-nunito text-base font-medium'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti facilis eum placeat corporis saepe molestias distinctio dicta.</h2>
            <BsTriangleFill className='absolute bottom-[-1px] left-[-7px] text-pink-400' />
          </div>
          <h3 className=' font-nunito text-base font-medium text-slate-500 mt-2'>Today, 2.01PM</h3>
        </div>
        {/* ===============Reciver Message Start================= */}
        {/* ----------------------------------------------------------------------------------------- */}
        {/* ===============Sender Message Start================= */}
        <div className='py-2 text-right'>
          <div className='relative bg-indigo-300 rounded-lg py-3 px-8 inline-block me-2'>
            <h2 className='font-nunito text-base font-medium'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h2>
            <BsTriangleFill className='absolute bottom-[-1px] right-[-7px] text-indigo-300' />
          </div>
          <h3 className=' font-nunito text-base font-medium text-slate-500 mt-2'>Today, 2.01PM</h3>
        </div>
        <div className='py-2 text-right'>
          {/* --------------------reciver image-------------- */}
          <div className='relative bg-indigo-300 rounded-lg inline-block me-2 p-1'>
            {/* ------------Image Modal is placed here------------- */}
            <ModalImage
              small={"images/user1.jpg"}
              large={"images/user1.jpg"}
              alt="img"
              className='w-[200px] h-[200px] object-cover' 
            />
            {/* <img className='w-[200px] h-[200px] object-cover' src="images/user1.jpg" alt="img" /> */}
            <BsTriangleFill className='absolute bottom-[-1px] right-[-7px] text-indigo-300' />
          </div>
          <h3 className=' font-nunito text-base font-medium text-slate-500 mt-2'>Today, 2.01PM</h3>
        </div>
        {/* ===============Sender Message Start================= */}
       {/* ===============Reciver Message Start================= */}
        <div className='py-2'>
          <div className='relative bg-pink-400 rounded-lg p-1 inline-block ms-2'>
          <ModalImage
              small={"images/user1.jpg"}
              large={"images/user1.jpg"}
              alt="img"
              className='w-[200px] h-[200px] object-cover' 
            />
            <BsTriangleFill className='absolute bottom-[-1px] left-[-7px] text-pink-400' />
          </div>
          <h3 className=' font-nunito text-base font-medium text-slate-500 mt-2'>Today, 2.01PM</h3>
        </div>
        {/* ===============Reciver Message Start================= */}
        {/* ============= MSG Box End==================== */}

      </div>
      <div className='relative'>
        <input className='w-[93%] rounded-lg py-3 px-3 text-base border border-solid border-violet-300' type="text" />
        <CiFaceSmile className='absolute right-16 top-[50%] translate-y-[-50%] text-xl' />
        <GrGallery className='absolute right-24 top-[50%] translate-y-[-50%] text-xl' />
        <div className='absolute right-0 top-[50%] translate-y-[-50%] text-xl bg-violet-800 text-white p-3 rounded-lg'>
          <IoSend />
        </div>
      </div>
    </div>
  )
}

export default Chatting