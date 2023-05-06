import React from "react";
import { Routes, Route } from "react-router-dom";
import DoctorNavbar from "../Component/doctor/DoctorNavbar";
import DoctorInfo from "../Component/doctor/DoctorInfo";
import Waitingapprovel from "../Pages/Doctor/Waitingapprovel";
import DoctorLogin from "../Component/Auth/DoctorLogin";
import PrivateRoute from "../protectedRoutes/PrivateRoute";
import Doctorprofile from "../Pages/Doctor/Doctorprofile";
import DoctorSlotBook from "../Pages/Doctor/DoctorSlotBook";
import DoctorselectedSlot from "../Pages/Doctor/DoctorselectedSlot";
import DoctorLayout from "../layout/DoctorLayout";
function DoctorRouter() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute role={"doctor"} route={"/doctor"} />}>
          <Route element={<DoctorLayout />}>
            <Route path="/doctorHome" element={<Doctorprofile />} />
            <Route path="/doctorSlot" element={<DoctorSlotBook />} />
            <Route path="/doctorSchedules" element={<DoctorselectedSlot />} />
          </Route>
        </Route>


        <Route path="/" element={<DoctorLogin />} />
        <Route path="/info" element={<DoctorInfo />} />
        <Route path="/waiting" element={<Waitingapprovel />} />
      </Routes>
    </>
  );
}

export default DoctorRouter;
