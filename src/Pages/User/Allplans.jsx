import React from 'react'
import AllPlans from '../../Component/user/AllPlans'
import Search from '../../Component/search/Search'
import UserNavbar from '../../Component/user/UserNavbar'
function Allplans() {
  return (
    <div>
 <UserNavbar/>
        <Search/>
   <AllPlans/>  
    </div>
   
  )
}

export default Allplans