import React, { useEffect, useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux'
import { data } from 'autoprefixer';

const Friend = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [friendList, setFriendLIst] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().senderid || data.uid == item.val().receiverid) {
          array.push({ ...item.val(), id: item.key })
        }
      })
      setFriendLIst(array);
    });
  }, []);
  let handleBlock = (item) => {
    if (data.uid == item.senderid) {
      set(push(ref(db, 'block/')), {
        block: item.receivername,
        blockid: item.receiverid,
        blockby: data.displayName,
        blockbyid: data.uid,

      }).then(() => {
        remove(ref(db, 'friend/' + item.id))
      })
    }
    else{
      set(push(ref(db, 'block/')), {
        block: item.sendername,
        blockid: item.senderid,
        blockby: item.receivername,
        blockbyid: item.receiverid,

      }).then(() => {
        remove(ref(db, 'friend/' + item.id))
      })
    }
  }
  return (
    <div className='w-[350px] h-[380px] bg-violet-100 rounded-xl  p-5'>
      <div className=' flex justify-between'>
        <h3 className='font-nova text-lg font-semibold text-darkblue'>
          Friends
        </h3>
        <div className='text-xl  text-darkbluelg'>
          <HiDotsVertical />
        </div>
      </div>
      <div className='overflow-y-scroll'>
        {console.log(friendList)}
        {friendList.map((item) => (
          <div className='mt-5 flex justify-between pe-1'>
            <div className='flex gap-3 '>
              <div className='w-14 h-14 rounded-full overflow-hidden'>
                <img className='w-fit' src="/images/frnd1.jpg" alt="friend" />
              </div>
              <div>
                {data.uid == item.senderid ?
                  <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                    {item.receivername}
                  </h4>
                  :
                  <h4 className='font-nova text-sm font-semibold text-darkblue mt-3'>
                    {item.sendername}
                  </h4>
                }
                <p className='font-nunito text-xs font-semibold text-darkblue mt-1'>
                  Hi!How was your
                </p>
              </div>
            </div>
            <div className='pt-2'>
              <button onClick={() => handleBlock(item)} className='bg-skyblue rounded text-sm font-nunito py-1 px-2'>
                Block
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Friend