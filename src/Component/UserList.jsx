import React, { useEffect, useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'
import { IoSearch } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';


const UserList = () => {
    const data = useSelector((state) => state.userLoginInfo.userInfo);
    // console.log(data)
    const [friendRequestList, setFriendRequestList] = useState("");
    const [userList, setUserList] = useState([]);
    const [userSearchList, setUserSearchlist] = useState([]);
    const [friendList, setFriendList] = useState("");
    const db = getDatabase();
    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            let array = []
            snapshot.forEach((item) => {
                // Here is the condition for checking current login user with user list
                if (data.uid != item.key) {
                    array.push({ ...item.val(), id: item.key });
                }
            })
            setUserList(array);
        });
    }, [])

    useEffect(() => {
        const freindRequestRef = ref(db, 'friendrequest/');
        onValue(freindRequestRef, (snapshot) => {
            snapshot.forEach((item) => {
                setFriendRequestList(item.val().receiverid + item.val().senderid)
            })
        });
    }, []);
    useEffect(() => {
        const freindRef = ref(db, 'friend/');
        onValue(freindRef, (snapshot) => {
            snapshot.forEach((item) => {
                setFriendList(item.val().receiverid + item.val().senderid)
            })
        });
    }, []);

    let handleFrndReq = (item) => {
        // console.log(item)
        set(push(ref(db, 'friendrequest/')), {
            sendername: data.displayName,
            senderemail: data.email,
            senderid: data.uid,
            receivername: item.fullname,
            receiveremail: item.email,
            receiverid: item.id,
        }).then(() => {
            // alert("Friend Request send")

            // ------using a toastifier-------
            toast('Friend Request is sent', {
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
    let handleSearch = (e) => {
        let data = userList.filter((item) => item.fullname.toLowerCase().includes(e.target.value.toLowerCase()));
        setUserSearchlist(data);
    }
    return (

        <div className='w-[350px] h-[380px] bg-violet-100 rounded-xl p-5'>
            {/* we can use the toasti container anywhere inside the div under return  */}
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
                    User Lists
                </h3>
                <div className='text-xl  text-darkbluelg'>
                    <HiDotsVertical />
                </div>
            </div>
            <div className=' relative' >
                <input onChange={handleSearch} className='text-lg text-slate-500 h-10 bg-white shadow-xl rounded-3xl ps-10 w-[90%]' type="text" placeholder='Search' />
                <IoSearch className='absolute top-3 left-4 text-lg' />

            </div>
            <div className='overflow-y-scroll'>
                {userSearchList.length > 0 ?

                    userSearchList.map((item) => (
                        <div className='mt-5 flex justify-between pe-1'>
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
                                {friendList.includes(data.uid + item.id) ||
                                    friendList.includes(item.id + data.uid)
                                    ?
                                    (<button className='bg-skyblue rounded text-sm font-nunito py-1 px-2'>
                                        Friend
                                    </button>)
                                    : friendRequestList.includes(data.uid + item.id) ||
                                        friendRequestList.includes(item.id + data.uid)
                                        ?
                                        (<button className='bg-skyblue rounded text-sm font-nunito py-1 px-2'>
                                            Remove
                                        </button>)
                                        :
                                        (<button onClick={() => handleFrndReq(item)} className='bg-skyblue rounded text-sm font-nunito py-1 px-2'>
                                            Add
                                        </button>)
                                }
                            </div>
                        </div>
                    ))
                    :

                    userList.map((item) => (
                        <div className='mt-5 flex justify-between pe-1'>
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
                                {friendList.includes(data.uid + item.id) ||
                                    friendList.includes(item.id + data.uid)
                                    ?
                                    (<button className='bg-skyblue rounded text-sm font-nunito py-1 px-2'>
                                        Friend
                                    </button>)
                                    : friendRequestList.includes(data.uid + item.id) ||
                                        friendRequestList.includes(item.id + data.uid)
                                        ?
                                        (<button className='bg-skyblue rounded text-sm font-nunito py-1 px-2'>
                                            Remove
                                        </button>)
                                        :
                                        (<button onClick={() => handleFrndReq(item)} className='bg-skyblue rounded text-sm font-nunito py-1 px-2'>
                                            Add
                                        </button>)
                                }
                            </div>
                        </div>
                    ))
                }

            </div>
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