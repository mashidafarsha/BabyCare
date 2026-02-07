import React, { useEffect } from 'react'
import Banner from '../../Component/user/Banner'
import UserNavbar from '../../Component/user/UserNavbar'
// import SubBanner from '../../Component/user/SubBanner'
import PlanBanner from '../../Component/heromodal/PlanBanner'
import DepartmentBanner from '../../Component/user/DepartmentBanner'
import Footer from '../../Component/userFooter/Footer'
function Userhome() {
  // useEffect(() => {
  //   if(!localStorage.getItem("userToken")){
  //     navigate('/login')
  //   }
  // }, [])
  return (
    <div className="w-full flex flex-col min-h-screen">
       <UserNavbar />
       
       {/* Content Blocks */}
       <div className="flex-grow">
          <Banner />
          
          {/* attractive aakan thazhe ulla section-u mathram cheriya padding nalkaam */}
          <div className="max-w-screen-2xl mx-auto px-4 md:px-10 space-y-10">
             <DepartmentBanner />
             <PlanBanner />
          </div>
       </div>
       
       <Footer />
    </div>
  )
}

export default Userhome