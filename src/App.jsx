import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRouter from "./Router/AdminRouter";

import UserRouter from "./Router/UserRouter";

import DoctorRouter from "./Router/DoctorRouter";
import DoctorLogin from "./Component/Auth/DoctorLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<UserRouter />} />
        <Route exact path="/admin/*" element={<AdminRouter />} />

        <Route exact path="/doctor/*" element={<DoctorRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
