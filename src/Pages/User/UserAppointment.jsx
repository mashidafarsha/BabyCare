import React from 'react'
import AppointmentDetails from '../../Component/userAppointment/AppointmentDetails'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'
function UserAppointment() {
  return (
    <div>
        <UserNavbar/>
        <AppointmentDetails/>
        <Footer/>
    </div>
  )
}

export default UserAppointment