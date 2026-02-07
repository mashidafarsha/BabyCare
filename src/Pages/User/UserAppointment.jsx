import React from 'react'
import AppointmentDetails from '../../Component/userAppointment/AppointmentDetails'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'

function UserAppointment() {
  return (
   
    <div className="flex flex-col min-h-screen bg-slate-50">
     
      <UserNavbar />

     
      <main className="flex-grow flex flex-col items-center justify-start py-8">
        <div className="w-full">
          <AppointmentDetails />
        </div>
      </main>

   
      <Footer />
    </div>
  )
}

export default UserAppointment