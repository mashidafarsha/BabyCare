import React from 'react'
import UserProfile from '../../Component/profile/UserProfile'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'
function Userprofile() {
  return (
    <div>
        <UserNavbar/>
        <UserProfile/>
        <Footer/>
        </div>
  )
}

export default Userprofile