import React, { useState, useEffect } from "react";
import { Search, Calendar, User, Stethoscope, Briefcase, DollarSign, Activity, FileText, Terminal, ArrowUpRight, ShieldCheck, Clock, Layers } from "lucide-react";
import { getAllBookingData } from "../../sevices/adminApi";

function AllBookingschedules() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  
  useEffect(() => {
    getAllBookingDetails();
  }, []);

  const getAllBookingDetails = async () => {
    setLoading(true);
    setIsSyncing(true);
    try {
      let { data } = await getAllBookingData();
      if (data.success) {
        setBookingData(data.bookingData);
      }
    } catch (error) {
       console.error("Clinical ledger synchronization failed:", error);
    } finally {
       setLoading(false);
       setTimeout(() => setIsSyncing(false), 500);
    }
  };

  const filteredData = bookingData.filter((data) => {
    const query = searchQuery.toLowerCase();
    return (
      data.bookingTime.toLowerCase().includes(query) ||
      data.DoctorName.toLowerCase().includes(query) ||
      data.DoctorDepartment.toLowerCase().includes(query) ||
      data.UserId?.name?.toLowerCase().includes(query) ||
      data.status.toLowerCase().includes(query)
    );
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* Cinematic Ledger Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-slate-200/60 pb-12 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full border border-white/5 shadow-2xl">
             <Terminal size={12} className="text-blue-500 animate-pulse" />
             <span className="text-[9px] font-black text-white uppercase tracking-[0.4em] italic leading-none">Institutional Registry Terminal</span>
          </div>
          <div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
              Clinical <span className="text-blue-600">Ledger</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] italic mt-6 border-l-4 border-blue-600 pl-8 max-w-xl">
              Centralized synchronization of all clinical consultations and patient-practitioner engagements across the TRUE CARE healthcare cluster.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10">
           <div className="relative w-full sm:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Scan Protocol ID..." 
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2.5rem] focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-400 transition-all text-sm font-black text-slate-800 shadow-sm placeholder:text-slate-300 italic uppercase tracking-widest"
              />
           </div>
           <button 
             onClick={getAllBookingDetails}
             className={`p-5 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 group relative overflow-hidden`}
           >
              <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <Activity size={20} className={`relative z-10 ${isSyncing ? "animate-spin" : "group-hover:rotate-12 transition-transform"}`} />
           </button>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="bg-white rounded-[4rem] border border-slate-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-48"></div>
        
        {loading ? (
          <div className="p-20 space-y-6">
             {[1,2,3,4,5].map(i => (
               <div key={i} className="flex gap-10 items-center animate-pulse">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl"></div>
                  <div className="flex-1 h-12 bg-slate-50 rounded-2xl"></div>
                  <div className="w-32 h-12 bg-slate-50 rounded-2xl"></div>
                  <div className="w-20 h-12 bg-slate-50 rounded-2xl"></div>
               </div>
             ))}
          </div>
        ) : filteredData?.length > 0 ? (
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Consultation Temporal</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Practitioner Matrix</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Patient Identity</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Financial Flow</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic text-right">Operational Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.map((data, index) => (
                  <tr key={data._id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-12 py-8">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-[1.2rem] bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-inner">
                             <Clock size={20} />
                          </div>
                          <div>
                             <p className="font-black text-slate-900 text-sm uppercase italic tracking-tight leading-none mb-1.5">{data.bookingTime}</p>
                             <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">Synchronized Timecode</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-12 py-8">
                      <div className="flex items-center gap-5">
                         <div className="bg-slate-900 text-white p-4 rounded-[1.5rem] shadow-xl group-hover:scale-110 transition-transform">
                            <Stethoscope size={20} />
                         </div>
                         <div>
                            <p className="font-black text-slate-900 text-base uppercase tracking-tight italic leading-none mb-2">Dr. {data.DoctorName}</p>
                            <div className="flex items-center gap-2">
                               <Briefcase size={12} className="text-blue-500" />
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{data.DoctorDepartment}</span>
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="px-12 py-8">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                            <User size={18} />
                         </div>
                         <p className="font-black text-slate-700 text-sm uppercase italic tracking-wide">{data.UserId?.name || "REDACTED"}</p>
                      </div>
                    </td>
                    <td className="px-12 py-8">
                       <div className="inline-flex items-center gap-3 bg-green-50 px-6 py-3 rounded-full border border-green-100 shadow-inner">
                          <DollarSign size={14} className="text-green-600" />
                          <span className="font-black text-green-700 tabular-nums italic text-sm">{data.totalAmount}</span>
                       </div>
                    </td>
                    <td className="px-12 py-8 text-right">
                       {data.status === "Cancel" ? (
                         <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-slate-900 text-white border border-white/10 shadow-xl group-hover:bg-red-600 transition-colors">
                            <Activity size={12} className="opacity-50" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Decommissioned</span>
                         </div>
                       ) : (
                         <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-green-500 text-white shadow-xl shadow-green-100 group-hover:bg-blue-600 transition-colors">
                            <ShieldCheck size={12} className="animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Active Sync</span>
                         </div>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-32 flex flex-col items-center justify-center text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]"></div>
             <div className="relative z-10">
               <div className="bg-slate-50 p-12 rounded-[4rem] text-slate-200 mb-10 border border-slate-100 shadow-inner group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
                  <FileText size={80} />
               </div>
               <h3 className="font-black text-slate-900 uppercase tracking-tighter text-4xl italic leading-none">Registry Isolation</h3>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] mt-6 max-w-sm mx-auto italic">No consultation artifacts detected within the institutional synchronization protocol.</p>
             </div>
          </div>
        )}
      </div>

      {/* Ledger Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden h-48 flex flex-col justify-between shadow-2xl shadow-blue-900/10 group">
            <Layers size={64} className="absolute right-0 bottom-0 -mb-4 -mr-4 text-white opacity-5 group-hover:scale-125 transition-transform" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Total Engagements</p>
            <h4 className="text-5xl font-black italic tracking-tighter tabular-nums">{bookingData.length} Logs</h4>
         </div>
         <div className="bg-white rounded-[3rem] p-10 border border-slate-100 flex flex-col justify-between h-48 group shadow-sm">
            <ShieldCheck size={48} className="text-blue-500 opacity-20 group-hover:scale-110 transition-transform" />
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic leading-none mb-2">Protocol Integrity</p>
               <div className="flex items-center gap-2">
                  <span className="text-4xl font-black text-slate-900 italic tracking-tighter">Verified</span>
                  <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">Certified</div>
               </div>
            </div>
         </div>
         <div className="bg-white rounded-[3rem] p-10 border border-slate-100 flex flex-col items-center justify-center text-center h-48 group shadow-sm">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic mb-4">Financial Transmission</h5>
            <div className="flex flex-col items-center gap-1">
               <p className="text-4xl font-black text-slate-900 italic tracking-tighter tabular-nums">
                  <span className="text-blue-600">$</span>{bookingData.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0)}
               </p>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Total Yield Archived</p>
            </div>
         </div>
      </div>

    </div>
  );
}

export default AllBookingschedules;
