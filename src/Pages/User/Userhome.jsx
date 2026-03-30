import React, { useEffect } from 'react'
import Banner from '../../Component/user/Banner'
import UserNavbar from '../../Component/user/UserNavbar'
// import SubBanner from '../../Component/user/SubBanner'
import PlanBanner from '../../Component/heromodal/PlanBanner'
import DepartmentBanner from '../../Component/user/DepartmentBanner'
import TrustStats from '../../Component/user/TrustStats';
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
         <div className="flex-grow animate-fade-in">
            <Banner />
            
            <div className="-mt-20 relative z-20">
               <TrustStats />
            </div>

            <div className="space-y-12 pb-20">
               <div className="animate-slide-up delay-200">
                  <DepartmentBanner />
               </div>
               
               <div className="animate-slide-up delay-500">
                  <PlanBanner />
               </div>
            </div>
         </div>

         <Footer />
      </div>
   )
}

export default Userhome