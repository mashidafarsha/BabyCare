import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getNavProfile } from "../../sevices/doctorApi";
import { BaseUrl } from "../../constants/constants";
import { Layout, Calendar, Users, MessageSquare, LogOut, User, Settings, HeartPulse, ChevronDown } from "lucide-react";

function DoctorNavbar() {
  const [doctorImage, setDoctorImage] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getDoctorData();
  }, []);

  const getDoctorData = async () => {
    try {
      let { data } = await getNavProfile();
      if (data?.doctorProfile) {
        setDoctorImage(data.doctorProfile.image);
        setDoctorName(data.doctorProfile.name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    navigate("/doctor/doctorLogin");
  };

  const navLinks = [
    { name: "Schedules", path: "/doctor/doctorSlot", icon: <Layout size={16} /> },
    { name: "My Slots", path: "/doctor/doctorSchedules", icon: <Calendar size={16} /> },
    { name: "Patients", path: "/doctor/bookingDetails", icon: <Users size={16} /> },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          
          {/* Brand Identity */}
          <div className="flex items-center">
            <Link to="/doctor" className="group flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-[1rem] shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-500">
                 <HeartPulse size={22} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-slate-800 tracking-tighter italic uppercase leading-none">
                  True <span className="text-blue-600">Care</span>
                </h1>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 pl-0.5">Practitioner</p>
              </div>
            </Link>
          </div>

          {/* Clinical Navigation */}
          <div className="hidden md:flex items-center bg-slate-50/50 p-1.5 rounded-[1.5rem] border border-slate-100">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  location.pathname === link.path 
                    ? "bg-white text-blue-600 shadow-sm border border-blue-50" 
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Interaction Zone */}
          <div className="flex items-center gap-6">
            <Link 
              to="/doctor/doctorChat" 
              className="relative p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm group"
            >
              <MessageSquare size={20} />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></div>
            </Link>

            <div className="h-8 w-px bg-slate-100 mx-2"></div>

            <div className="dropdown dropdown-end group/drop">
              <label tabIndex={0} className="flex items-center gap-3 p-1.5 pr-4 rounded-[1.5rem] hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-11 h-11 rounded-2xl border-2 border-white shadow-md overflow-hidden bg-slate-100">
                  <img src={doctorImage || "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"} alt="Practitioner" className="w-full h-full object-cover" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight italic">Dr. {doctorName?.split(" ")[0] || "Practitioner"}</p>
                  <p className="text-[9px] font-bold text-green-500 uppercase flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Active
                  </p>
                </div>
                <ChevronDown size={14} className="text-slate-400 group-hover/drop:rotate-180 transition-transform" />
              </label>
              
              <ul tabIndex={0} className="mt-6 p-3 shadow-2xl menu menu-compact dropdown-content bg-white/95 backdrop-blur-xl rounded-[2rem] w-64 border border-slate-100 animate-in slide-in-from-top-2 duration-300">
                <div className="px-4 py-3 mb-2 bg-slate-50 rounded-2xl">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical Identity</p>
                   <p className="text-sm font-black text-slate-800 mt-1 truncate">Dr. {doctorName || "Unknown"}</p>
                </div>
                
                <li>
                  <Link to="/doctor" className="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <User size={18} /> Practitioner Profile
                  </Link>
                </li>
                <li>
                  <Link to="/doctor/doctorSlot" className="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Settings size={18} /> Schedule Manager
                  </Link>
                </li>
                
                <div className="h-px bg-slate-100 my-2 mx-4"></div>
                
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors w-full">
                    <LogOut size={18} /> Terminate Session
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DoctorNavbar;