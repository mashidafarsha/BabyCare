import React from 'react'

import {Outlet} from "react-router-dom"
function UserLayout() {
  return (
    <div>
        <div className="max-w-screen-xl mx-auto rounded-2xl">
      
        <Outlet/>
      </div>
    </div>
  )
}

export default UserLayout