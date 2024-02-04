import React, { useEffect, useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'


const UserList = () => {
    const data = useSelector((state) => state.userLoginInfo.userInfo);
    // console.log(data)
    const [userList, setUserList] = useState([]);
    const db = getDatabase();
    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            let array = []
            snapshot.forEach((item) => {
                // Here is the condition for checking current login user with user list
                if (data.uid != item.key) {
                    array.push({...item.val(),id: item.key });
                }
            })
            setUserList(array);
        });
    }, [])

    let handleFrndReq = (item) =>{
        // console.log(item)
        set(push(ref(db,'friendrequest/')), {
            sendername : data.displayName,
            senderemail : data.email,
            senderid : data.uid,
            receivername : item.fullname,
            receiveremail : item.email,
            receiverid : item.id,
          }).then(()=>{
            alert("Friend Request send")
          });
    }

    return (

        <div className='w-[30%] h-[380px] bg-violet-100 rounded-xl overflow-y-scroll p-5'>
            <div className=' flex justify-between'>
                <h3 className='font-nova text-lg font-semibold text-darkblue'>
                    User Lists
                </h3>
                <div className='text-xl  text-darkbluelg'>
                    <HiDotsVertical />
                </div>
            </div>
            {userList.map((item) => (
                <div className='mt-5 flex justify-between'>
                    <div className='flex gap-3 '>
                        <div className='w-14 h-14 rounded-full overflow-hidden'>
                            <img className='w-fit' src="/images/user1.jpg" alt="user" />
                        </div>
                        <div>
                            <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                                {item.fullname}
                            </h4>
                            <p className='font-nunito text-xs font-semibold text-darkblue mt-1'>
                                Hi!How was your
                            </p>
                        </div>
                    </div>
                    <div className='pt-2'>
                        <button onClick={()=>handleFrndReq(item)} className='bg-skyblue rounded text-sm font-nunito py-1 px-2'>
                            Add
                        </button>
                    </div>
                </div>
            ))}
            {/* 

            <div className='mt-5 flex justify-between'>
                <div className='flex gap-3 '>
                    <div className='w-14 h-14 rounded-full overflow-hidden'>
                        <img className='w-fit' src="/images/user2.jpg" alt="user" />
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
                        <img className='w-fit' src="/images/user3.jpg" alt="user" />
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
                        <img className='w-fit' src="/images/user4.jpg" alt="user" />
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
            </div> */}
        </div>
    )
}

export default UserList