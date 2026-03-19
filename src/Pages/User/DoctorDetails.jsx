import React from 'react'
import UserNavbar from '../../Component/user/UserNavbar'
import DoctorDetailsDisplay from '../../Component/doctorDetailsDisplay/DoctorDetailsDisplay'
import Footer from '../../Component/userFooter/Footer'

function DoctorDetails() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
        <UserNavbar/>
        <main className="flex-grow pt-28 pb-12 animate-fade-in"> {/* Spacing for fixed navbar */}
           <div className="animate-slide-up">
              <DoctorDetailsDisplay/>
           </div>
        </main>
        <Footer/>
    </div>
  )
}

export default DoctorDetails