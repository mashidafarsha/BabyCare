import React from 'react'
import AllPlans from '../../Component/user/AllPlans'
import Search from '../../Component/search/Search'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'

function Allplans() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
        <UserNavbar/>
        <main className="flex-grow pt-28"> {/* Fixed navbar space padding */}
            <Search/>
            <AllPlans/>  
        </main>
        <Footer/>
    </div>
  )
}

export default Allplans