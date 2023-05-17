import React from 'react'
import CategoryDoctor from '../../Component/user/CategoryDoctor'
import UserNavbar from '../../Component/user/UserNavbar'
import Search from '../../Component/search/Search'
import Footer from '../../Component/userFooter/Footer'
function DepartmentDoctor() {
  return (
    <div>
         <UserNavbar/>
        <Search/>
        <CategoryDoctor/>
        <Footer/>
        </div>
  )
}

export default DepartmentDoctor