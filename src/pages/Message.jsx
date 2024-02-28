import React from 'react'
import Sidebar from '../Component/Sidebar'
import { IoSearch } from "react-icons/io5";
import Friend from '../Component/Friend';
import Group from '../Component/Group';
import Chatting from '../Component/Chatting';

const Message = () => {
    return (
        <div className='flex'>
            <div className='w-[13%] h-screen  bg-cover  bg-no-repeat'>
                <Sidebar active="message" />
            </div>
            <div className='w-[87%] h-auto bg-fuchsia-200'>
                <div className='text-3xl text-slate-500 w-1/4 h-12 bg-white shadow-xl rounded-3xl ms-3 mt-3 flex gap-3 pt-2 ps-3'>
                    <IoSearch />
                    <h4 className='font-nunito text-xl font-normal text-darkblue'>
                        search
                    </h4>
                </div>
                <div className='flex gap-2'>
                    <div className='w-[31%] flex flex-col gap-4 ms-6 mt-3'>
                        <Friend />
                        <Group />
                    </div>
                    <div className='w-[62%]' >
                        <Chatting/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message