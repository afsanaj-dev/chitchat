import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { increment } from './src/Slices/counterSlice';

const Test = () => {
    let [inputv, setInputV] = useState("");
    let dispatch= useDispatch();
    let data = useSelector((testData) => testData.incrementSlice.value)
   let  handleSubmit = () => {
        // using dispatch we are sending inputV value to counterSlice/ Redux store
        dispatch(increment(inputv))
    }
   let handleInput = (e) => {
        setInputV = e.target.value
    }
    return (
        <div>
            <h1>{data}</h1>
            <input onChange={handleInput} className='border border-solid' type="text" />
            <button onClick={handleSubmit} className='bg-blue-500 p-2'>Submit</button>
        </div>
    )
}

export default Test