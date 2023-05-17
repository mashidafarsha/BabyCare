import React from 'react'
import UserNavbar from '../../Component/user/UserNavbar'
import DoctorDetailsDisplay from '../../Component/doctorDetailsDisplay/DoctorDetailsDisplay'
import Footer from '../../Component/userFooter/Footer'
function DoctorDetails() {
  return (
    <div>
           <UserNavbar/>
           <DoctorDetailsDisplay/>
           <Footer/>
    </div>
  )
}

export default DoctorDetails