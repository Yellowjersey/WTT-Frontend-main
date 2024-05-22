'use client'
import React from 'react'
import Lottie from 'react-lottie-player'
import loder from './loader.json';

const Loader = () => {
  return (
    <div className="relative">
      <div className='w-screen h-screen fixed top-0 left-0 bg-black/80 flex items-center justify-center z-[999]'>
        <Lottie
          loop
          animationData={loder}
          play
          style={{ width: 320, height: 320 }}
        />
      </div>
    </div>
  )
}

export default Loader