import React, { useEffect, useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue,set ,push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {
    const db = getDatabase();
    const data = useSelector((state) => state.userLoginInfo.userInfo);
    const [frndReqList, setFrndReqList] = useState([]);
    useEffect(() => {
        const freiendrequestRef = ref(db, 'friendrequest/');
        onValue(freiendrequestRef, (snapshot) => {
            let array = [];
            snapshot.forEach((item) => {
                if(data.uid == item.val().receiverid){
                    array.push({ ...item.val(), id: item.key});
                }
            });
            setFrndReqList(array)
        });
    }, []);

    let handleFriendAccept =(item)=>{
        set(push(ref(db, 'friend/')), {
            ...item,
        }).then(()=>{
            remove(ref(db, 'friendrequest/' + item.id))
        })
    }

    return (
        <div className='w-[30%] h-[380px] bg-violet-100 rounded-xl p-5'>
            <div className=' flex justify-between'>
                <h3 className='font-nova text-lg font-semibold text-darkblue'>
                    Friend Requests
                </h3>
                <div className='text-xl  text-darkbluelg'>
                    <HiDotsVertical />
                </div>
            </div>
            <div className='overflow-y-scroll' >
                {frndReqList.map((item) => (
                    <div className='mt-5 flex justify-between pe-1'>
                        <div className='flex gap-3 '>
                            <div className='w-14 h-14 rounded-full overflow-hidden'>
                                <img className='w-fit' src="/images/frnd1.jpg" alt="friend" />
                            </div>
                            <div>
                                <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                                    {item.sendername}
                                </h4>
                                <p className='font-nunito text-xs font-semibold text-darkblue mt-1'>
                                    Hi!How was your
                                </p>
                            </div>
                        </div>
                        <div className='pt-2'>
                            <button onClick={()=> handleFriendAccept(item)} className='bg-skyblue rounded text-sm font-nunito py-1 px-2'>
                                Accept
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default FriendRequest