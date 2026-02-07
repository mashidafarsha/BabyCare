import React from 'react'
import UserChat from '../../Component/chat/UserChat'
import UserNavbar from '../../Component/user/UserNavbar'

function Userchat() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <UserNavbar />
      <div className="flex-grow">
        <UserChat />
      </div>
    </div>
  )
}

export default Userchat