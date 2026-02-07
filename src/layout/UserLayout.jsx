import React from 'react'
import { Outlet } from "react-router-dom"

function UserLayout() {
  return (
    // "max-w-screen-xl" and "mx-auto" ivide ninnu maatti
    <div className="w-full min-h-screen bg-white">
      <Outlet />
    </div>
  )
}

export default UserLayout