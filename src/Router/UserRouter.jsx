import React from "react";
import { Routes, Route } from "react-router-dom";
import Userhome from "../Pages/User/Userhome";
import Userlogin from "../Pages/User/Userlogin";
import UserLayout from "../layout/UserLayout";
import Allspecialities from "../Pages/User/Allspecialities";
import Allplans from "../Pages/User/Allplans";
import DepartmentDoctor from "../Pages/User/DepartmentDoctor";
import PrivateRoute from "../protectedRoutes/PrivateRoute";
import DoctorDetails from "../Pages/User/DoctorDetails";
import UserSlotBook from "../Pages/User/UserSlotBook";
import UserAppointment from "../Pages/User/UserAppointment";
import Usersignup from "../Pages/User/Usersignup";
import Userprofile from "../Pages/User/Userprofile";
import Userchat from "../Pages/User/Userchat";
function UserRouter() {
  return (
    <>
      <Routes>
      <Route element={<PrivateRoute role={"user"} route={"/"} />}>
        <Route element={<UserLayout />}>
      
          <Route exact path="/home" element={<Userhome />} />
          <Route exact path="/profile" element={<Userprofile />} />
          <Route exact path="/department" element={<Allspecialities />} />
          <Route exact path="/departmentDoctor" element={<DepartmentDoctor />} />
          <Route exact path="/plans" element={<Allplans/>} />
          <Route exact path="/doctorDetails" element={<DoctorDetails/>} />
          <Route exact path="/userSlots" element={<UserSlotBook/>} />
          <Route exact path="/myAppointment" element={<UserAppointment/>} />
          <Route exact path="/chat" element={<Userchat/>} />
        </Route>
        </Route>
        <Route exact path="/" element={<Userlogin />} />
        <Route exact path="/signup" element={<Usersignup />} />
      </Routes>
    </>
  );
}

export default UserRouter;
