import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adminlogin from './Pages/Admin/Adminlogin';
import Doctorsignup from './Pages/Doctor/Doctorsignup';
import Doctorlogin from './Pages/Doctor/Doctorlogin';
import Adminhome from './Pages/Admin/Adminhome';
import Doctorotp from './Pages/Doctor/Doctorotp';
import Doctorinfo from './Pages/Doctor/Doctorinfo';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Adminlogin />} />
      <Route exact path="/DoctorSignup" element={<Doctorsignup/>} />
      <Route exact path="/Doctor" element={<Doctorlogin/>} />
      <Route exact path="/adminHome" element={<Adminhome/>} />
      <Route exact path="/DoctorOtp" element={<Doctorotp/>} />
      <Route exact path="/DoctorInfo" element={<Doctorinfo/>} />

    </Routes>
  </BrowserRouter>
  )
}

export default App

