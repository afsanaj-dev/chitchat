import React from 'react'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
  return (
    <div className='w-100 h-screen bg-[url("images/forgetpassword.jpg")] bg-no-repeat bg-right-bottom flex justify-center items-center'>
      <div className='w-[400px] h-[220px] bg-[#C2BBFF] rounded-lg p-6'>
        <h1 className=' font-nunito text-2xl text-darkblue'>Reset Password</h1>
        <input className=' border border-1 rounded-lg my-4 p-4 border-solid border-darkblue w-[350px] font-nunito font-semibold text-xl text-darkblue ' type="email" placeholder='Enter your email' />
        <button className='font-nunito text-lg rounded-md text-white bg-[#2a1969] px-3 py-1'>Submit</button>
        <button className='font-nunito text-lg rounded-md text-white bg-[#fedc01bd] px-3 py-1  ml-3'>
          <Link to={'/Login'} >Cancel</Link>
        </button>
      </div>
    </div>
  )
}

export default ForgetPassword