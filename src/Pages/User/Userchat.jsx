import React from 'react'
import UserChat from '../../Component/chat/UserChat'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'
function Userchat() {
  return (
    <div>
        <UserNavbar/>
        <UserChat/>
        <Footer/>
    </div>
  )
}

export default Userchat