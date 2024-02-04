
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../Slices/userSlice';
import { getDatabase, ref, set } from "firebase/database";
import { document } from 'postcss';


const Login = () => {
    // let reference= useRef();
    const auth = getAuth();
    const db = getDatabase();
    const provider = new GoogleAuthProvider();
    let dispatch= useDispatch();
    let navigate = useNavigate();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [emailerr, setEmailerr] = useState('');
    let [passworderr, setPassworderr] = useState('');
    let [passwordShow, setPasswordShow] = useState(false);
    let [forgetModal, setForgetModal] = useState(false);
    let [forgetEmail, setForgetEmail] = useState('');
    let [passwordResetErr, setPasswordResetErr] = useState('');

    let handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // sending login information to databasen
                set(ref(db, 'users/' + result.user.uid), {
                    fullname: result.user.displayName,
                    email: result.user.email,
                    profile_picture : result.user.photoURL
                  });
                console.log(result)
                navigate('/Home')
            })
            .catch((error) => {
                console.log(error.code)
            });
    }
    let handleEmail = (e) => {
        setEmail(e.target.value)
        // when we get a value in email input then emailerr should be empty string
        // we can also done the same thing by value={email}
        setEmailerr('');
    }
    let handlePassword = (e) => {
        setPassword(e.target.value)
        setPassworderr('')
    }
    let handleLogin = () => {
        if (!email) {
            setEmailerr("Email is required")
        }
        if (!password) {
            setPassworderr("Password is required")
        }
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    dispatch(userLoginInfo(user.user))
                    localStorage.setItem('userInfo',(JSON.stringify(user.user)))
                    console.log(user);
                    setPassworderr('');
                    navigate('/Home');
                })
                .catch((error) => {
                    if (error.code.includes('auth/invalid-credential')) {
                        setPassworderr("Wrong information. Try again")
                    }
                });
        }
    }
    let handleForgetPassword = () => {
        setForgetModal(true)
    }
    let handleForgetInput = (e) => {
        setForgetEmail(e.target.value);
        setPasswordResetErr('');
    }
    let handleResetMail = () => {
        if (!forgetEmail) {
            setPasswordResetErr('Email cannot be empty')
        }
        else {
            sendPasswordResetEmail(auth, forgetEmail)
                .then((user) => {
                    // Password reset email sent!
                    setForgetModal(false)
                })
                .catch((error) => {
                    if (error.code.includes('auth/missing-email')) {

                    }
                });
        }
    }
    // This portion was designed for vanish forget modal window after clicking outside the div
    // ----------------------------------------------------------------------------------------
    // useEffect(()=>{
    //     document.body.addEventListner('click',function(e) {
    //         if(ref.current.contains(e.target)){
    //             setForgetModal(true);
    //         }
    //         else{
    //             setForgetModal(false)
    //         }
    //     })
    // },[])
    return (
        <div className='flex'>
            {/* ---------------------------Image Div-------------------------------- */}
            <div className='w-1/2 '>
                <img className='h-screen w-full object-cover' src="images/login.jpg" alt="login" />
            </div>

            {/* -----------------------Sign In/Login Div--------------------------- */}

            <div className='w-1/2 bg-[url("images/bg3.jpg")] bg-cover  bg-no-repeat h-screen '>
                <div className='text-center mt-3 me-32'>
                    <a className='font-nova font-normal text-6xl text-purple ' href="#">ChitChat</a>
                </div>
                <div className='ml-[140px] mt-[40px]'>
                    <h1 className='font-nunito font-bold text-[32px] text-darkblue mb-8'>Login to your account!</h1>
                    <Link className='flex gap-3 p-4 mb-12 border-2 border-sm border-slate-300 rounded-xl w-[250px]'>
                        <img className='w-6 h-6' src="images/google.png" alt="google" />
                        <span onClick={handleGoogleLogin} className='font-nunito text-lg font-semibold text-darkblue tracking-[1px]'>Login with Google</span>
                    </Link>
                    {/* <p className='font-nunito font-normal text-xl text-darkblue mt-[40px] '>
                        Email Address
                    </p> */}

                    {/* -----------------------Email Address input--------------------- */}

                    <div className='relative mb-9'>
                        <p className='font-nunito text-sm font-semibold text-darkblue tracking-[1px] absolute top-[-7px] left-[50px] bg-white w-[120px] text-center'>Email Address</p>
                        <input onChange={handleEmail} className=' border border-1 rounded-lg p-4 border-solid border-darkblue w-[350px] font-nunito font-semibold text-xl text-darkblue' type="email" value={email} />
                        {emailerr && <p className='bg-red-500 text-sm text-white rounded-b-lg w-[350px] pl-5'> {emailerr} </p>}
                    </div>

                    {/* ------------------Password Input------------------------- */}

                    <div className='relative mb-9 w-[350px]' >
                        <p className='font-nunito text-sm font-semibold text-darkblue tracking-[1px] absolute top-[-7px] left-[50px] bg-white w-[120px] text-center'>Password</p>
                        <input onChange={handlePassword} className=' border border-1 rounded-lg p-4 border-solid border-darkblue w-full  font-nunito font-semibold text-xl text-darkblue' type={passwordShow ? "text" : "password"} value={password} />
                        {passwordShow ?
                            (<IoMdEye onClick={() => setPasswordShow(false)} className='absolute top-5 right-3 text-xl' />)
                            :
                            (<IoMdEyeOff onClick={() => setPasswordShow(true)} className='absolute top-5 right-3 text-xl' />)
                        }
                        {passworderr && <p className='bg-red-500 text-sm text-white rounded-b-lg w-[350px] pl-5'> {passworderr} </p>}
                    </div>

                    {/* ----------------------Login Button---------------------- */}

                    <Link onClick={handleLogin}
                        className='inline-block text-center w-[330px] bg-purple mb-5 py-[12px] font-nunito text-xl font-normal text-white rounded-[86px]' href="#">
                        Login to Continue
                    </Link>

                    {/* -------------------Sign Up Link--------------------- */}

                    <p className='font-nunito font-normal text-sm text-[#03014C] w-[340px] text-center'>
                        Don't have an account ?
                        <Link className='text-[#EA6C00]' to='/Registration'>
                            Sign Up
                        </Link>

                        {/*------------------- Forget Button-------------- */}

                        <div className='mt-1'>
                            {/* --------the below portion for a different page of forget password------- */}

                            {/* <Link to='/forgetpassword' className='font-nunito font-normal text-sm text-[#03014C] '>
                             Forget Password
                        </Link> */}

                            {/* ---------------Button is taken for using modal for forget password------------ */}

                            <button onClick={handleForgetPassword} className='font-nunito font-normal text-sm text-[#03014C] '>
                                Forget Password
                            </button>
                        </div>
                    </p>
                </div>
            </div>
            {/* ---------------Forget modal Design for displaying on same page of login--------------- */}

            {forgetModal &&
                <div className='w-full h-screen bg-[rgba(0,0,0,.7)] absolute top-0 left-0 flex justify-center items-center'>
                    <div ref={reference} className='w-[400px] h-[220px] bg-[#C2BBFF] rounded-lg p-6'>
                        <h1 className=' font-nunito text-2xl text-darkblue'>Reset Password</h1>
                        <input onChange={handleForgetInput} className=' border border-1 rounded-lg mt-4 p-4 border-solid border-darkblue w-[350px] font-nunito font-semibold text-xl text-darkblue ' type="email" placeholder='Enter your email' />
                        <p className='bg-red-500 text-sm text-white rounded-b-lg w-[350px] pl-5'>
                            {passwordResetErr}
                        </p>

                        <button onClick={handleResetMail} className='font-nunito text-lg rounded-md text-white bg-[#2a1969] mt-4 px-3 py-1'>Submit</button>

                        <button onClick={() => setForgetModal(false)} className='font-nunito text-lg rounded-md text-white bg-[#fedc01bd] px-3 py-1  ml-3'>
                            Cancel
                        </button>
                    </div>
                </div>
            }

        </div>
    )
}

export default Login