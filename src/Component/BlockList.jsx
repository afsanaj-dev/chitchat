import React from 'react'
import { HiDotsVertical } from "react-icons/hi";

const BlockList = () => {
    return (
        <div className='w-[30%] h-[380px] bg-violet-100 rounded-xl overflow-y-scroll p-5'>
            <div className=' flex justify-between'>
                <h3 className='font-nova text-lg font-semibold text-darkblue'>
                    Block List
                </h3>
                <div className='text-xl  text-darkbluelg'>
                    <HiDotsVertical />
                </div>
            </div>
            <div className='mt-5 flex justify-between'>
                <div className='flex gap-3 '>
                    <div className='w-14 h-14 rounded-full overflow-hidden'>
                        <img className='w-fit' src="/images/block2.jpg" alt="block" />
                    </div>
                    <div>
                        <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                            Maria
                        </h4>
                        <span className='font-nunito text-xs font-semibold text-darkblue'>
                            10/12/2023
                        </span>
                    </div>
                </div>
                <div className='pt-4'>
                    <button className='bg-skyblue rounded text-sm font-nunito p-1'>
                        Unblock
                    </button>
                </div>
            </div>
            <div className='mt-5 flex justify-between'>
                <div className='flex gap-3 '>
                    <div className='w-14 h-14 rounded-full overflow-hidden'>
                        <img className='w-fit' src="/images/block1.jpg" alt="block" />
                    </div>
                    <div>
                        <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                            Shawon
                        </h4>
                        <span className='font-nunito text-xs font-semibold text-darkblue'>
                            10/12/2023
                        </span>
                    </div>
                </div>
                <div className='pt-4'>
                    <button className='bg-skyblue rounded text-sm font-nunito p-1'>
                        Unblock
                    </button>
                </div>
            </div>
            <div className='mt-5 flex justify-between'>
                <div className='flex gap-3 '>
                    <div className='w-14 h-14 rounded-full overflow-hidden'>
                        <img className='w-fit' src="/images/block2.jpg" alt="block" />
                    </div>
                    <div>
                        <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                            Palak
                        </h4>
                        <span className='font-nunito text-xs font-semibold text-darkblue'>
                            10/12/2023
                        </span>
                    </div>
                </div>
                <div className='pt-4'>
                    <button className='bg-skyblue rounded text-sm font-nunito p-1'>
                        Unblock
                    </button>
                </div>
            </div>
            <div className='mt-5 flex justify-between'>
                <div className='flex gap-3 '>
                    <div className='w-14 h-14 rounded-full overflow-hidden'>
                        <img className='w-fit' src="/images/block1.jpg" alt="block" />
                    </div>
                    <div>
                        <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                            Jahid
                        </h4>
                        <span className='font-nunito text-xs font-semibold text-darkblue'>
                            10/12/2023
                        </span>
                    </div>
                </div>
                <div className='pt-4'>
                    <button className='bg-skyblue rounded text-sm font-nunito p-1'>
                        Unblock
                    </button>
                </div>
            </div>
         
        </div>
    )
}

export default BlockList