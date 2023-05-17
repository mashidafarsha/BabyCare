import React from 'react'
import UserSlots from '../../Component/slot/UserSlots'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'
function UserSlotBook() {
  return (
    <div>
        <UserNavbar/>
        <UserSlots/>
        <Footer/>
    </div>
  )
}

export default UserSlotBook