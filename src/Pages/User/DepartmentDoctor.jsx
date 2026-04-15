import React from 'react'
import CategoryDoctor from '../../Component/user/CategoryDoctor'
import UserNavbar from '../../Component/user/UserNavbar'
import Search from '../../Component/search/Search'
import Footer from '../../Component/userFooter/Footer'

function DepartmentDoctor() {
  return (
    <div className="min-h-screen bg-slate-50">
         <UserNavbar/>
          <main className="pt-28 animate-fade-in"> {/* Navbar gap fix */}
            <div className="animate-slide-up delay-200">
                <CategoryDoctor/>
            </div>
          </main>
         <Footer/>
    </div>
  )
}

export default DepartmentDoctor