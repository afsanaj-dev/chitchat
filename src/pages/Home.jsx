import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Sidebar from '../Component/Sidebar';
import { IoSearch } from "react-icons/io5";
import Friend from '../Component/Friend';
import Group from '../Component/Group';
import BlockList from '../Component/BlockList';
import FriendRequest from '../Component/FriendRequest';
import GroupRequest from '../Component/GroupRequest';
import UserList from '../Component/UserList';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from '../Slices/userSlice';

const Home = () => {
  const auth = getAuth();
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  // let data = useSelector((state) => state.incrementSlice.value);
  console.log(data)
  useEffect(() => {
    if (data == 'null') {
      navigate('/')
    }
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Here we update user email verified information and send it to REDUX using dispatch and reducer(userLoginInfo)
      dispatch(userLoginInfo(user));
    } 
  });  

  return (
    <div>
      {data.emailVerified ?
        <div className='flex'>
          <div className='w-[13%] h-screen  bg-cover  bg-no-repeat'>
            <Sidebar />
          </div>
          <div className='w-[87%] h-auto bg-fuchsia-200'>
            <div className='text-3xl text-slate-500 w-1/4 h-12 bg-white shadow-xl rounded-3xl ms-3 mt-3 flex gap-3 pt-2 ps-3'>
              <IoSearch />
              <h4 className='font-nunito text-xl font-normal text-darkblue'>
                search
              </h4>
            </div>
            <div className='flex flex-wrap gap-4 m-5'>
              <Friend />
              <Group />
              <UserList />
              <FriendRequest />
              <GroupRequest />
              <BlockList />
            </div>
          </div>
        </div>
        :
        <div className='bg-violate flex justify-center items-center w-full h-screen'>
          <h1 className='font-nova font-bold text-4xl text-purple'>Your Email is not Verified</h1>
        </div>
      }
    </div>
  )
}

export default Home