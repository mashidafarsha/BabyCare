import React, { useState } from 'react'
import AllSpecialiteisUser from '../../Component/user/AllSpecialiteisUser'
import Search from '../../Component/search/Search'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'

function Allspecialities() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-slate-50">
        <UserNavbar/>
        {/* Navbar screen-il space edukkathaathukondu ivide pt-20 or pt-24 nalkanam */}
        <div className="pt-20 animate-fade-in"> 
            <div className="animate-slide-up">
                <Search 
                  value={searchTerm} 
                  onChange={setSearchTerm} 
                  placeholder="Search for clinical specialities..." 
                />
            </div>
            <div className="animate-slide-up delay-200">
                <AllSpecialiteisUser searchTerm={searchTerm} />
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Allspecialities