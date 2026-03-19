import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, LogOut, Settings, Bell, Search, Activity, HeartPulse, UserCircle } from "lucide-react";

function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 py-4">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center h-16">
        
        {/* Cinematic Brand Identity */}
        <div className="flex items-center gap-6">
          <Link to="/admin" className="group flex items-center gap-4">
            <div className="bg-slate-900 p-2.5 rounded-2xl shadow-2xl shadow-slate-300 group-hover:rotate-[15deg] transition-all duration-500 relative">
               <div className="absolute inset-0 bg-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-lg"></div>
               <HeartPulse size={22} className="text-white relative z-10" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                True <span className="text-blue-600">Care</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                 <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.4em] italic">Master Control Terminal</span>
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-4 ml-10">
             <div className="h-8 w-px bg-slate-100"></div>
             <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                <Activity size={12} className="text-green-500" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Global Status: Optimized</span>
             </div>
          </div>
        </div>

        {/* Tactical User Interface */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center relative group">
             <Search size={16} className="absolute left-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
             <input 
               type="text" 
               placeholder="System Search..." 
               className="bg-slate-50 border border-slate-100 rounded-full pl-11 pr-6 py-2.5 text-[10px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-400 transition-all w-64 placeholder:text-slate-300 uppercase tracking-widest italic"
             />
          </div>

          <button className="relative p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all border border-slate-100">
             <Bell size={20} />
             <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 border-2 border-white rounded-full"></span>
          </button>

          <div className="h-8 w-px bg-slate-100"></div>

          <div className="dropdown dropdown-end group/drop">
            <label tabIndex={0} className="flex items-center gap-4 cursor-pointer p-1.5 pr-5 rounded-[1.8rem] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
              <div className="relative">
                 <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover/drop:opacity-40 transition duration-500"></div>
                 <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black shadow-lg relative z-10 text-lg italic">
                   A
                 </div>
              </div>
              <div className="hidden md:block">
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight italic">Admin Manager</p>
                <p className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.2em] flex items-center gap-1 mt-0.5">
                   <ShieldCheck size={10} /> Tier 01 Access
                </p>
              </div>
            </label>
            <ul tabIndex={0} className="mt-6 z-[1] p-3 shadow-2xl menu menu-compact dropdown-content bg-white/95 backdrop-blur-xl rounded-[2.5rem] w-64 border border-slate-100 animate-in slide-in-from-top-4 duration-500">
               <div className="px-5 py-4 mb-2 bg-slate-50 rounded-[1.8rem]">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated Identity</p>
                  <p className="text-sm font-black text-slate-800 uppercase italic truncate">Root Administrator</p>
               </div>
               
               <li>
                 <Link to="/admin" className="flex items-center gap-3 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                   <UserCircle size={18} /> Master Profile
                 </Link>
               </li>
               <li>
                 <Link to="/admin" className="flex items-center gap-3 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                   <Settings size={18} /> Global Parameters
                 </Link>
               </li>
               
               <div className="h-px bg-slate-100 my-2 mx-4"></div>
               
               <li>
                <button 
                  onClick={() => {
                    localStorage.removeItem("adminToken");
                    navigate("/admin/adminLogin");
                  }}
                  className="flex items-center gap-3 p-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] text-red-500 hover:bg-red-50 transition-all italic w-full"
                >
                  <LogOut size={18} /> Terminate Session
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
