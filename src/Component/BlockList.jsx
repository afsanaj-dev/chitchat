import React, { useEffect, useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux'

const BlockList = () => {
    const data = useSelector((state) => state.userLoginInfo.userInfo);
    const [blockList, setBlockList] = useState([]);
    const db = getDatabase();
    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let array = [];
            snapshot.forEach((item) => {
                if (data.uid == item.val().blockbyid) {
                    array.push({
                        blockid: item.val().blockid,
                        block: item.val().block,
                        id: item.key
                    });
                } else if (data.uid == item.val().blockid) {
                    array.push({
                        blockbyid: item.val().blockbyid,
                        blockby: item.val().blockby,
                    });
                }
            })
            setBlockList(array);
        });
    }, []);
    let handleUnblock =(item)=>{
        console.log('click')
        set(push(ref(db, 'friend/')), {
            sendername: data.displayName,
            senderid: data.uid,
            receivername: item.block,
            receiverid: item.blockid,
        }).then(()=>{
            remove(ref(db, 'block/' + item.id))
        });
    }
    return (
        <div className='w-[350px] h-[380px] bg-violet-100 rounded-xl  p-5'>
            <div className=' flex justify-between'>
                <h3 className='font-nova text-lg font-semibold text-darkblue'>
                    Block List
                </h3>
                <div className='text-xl  text-darkbluelg'>
                    <HiDotsVertical />
                </div>
            </div>
            <div className='overflow-y-scroll'>
                {blockList.map((item) => (
                    <div className='mt-5 flex justify-between'>
                        <div className='flex gap-3 '>
                            <div className='w-14 h-14 rounded-full overflow-hidden'>
                                <img className='w-fit' src="/images/block2.jpg" alt="block" />
                            </div>
                            <div>
                                <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                                    {item.block||item.blockby}

                                </h4>
                                <span className='font-nunito text-xs font-semibold text-darkblue'>
                                    10/12/2023
                                </span>
                            </div>
                        </div>
                        <div className='pt-4'>
                            {item.blockid &&                           
                            (<button onClick={()=> handleUnblock(item)} className='bg-skyblue rounded text-sm font-nunito p-1'>
                                Unblock
                            </button>)
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BlockList