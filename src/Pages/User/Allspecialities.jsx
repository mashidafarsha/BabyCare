import React from 'react'
import AllSpecialiteisUser from '../../Component/AllSpecialiteisUser'
import Search from '../../Component/search/Search'
import UserNavbar from '../../Component/user/UserNavbar'
function Allspecialities() {
  return (
    <div>
        <UserNavbar/>
        <Search/>
        <AllSpecialiteisUser/>
    </div>
  )
}

export default Allspecialities