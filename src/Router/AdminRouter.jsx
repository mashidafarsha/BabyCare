import React from "react";
import { Routes, Route } from "react-router-dom";
import Adminhome from "../Pages/Admin/Adminhome";
import Adminlogin from "../Pages/Admin/Adminlogin";
import AdminCategory from "../Pages/Admin/AdminCategory";
import Doctorapprovel from "../Pages/Admin/Doctorapprovel";
import AdminPlans from "../Pages/Admin/AdminPlans";
import AdminBanner from "../Pages/Admin/AdminBanner";
import PrivateRoute from "../protectedRoutes/PrivateRoute";
import AllApprovedDoctor from "../Pages/Admin/AllApprovedDoctor";
import AdminLayout from "../layout/AdminLayout";
import AllbookingDetails from "../Pages/Admin/AllbookingDetails";
function AdminRouter() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute role={"admin"} route={"/admin"} />}>
          <Route element={<AdminLayout />}>
            <Route path="/adminHome" element={<Adminhome />} />
            <Route path="/category" element={<AdminCategory />} />
            <Route path="/doctorApprovel" element={<Doctorapprovel />} />
            <Route path="/doctor" element={<AllApprovedDoctor />} />
            <Route path="/banner" element={<AdminBanner />} />
            <Route path="/plans" element={<AdminPlans />} />
            <Route path="/allBooking" element={<AllbookingDetails />} />
          </Route>
        </Route>
        <Route path="/" element={<Adminlogin />} />
      </Routes>
    </>
  );
}

export default AdminRouter;
