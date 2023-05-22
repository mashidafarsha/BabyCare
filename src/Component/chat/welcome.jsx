import React from 'react'
import Robot from '../../assets/robot welcome.gif'
function welcome() {
  return (
    <div className='flex justify-center items-center flex-col text-black'>
        <img className='h-40' src={Robot} alt="Robot" />
        <h1>Welcome</h1>
        <h3>Please Select a Chat to Start Messaging</h3>
    </div>
  )
}

export default welcome