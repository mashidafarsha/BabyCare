import React from 'react'
import UserSlots from '../../Component/slot/UserSlots'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'

function UserSlotBook() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
        <UserNavbar/>
        <main className="flex-grow pt-28 pb-12">
            <UserSlots/>
        </main>
        <Footer/>
    </div>
  )
}

export default UserSlotBook