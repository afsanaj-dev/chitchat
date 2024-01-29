import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { InfinitySpin } from 'react-loader-spinner'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
    const auth = getAuth();
    const db = getDatabase();
    // let emailRegx="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$";
    let dispatch =useDispatch();
    let navigate = useNavigate();
    let [email, setEmail] = useState('');
    let [name, setName] = useState('');
    let [password, setPassword] = useState('');
    let [emailerr, setEmailerr] = useState('');
    let [nameerr, setNameerr] = useState('');
    let [passworderr, setPassworderr] = useState('');
    let [loader, setLoader] = useState(false);
    let [passwordShow, setPasswordShow] = useState(false);

    let handleSignup = () => {
        if (!email) {
            setEmailerr("Email is required")
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailerr('Invalid Email')
        }
        if (!name) {
            setNameerr("Name is required")
        }
        if (!password) {
            setPassworderr("Password is required")
        }
        // else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
        //     setPassworderr('Password should be minimum 8 characters,1 letter & 1 number')
        // }
        else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    set(ref(db, 'users/' + user.user.uid), {
                        fullname: name,
                        email: email,
                        profile_picture : "images/default-pic.jpg"
                      });
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            updateProfile(auth.currentUser, {
                                displayName: name,
                                photoURL: "https://example.com/jane-q-user/profile.jpg"
                            }).then(() => {
                                // Profile updated!
                                setLoader(true);
                                toast('Registration is Successfull', {
                                    position: "top-right",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                                // Email verification sent!
                                setTimeout(() => {
                                    // here we navigate to / path which reffer to Login page
                                    navigate('/');
                                }, 2000);
                            }).catch((error) => {
                                // An error occurred
                                // ...
                            });

                        });
                })
                .then(() => {
                    setLoader(false)
                })
                .catch((error) => {
                    if (error.code.includes('auth/email-already-in-use')) {
                        setEmailerr("Email already in use")
                    }
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    console.log(error.code)
                });

        }
    }
    let handleEmail = (e) => {
        setEmail(e.target.value)
        // when we get a value in email input then emailerr should be empty string
        // we can also done the same thing by value={email}
        setEmailerr('')
    }
    let handleName = (e) => {
        setName(e.target.value)
        setNameerr('')
    }
    let handlePassword = (e) => {
        setPassword(e.target.value)
        setPassworderr('')
    }
    return (
        <div className='flex'>
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
            {/* Same as */}
            <ToastContainer />
            <div className='w-1/2 hidden sm:block'>
                <img className='h-screen w-full object-cover' src="images/signup.jpg" alt="registration" />
            </div>
            <div className='w-full md:px-4 md:w-1/2 lg:bg-[url("images/bg2.jpg")] bg-cover  bg-no-repeat h-screen text-center md:text-left'>

                <div className='text-center mt-3 me-0 lg:me-32'>
                    <a className='font-nova font-normal text-5xl md:text-6xl text-purple ' href="#">ChitChat</a>
                </div>
                <div className='px-3 md:px-0 lg:ml-2 xl:ml-[140px] mt-[40px]'>
                    <h1 className='font-nunito font-bold text-3xl md:text-[32px] text-darkblue'>Get started with easily register</h1>
                    <p className='font-nunito font-normal text-xl text-darkblue mb-[40px] '>
                        Free register and you can enjoy it
                    </p>

                    {/* -------------------Email Input---------------------------- */}

                    <div className='relative mb-5 md:mb-9'>
                        <p className='font-nunito text-sm font-semibold text-darkblue tracking-[1px] absolute top-[-7px] left-[50px] bg-white w-[120px] text-center'>Email Address</p>
                        <input onChange={handleEmail} className={email
                            ? `border border-1 rounded-lg p-4 border-solid border-violate w-full md:w-[350px] font-nunito font-semibold text-xl text-darkblue`
                            : `border border-1 rounded-lg p-4 border-solid border-darkblue w-full md:w-[350px] font-nunito font-semibold text-xl text-darkblue`} type="email" value={email} />
                        {emailerr && <p className='bg-red-500 text-sm text-white rounded-b-lg w-full md:w-[350px] pl-5'> {emailerr} </p>}
                    </div>

                    {/* -----------------------Name Input------------------------------ */}

                    <div className='relative mb-5 md:mb-9'>
                        <p className='font-nunito text-sm font-semibold text-darkblue tracking-[1px] absolute top-[-7px] left-[50px] bg-white w-[120px] text-center'>Full Name</p>
                        <input onChange={handleName} className=' border border-1 rounded-lg p-4 border-solid border-darkblue w-full md:w-[350px] font-nunito font-semibold text-xl text-darkblue' type="text" value={name} />
                        {nameerr && <p className='bg-red-500 text-sm text-white rounded-b-lg w-[320px] sm:w-[350px] pl-5'> {nameerr} </p>}
                    </div>

                    {/* -------------------------Password Input---------------------- */}

                    <div className='relative mb-5 md:mb-9 w-full md:w-[350px]' >
                        <p className='font-nunito text-sm font-semibold text-darkblue tracking-[1px] absolute top-[-7px] left-[50px] bg-white w-[120px] text-center'>Password</p>
                        <input onChange={handlePassword} className=' border border-1 rounded-lg p-4 border-solid border-darkblue w-full md:w-[350px] font-nunito font-semibold text-xl text-darkblue' type={passwordShow ? "text" : "password"} value={password} />
                        {passwordShow ?
                            (<IoMdEye onClick={() => setPasswordShow(false)} className='absolute top-5 right-3 text-xl' />)
                            :
                            (<IoMdEyeOff onClick={() => setPasswordShow(true)} className='absolute top-5 right-3 text-xl' />)
                        }
                        {passworderr && <p className='bg-red-500 text-sm text-white rounded-b-lg w-full md:w-[350px] pl-5'> {passworderr} </p>}
                    </div>
                    {loader ?
                        <div className='ml-[80px]'>
                            <InfinitySpin
                                width='200'
                                color="#4D3688"
                            />
                        </div>
                        :

                        <Link onClick={handleSignup}
                            className='inline-block text-center w-full sm:w-[340px] bg-purple mb-5 py-[12px] font-nunito text-xl font-normal text-white rounded-[86px]' href="#">
                            Sign Up
                        </Link>
                    }

                    <p className='font-nunito font-normal text-sm text-[#03014C] w-full sm:w-[340px] text-center'>
                        Already  have an account ?
                        <Link to='/'>
                            <span className='text-[#EA6C00]'>Sign In</span>
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Registration