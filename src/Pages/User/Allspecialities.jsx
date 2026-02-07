import React from 'react'
import AllSpecialiteisUser from '../../Component/user/AllSpecialiteisUser'
import Search from '../../Component/search/Search'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'
function Allspecialities() {
  return (
    <div className="min-h-screen bg-slate-50">
        <UserNavbar/>
        {/* Navbar screen-il space edukkathaathukondu ivide pt-20 or pt-24 nalkanam */}
        <div className="pt-20"> 
            <Search/>
            <AllSpecialiteisUser/>
        </div>
        <Footer/>
    </div>
  )
}

export default Allspecialities