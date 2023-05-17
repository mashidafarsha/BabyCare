import React from 'react'

function Message() {
  return (
    <div className='flex flex-col mt-5'>
    <div className="flex ">
      <img
      src=''
        alt=""
        className='object-cover w-8 h-8 mr-3 rounded-full '
      />
      <p
        className='max-w-xs p-3 rounded-3xl'
      >
        messagetext
      </p>
    </div>
    <div className="mt-3 text-xs">message.createdAt</div>
  </div>
  )
}

export default Message