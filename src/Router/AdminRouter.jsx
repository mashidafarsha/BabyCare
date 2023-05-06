import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../Component/admin/AdminSidebar";
import Adminhome from "../Pages/Admin/Adminhome";
import AdminNavbar from "../Component/admin/AdminNavbar";
import Adminlogin from "../Pages/Admin/Adminlogin";
 import AdminCategory from "../Pages/Admin/AdminCategory";
import Doctorapprovel from "../Pages/Admin/Doctorapprovel";
import AdminPlans from "../Pages/Admin/AdminPlans";
import AdminBanner from "../Pages/Admin/AdminBanner";
import PrivateRoute from "../protectedRoutes/PrivateRoute";
import AllApprovedDoctor from "../Pages/Admin/AllApprovedDoctor";

function AdminRouter() {
  return (
    <>
<AdminNavbar/>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
        <div className="mx-auto max-w-fit">
          <Routes>
            <Route  element={<PrivateRoute role={"admin"} route={'/admin'}/>}>
            <Route  path="/adminHome" element={<Adminhome/>} />
            <Route  path="/category" element={<AdminCategory/>} />
            <Route  path="/doctorApprovel" element={<Doctorapprovel/>} />
            <Route  path="/doctor" element={<AllApprovedDoctor/>} />
            <Route  path="/banner" element={<AdminBanner/>} />
            <Route  path="/plans" element={<AdminPlans/>} />
            </Route>
            <Route path='/' element={<Adminlogin/>} />
          </Routes>
        </div></div>
        <AdminSidebar/>
      </div>

    </>
  );
}

export default AdminRouter;
