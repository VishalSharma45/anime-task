import React from 'react'
import Gif from '../assets/ZJFD.gif'

const Loading = () => {
    return (
        <div className=''>
            <div className='px-2 py-4 w-full backdrop-blur-lg bg-white flex flex-col items-center justify-center'>
                <img className='w-56 h-56' src={Gif} alt="loading gif" />
                <h1 className='text-2xl italic mt-2'>Loading your anime...</h1>
            </div>
        </div>
    )
}

export default Loading