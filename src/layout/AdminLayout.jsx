import React from 'react'
import {Outlet} from "react-router-dom"
import AdminNavbar from '../Component/admin/AdminNavbar'
import AdminSidebar from '../Component/admin/AdminSidebar'
function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-grow p-8 overflow-x-hidden">
          <div className="max-w-screen-2xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout