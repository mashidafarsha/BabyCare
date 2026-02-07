import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getNavProfile } from "../../sevices/doctorApi";
import { BaseUrl } from "../../constants/constants";

function DoctorNavbar() {
  const [doctorImage, setDoctorImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getDoctorData();
  }, []);

  const getDoctorData = async () => {
    try {
      let { data } = await getNavProfile();
      setDoctorImage(data.doctorProfile.image);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    navigate("/doctor/doctorLogin");
  };

  return (
    <div className="sticky top-0 z-50 shadow-sm bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/doctor" className="group">
              <h1 className="text-2xl font-black text-slate-800 tracking-tighter italic uppercase">
                True <span className="text-blue-600">Care</span>
              </h1>
              <div className="h-1 w-0 group-hover:w-full bg-blue-600 transition-all duration-300 rounded-full"></div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/doctor/doctorSlot" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">All Slots</Link>
            <Link to="/doctor/doctorSchedules" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">My Slots</Link>
            <Link to="/doctor/bookingDetails" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest text-[11px]">Booking Users</Link>
            <Link to="/doctor/doctorChat" className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Chat</Link>
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-blue-100 hover:border-blue-500 transition-all">
              <div className="w-10 rounded-full">
                <img src={`${BaseUrl}/${doctorImage}`} alt="profile" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-4 p-2 shadow-2xl menu menu-compact dropdown-content bg-white rounded-2xl w-52 border border-slate-100">
              <li className="menu-title font-black text-[10px] uppercase text-slate-400 p-2">Settings</li>
              <li><Link to="/doctor/profile" className="font-bold">My Profile</Link></li>
              <li className="mt-2 border-t pt-2">
                <button onClick={handleLogout} className="text-red-600 font-bold hover:bg-red-50">Logout</button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DoctorNavbar;