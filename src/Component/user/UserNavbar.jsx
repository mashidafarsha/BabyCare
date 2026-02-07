import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../constants/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserNavbar() {
  const [image, setImage] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Scroll cheyymbol navbar style maaraan
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    if (user?.image) setImage(user.image);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user]);

  const navLinks = [
    { name: "Departments", path: "/department" },
    { name: "Health Plans", path: "/plans" },
    { name: "My Appointments", path: "/myAppointment" },
    { name: "Support Chat", path: "/chat" },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-md py-4"}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-800 leading-none tracking-tight">TRUE CARE</span>
                <span className="text-[10px] text-blue-600 font-semibold tracking-[0.2em] uppercase">Multi Speciality</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${location.pathname === link.path ? "text-blue-600" : "text-slate-600"}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/book-appointment" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-200">
              Emergency Contact
            </Link>
          </div>

          {/* User Profile & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-blue-100 ring ring-blue-50 ring-offset-2">
                <div className="w-10 rounded-full bg-slate-100">
                  {image ? <img src={`${BaseUrl}/${image}`} alt="profile" /> : <img src="https://ui-avatars.com/api/?name=User&bg=007bff&color=fff" />}
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-white rounded-xl w-56 border border-slate-100">
                <li className="menu-title text-slate-400">Patient Dashboard</li>
                <li><Link to="/profile" className="py-3">Medical Profile</Link></li>
                <li><Link to="/records" className="py-3">Health Records</Link></li>
                <hr className="my-2 border-slate-50" />
                <li>
                  <button onClick={() => { localStorage.removeItem("userToken"); navigate("/login"); }} className="text-red-500 hover:bg-red-50">
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>

            {/* Mobile Burger (Hidden on Desktop) */}
            <div className="lg:hidden dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-white rounded-box w-52">
                {navLinks.map((link) => (
                  <li key={link.path}><Link to={link.path}>{link.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;