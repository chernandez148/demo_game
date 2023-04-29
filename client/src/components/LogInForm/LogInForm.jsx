import React from 'react'
import { IoClose } from 'react-icons/io5';


function LogInForm({ handleFadeOut, fadeIn }) {

    const modelMox = fadeIn ? "opacity-1" : "opacity-0"

    return (
        <div className={`model-box bg-dark px-3 py-5 ${modelMox}`}>
            <IoClose className='cursor-pointer float-right' onClick={handleFadeOut} />
            <h2 className='mt-4 mb-4'>Sign In</h2>
            <form className='flex flex-col'>
                <input className='mb-4 border rounded-0 p-1' type="text" placeholder='Username' />
                <input className='border rounded-0 p-1' type="password" placeholder='Password' />
                <button className='mt-4 border rounded-0 p-1' type='submit'>Sign In</button>
            </form>
        </div>
    )
}

export default LogInForm