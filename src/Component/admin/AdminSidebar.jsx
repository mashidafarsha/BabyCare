import React from "react";
import { LayoutDashboard, Stethoscope, Image, CreditCard, Users, UserPlus, BookOpen, Activity, ShieldCheck, Zap, Monitor, Terminal } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();
  
  const menuItems = [
    { name: "Command Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Surgical Departments", path: "/admin/category", icon: <Stethoscope size={18} /> },
    { name: "Publicity Banners", path: "/admin/banner", icon: <Image size={18} /> },
    { name: "Institutional Plans", path: "/admin/plans", icon: <CreditCard size={18} /> },
    { name: "Practitioner Registry", path: "/admin/doctor", icon: <Users size={18} /> },
    { name: "Protocol Approvals", path: "/admin/doctorApprovel", icon: <UserPlus size={18} /> },
    { name: "Encounter Ledger", path: "/admin/allBooking", icon: <BookOpen size={18} /> },
  ];

  return (
    <aside className="w-80 bg-white border-r border-slate-100 flex flex-col h-[calc(100vh-96px)] sticky top-24 overflow-hidden">
      {/* Sidebar Header Indicator */}
      <div className="px-8 pt-8 pb-4">
         <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
            <Terminal size={12} className="text-slate-400" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Operational Nodes</span>
         </div>
      </div>

      <div className="flex-grow py-6 px-4 space-y-2 overflow-y-auto scrollbar-none hover:scrollbar-thin scrollbar-thumb-slate-200">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-4 px-6 py-4 rounded-[1.5rem] font-black text-[10px] transition-all duration-500 relative overflow-hidden ${
                isActive 
                  ? "bg-slate-900 text-white shadow-2xl shadow-slate-200 translate-x-2 italic" 
                  : "text-slate-400 hover:bg-slate-50 hover:text-blue-600 hover:translate-x-1"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
              )}
              <span className={`transition-transform duration-500 group-hover:scale-110 ${isActive ? "text-blue-400" : "text-slate-300"}`}>{item.icon}</span>
              <span className="uppercase tracking-[0.2em]">{item.name}</span>
              {isActive && (
                <Zap size={10} className="ml-auto text-blue-400 animate-pulse fill-blue-400" />
              )}
            </Link>
          );
        })}
      </div>

      {/* System Intelligence Footnote */}
      <div className="p-8 border-t border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-slate-900 pointer-events-none">
           <ShieldCheck size={80} />
        </div>
        <div className="bg-slate-900 rounded-[2rem] p-5 flex items-center gap-4 relative z-10 shadow-xl shadow-slate-200">
          <div className="relative">
             <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping absolute inset-0"></div>
             <div className="w-2.5 h-2.5 bg-green-500 rounded-full relative z-10"></div>
          </div>
          <div className="flex flex-col">
             <span className="text-[9px] font-black text-white uppercase tracking-[0.3em] italic">Security Protocol Active</span>
             <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Admin Level 01 Auth</span>
          </div>
          <Activity size={12} className="ml-auto text-blue-500 animate-pulse" />
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
