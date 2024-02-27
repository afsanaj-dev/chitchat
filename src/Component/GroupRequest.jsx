import React, { useEffect, useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue, set, push} from "firebase/database";
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

const GroupRequest = () => {
    const data = useSelector((state) => state.userLoginInfo.userInfo);
    const db = getDatabase();
    // let [groupName, setGroupName] = useState('');
    let [myGroupList, setMyGroupList] = useState([]);

    useEffect(() => {
        const groupRef = ref(db, 'group/');
        onValue(groupRef, (snapshot) => {
            let array = [];
            snapshot.forEach((item) => {
                if (data.uid !== item.val().adminid) {
                    array.push({...item.val(),id: item.key})
                }
            })
            setMyGroupList(array);
        });
    }, []);

    let handleGroupJoin=(item)=>{
        set(push(ref(db, 'groupRequest/')), {
            groupname: item.groupname,
            admin: item.admin,
            adminid: item.adminid,
            requestName :data.displayName,
            requestId :data.uid,
        }).then(() => {
            // alert("done")
            toast('Request is sent', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }
    return (        
        <div className='w-[30%] h-[380px] bg-violet-100 rounded-xl  p-5'>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className=' flex justify-between'>
                <h3 className='font-nova text-lg font-semibold text-darkblue'>
                    Group Request
                </h3>
            </div>
            <div className='overflow-y-scroll'>
                {myGroupList.map((item) => (
                    <div className='mt-5 flex justify-between'>
                        <div className='flex gap-3 '>
                            <div className='w-14 h-14 rounded-full overflow-hidden'>
                                <img className='w-fit' src="/images/group1.jpg" alt="group" />
                            </div>
                            <div>
                                <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                                    {item.groupname}
                                </h4>
                                <p className='font-nunito text-sm font-semibold text-darkblue mt-1'>
                                    Admin: {item.admin}
                                </p>
                            </div>
                        </div>
                        <div className='pt-2'>
                            <button onClick={()=>handleGroupJoin(item)} className='bg-skyblue rounded text-sm font-nunito py-1 px-2'>
                                Join
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GroupRequest