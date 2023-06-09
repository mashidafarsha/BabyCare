import React from "react";
import { Routes, Route } from "react-router-dom";

import DoctorInfo from "../Component/doctor/DoctorInfo";
import Waitingapprovel from "../Pages/Doctor/Waitingapprovel";
import DoctorLogin from "../Component/Auth/DoctorLogin";
import PrivateRoute from "../protectedRoutes/PrivateRoute";
import Doctorprofile from "../Pages/Doctor/Doctorprofile";
import DoctorSlotBook from "../Pages/Doctor/DoctorSlotBook";
import DoctorselectedSlot from "../Pages/Doctor/DoctorselectedSlot";
import DoctorLayout from "../layout/DoctorLayout";
import Doctorsignup from "../Pages/Doctor/Doctorsignup";
import Bookinguserdetails from "../Pages/Doctor/Bookinguserdetails";
import DoctorChatPge from "../Pages/Doctor/DoctorChatPge";
import Error from "../Pages/Error/Error";
function DoctorRouter() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute role={"doctor"} route={"/doctor"} />}>
          <Route element={<DoctorLayout />}>
            <Route path="/" element={<Doctorprofile />} />
            <Route path="/doctorSlot" element={<DoctorSlotBook />} />
            <Route path="/doctorSchedules" element={<DoctorselectedSlot />} />
            <Route path="/bookingDetails" element={<Bookinguserdetails/>} />
            <Route path="/doctorChat" element={<DoctorChatPge/>} />
            <Route  path="/*" element={<Error/>} />
          </Route>
        </Route>


        <Route path="/doctorLogin" element={<DoctorLogin />} />
        <Route path="/signup" element={<Doctorsignup />} />
        <Route path="/info" element={<DoctorInfo />} />
        <Route path="/waiting" element={<Waitingapprovel />} />
      </Routes>
    </>
  );
}

export default DoctorRouter;
