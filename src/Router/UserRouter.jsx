import React from "react";
import { Routes, Route } from "react-router-dom";
import Userhome from "../Pages/User/Userhome";
import Userlogin from "../Pages/User/Userlogin";
import UserLayout from "../layout/UserLayout";
import Allspecialities from "../Pages/User/Allspecialities";
import Allplans from "../Pages/User/Allplans";
function UserRouter() {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route exact path="/" element={<Userlogin />} />
          <Route exact path="/home" element={<Userhome />} />
          <Route exact path="/department" element={<Allspecialities />} />
          <Route exact path="/plans" element={<Allplans/>} />
        </Route>
      </Routes>
    </>
  );
}

export default UserRouter;
