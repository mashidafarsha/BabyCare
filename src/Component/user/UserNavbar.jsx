import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../constants/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HeartPulse, Layout, Calendar, MessageSquare, User, Settings, LogOut, ChevronDown, Menu, X, Bell, Shield } from "lucide-react";

function UserNavbar() {
  const [image, setImage] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    if (user?.image) setImage(user.image);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user]);

  const navLinks = [
    { name: "Specialities", path: "/department", icon: <Layout size={16} /> },
    { name: "Plans", path: "/plans", icon: <Shield size={16} /> },
    { name: "Appointments", path: "/myAppointment", icon: <Calendar size={16} /> },
    { name: "Messages", path: "/chat", icon: <MessageSquare size={16} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 backdrop-blur-xl shadow-sm py-3 border-b border-slate-100" 
        : "bg-white py-5 border-b border-slate-50"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
              <HeartPulse size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              True<span className="text-blue-600">Care</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  location.pathname === link.path 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  {image ? (
                    <img className="w-full h-full object-cover" src={`${BaseUrl}/${image}`} alt="profile" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-bold">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-none">{user?.name?.split(" ")[0] || "User"}</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1">Premium</p>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </label>
              
              <ul tabIndex={0} className="mt-4 p-2 shadow-xl menu menu-compact dropdown-content bg-white rounded-2xl w-64 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-5 py-4 mb-2 bg-slate-50 rounded-xl">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account</p>
                  <p className="text-sm font-bold text-slate-800 truncate">{user?.name || "Patient"}</p>
                </div>
                <li>
                  <Link to="/profile" className="flex items-center gap-3 p-3 rounded-lg text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                    <User size={18} /> My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/myAppointment" className="flex items-center gap-3 p-3 rounded-lg text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                    <Calendar size={18} /> Appointments
                  </Link>
                </li>
                <div className="h-px bg-slate-100 my-2"></div>
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 bg-slate-900 text-white rounded-xl active:scale-95 transition-all"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 p-6 animate-in slide-in-from-top-4 duration-300 shadow-xl">
          <div className="grid grid-cols-1 gap-3">
             {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    location.pathname === link.path 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                      : "bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="font-bold text-sm">{link.name}</span>
                </Link>
             ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default UserNavbar;