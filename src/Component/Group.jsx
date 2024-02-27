import React, { useEffect, useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'
import { RiListSettingsLine } from "react-icons/ri";

const Group = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const db = getDatabase();
  let [groupModal, setgroupModal] = useState(false);
  let [groupName, setGroupName] = useState('');
  let [groupList, setGroupList] = useState([]);
  // let [groupReqModal, setGroupReqModal] =useState(false)

  let handleGroupModal = () => {
    setgroupModal(!groupModal)
  }

  let handleGroupCreate = () => {
    set(push(ref(db, 'group/')), {
      groupname: groupName,
      admin: data.displayName,
      adminid: data.uid,
    }).then(() => {
      setgroupModal(false);
    });
  }
  useEffect(() => {
    const groupRef = ref(db, 'group/');
    onValue(groupRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminid) {
          array.push(item.val())
        }
      })
      setGroupList(array);
    });

  }, []);

  // let handleGroupSetting =()=>{
  //   console.log('click')
  //   setGroupReqModal(!groupReqModal)
  // }
  return (
    <div className='w-[30%] h-[380px] bg-violet-100 rounded-xl  p-5'>
      <div className=' flex justify-between'>
        <h3 className='font-nova text-lg font-semibold text-darkblue'>
          {groupModal ? "Create Group" : "My Group"}
        </h3>
        <div className='text-xl  text-darkbluelg'>
          <button onClick={handleGroupModal} className='bg-skyblue rounded text-sm font-nunito py-1 px-2'>
            {groupModal ? "Go Back" :
              "Create Group"}
          </button>
        </div>
      </div>
      {groupModal ?
        (<div>
          <input onChange={(e) => setGroupName(e.target.value)} type="text" className='font-nunito py-2 pl-2 mt-4 w-full border-fuchsia-500' placeholder='Enter Group Name' />
          <button onClick={handleGroupCreate} className='bg-skyblue rounded text-sm font-nunito py-2 px-2 mt-3 w-full'>
            Submit
          </button>
        </div>)
        :
        (<div className='overflow-y-scroll'>
          {groupList.map((item) => (
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
              <div className='pt-3 me-2'>
              {/* onClick={handleGroupSetting} */}
                <span  className='font-nunito text-xl text-darkblue'>
                  <RiListSettingsLine />
                </span>
              </div>
            </div>
          ))}
        </div>)
      }

    </div>
  )
}

export default Group