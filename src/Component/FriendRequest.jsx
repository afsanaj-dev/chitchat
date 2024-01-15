import React from 'react'
import { HiDotsVertical } from "react-icons/hi";

const FriendRequest = () => {
    return (
        <div className='w-[30%] h-[380px] bg-violet-100 rounded-xl overflow-y-scroll p-5'>
            <div className=' flex justify-between'>
                <h3 className='font-nova text-lg font-semibold text-darkblue'>
                    Friend Requests
                </h3>
                <div className='text-xl  text-darkbluelg'>
                    <HiDotsVertical />
                </div>
            </div>
            <div className='mt-5 flex justify-between'>
                <div className='flex gap-3 '>
                    <div className='w-14 h-14 rounded-full overflow-hidden'>
                        <img className='w-fit' src="/images/frnd1.jpg" alt="friend" />
                    </div>
                    <div>
                        <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                            Taniya
                        </h4>
                        <p className='font-nunito text-xs font-semibold text-darkblue mt-1'>
                            Hi!How was your
                        </p>
                    </div>
                </div>
                <div className='pt-2'>
                    <span className='font-nunito text-xs font-semibold text-darkblue'>
                        10/12/2023
                    </span>
                </div>
            </div>
            <div className='mt-5 flex justify-between'>
                <div className='flex gap-3 '>
                    <div className='w-14 h-14 rounded-full overflow-hidden'>
                        <img className='w-fit' src="/images/frnd2.jpg" alt="friend" />
                    </div>
                    <div>
                        <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                            Taniya
                        </h4>
                        <p className='font-nunito text-xs font-semibold text-darkblue mt-1'>
                            Hi!How was your
                        </p>
                    </div>
                </div>
                <div className='pt-2'>
                    <span className='font-nunito text-xs font-semibold text-darkblue mt-1'>
                        10/12/2023
                    </span>
                </div>
            </div>
            <div className='mt-5 flex justify-between'>
                <div className='flex gap-3 '>
                    <div className='w-14 h-14 rounded-full overflow-hidden'>
                        <img className='w-fit' src="/images/frnd3.jpg" alt="friend" />
                    </div>
                    <div>
                        <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                            Taniya
                        </h4>
                        <p className='font-nunito text-xs font-semibold text-darkblue mt-1'>
                            Hi!How was your
                        </p>
                    </div>
                </div>
                <div className='pt-2'>
                    <span className='font-nunito text-xs font-semibold text-darkblue mt-1'>
                        10/12/2023
                    </span>
                </div>
            </div>
            <div className='mt-5 flex justify-between'>
                <div className='flex gap-3 '>
                    <div className='w-14 h-14 rounded-full overflow-hidden'>
                        <img className='w-fit' src="/images/frnd4.jpg" alt="friend" />
                    </div>
                    <div>
                        <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                            Taniya
                        </h4>
                        <p className='font-nunito text-xs font-semibold text-darkblue mt-1'>
                            Hi!How was your
                        </p>
                    </div>
                </div>
                <div className='pt-2'>
                    <span className='font-nunito text-xs font-semibold text-darkblue mt-1'>
                        10/12/2023
                    </span>
                </div>
            </div>
        </div>
    )
}

export default FriendRequest