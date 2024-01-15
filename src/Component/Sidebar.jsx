import React from 'react'
import { IoHomeOutline, IoSettingsSharp } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { TbLogout } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { data } from 'autoprefixer';
import { userLoginInfo } from '../Slices/userSlice';

const Sidebar = () => {

  let data =useSelector((state)=> state.userLoginInfo.userInfo);
  console.log(data);

  return (
    <div className='flex flex-col justify-around items-center h-screen'>
      <div className='flex flex-col justify-center items-center'>
        <div className='w-16 h-16 rounded-full object-cover overflow-hidden'>
          <img src="/images/portrait.jpg" alt="portrait" />
        </div>
        <div>
          <h3 className='font-nova text-sm font-semibold text-darkblue'>{data.displayName}</h3>
          <h4 className='font-nunito text-xs font-normal text-darkblue '>Web Devoloper</h4>
        </div>
      </div>
      <div className='flex flex-col gap-4 justify-center items-center '>
        <div className='text-3xl text-white flex justify-center items-center bg-skyblue w-14 h-14  rounded-lg mr-5 mb-4'>
          <IoHomeOutline />
        </div>
        <div className='text-3xl  text-darkblue w-14 h-14  rounded-lg'>
          <TiMessages />
        </div>
        <div className='text-3xl text-darkblue w-14 h-14 rounded-lg'>
          <MdNotificationsActive />
        </div>
        <div className='text-3xl  text-darkblue w-14 h-14 rounded-lg'>
          <IoSettingsSharp />
        </div>
      </div>
      <div className='text-3xl  text-darkblue bg-skyblue w-14 h-14 rounded-full flex justify-center items-center mr-5'>
        <TbLogout />
      </div>
    </div>
  )
}

export default Sidebar