import React from 'react'
import {Outlet} from "react-router-dom"
import AdminNavbar from '../Component/admin/AdminNavbar'
import AdminSidebar from '../Component/admin/AdminSidebar'
function AdminLayout() {
  return (
    <div className="max-w-screen-xl mx-auto rounded-2xl">
      <AdminNavbar />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content border p-2 bg-slate-200">
          <div className="mx-auto">
            <Outlet />
          </div>
        </div>
        <AdminSidebar />
      </div>
    </div>
  );
}

export default AdminLayout