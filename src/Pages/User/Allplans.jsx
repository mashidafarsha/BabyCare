import React from 'react'
import AllPlans from '../../Component/user/AllPlans'
import Search from '../../Component/search/Search'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'
function Allplans() {
  return (
    <div>
 <UserNavbar/>
        <Search/>
   <AllPlans/>  
   <Footer/>
    </div>
   
  )
}

export default Allplans