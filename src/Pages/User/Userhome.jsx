import React from 'react'
import Banner from '../../Component/user/Banner'
import UserNavbar from '../../Component/user/UserNavbar'
import SubBanner from '../../Component/user/SubBanner'
import PlanBanner from '../../Component/heromodal/PlanBanner'
import DepartmentBanner from '../../Component/user/DepartmentBanner'
import Footer from '../../Component/userFooter/Footer'
function Userhome() {
  return (
    <div>
        <UserNavbar/>
        <Banner/>
        <DepartmentBanner/>
        
         <PlanBanner/>
         <SubBanner/>
         <Footer/>
    </div>
  )
}

export default Userhome