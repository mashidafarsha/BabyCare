import React from 'react'
import AllSpecialiteisUser from '../../Component/user/AllSpecialiteisUser'
import Search from '../../Component/search/Search'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'
function Allspecialities() {
  return (
    <div>
        <UserNavbar/>
        <Search/>
        <AllSpecialiteisUser/>
        <Footer/>
    </div>
  )
}

export default Allspecialities