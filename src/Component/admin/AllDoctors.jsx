import React, { useState, useEffect } from "react";
import { Search, UserCheck, UserMinus, Mail, GraduationCap, DollarSign, Activity, Stethoscope, ShieldCheck, MoreHorizontal, ArrowRight, User, Terminal } from "lucide-react";
import { getApprovedDoctor, deleteDoctor } from "../../sevices/adminApi";
import { BaseUrl } from "../../constants/constants";
import Swal from "sweetalert2";

function AllDoctors() {
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    getAllDoctor();
  }, []);

  const getAllDoctor = async () => {
    setLoading(true);
    setIsSyncing(true);
    try {
      let { data } = await getApprovedDoctor();
      if (data.success) {
        setDoctor(data.doctors);
      }
    } catch (error) {
      console.error("Staff synchronization failed:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setIsSyncing(false), 500);
    }
  };

  const blockDoctor = (doctorId, status) => {
    try {
      Swal.fire({
        title: status === "Active" ? "Restrict Staff Access?" : "Restore Staff Access?",
        text: status === "Active" 
          ? "This practitioner will be immediately decoupled from the clinical operational floor." 
          : "Full clinical privileges will be reinstated for this practitioner identity.",
        icon: "warning",
        background: "#0f172a",
        color: "#f8fafc",
        showCancelButton: true,
        confirmButtonColor: status === "Active" ? "#EF4444" : "#10B981",
        cancelButtonColor: "#334155",
        confirmButtonText: status === "Active" ? "Confirm Restriction" : "Confirm Restoration",
        customClass: {
          popup: 'rounded-[3rem] border border-white/5 shadow-2xl',
          title: 'font-black uppercase tracking-tighter italic text-3xl',
          confirmButton: 'rounded-2xl font-black uppercase tracking-widest text-[10px] px-10 py-5',
          cancelButton: 'rounded-2xl font-black uppercase tracking-widest text-[10px] px-10 py-5'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          let { data } = await deleteDoctor(doctorId);
          if (data.success) {
            Swal.fire({
              icon: "success",
              title: "Registry Modified",
              text: data.message || "Practitioner status updated in the clinical ledger.",
              background: "#0f172a",
              color: "#f8fafc",
              timer: 2000,
              showConfirmButton: false,
              borderRadius: "2rem"
            });
            getAllDoctor();
          }
        }
      });
    } catch (error) {
      console.error("Restriction sequence failed:", error);
    }
  };

  const filteredDoctors = doctor?.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* Cinematic Identity Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-slate-200/60 pb-12 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full border border-white/5 shadow-2xl">
             <Terminal size={12} className="text-blue-500 animate-pulse" />
             <span className="text-[9px] font-black text-white uppercase tracking-[0.4em] italic leading-none">Practitioner Management Registry</span>
          </div>
          <div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
              Medical <span className="text-blue-600">Staff</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] italic mt-6 border-l-4 border-blue-600 pl-8 max-w-xl">
              Verified clinical professionals and surgical specialists currently integrated into the TRUE CARE healthcare matrix.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10">
           <div className="relative w-full sm:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Scan Practitioner Identity..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2.5rem] focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-400 transition-all text-sm font-black text-slate-800 shadow-sm placeholder:text-slate-300 italic uppercase tracking-widest"
              />
           </div>
           <button 
             onClick={getAllDoctor}
             className={`p-5 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 group relative overflow-hidden`}
           >
              <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <Activity size={20} className={`relative z-10 ${isSyncing ? "animate-spin" : "group-hover:rotate-12 transition-transform"}`} />
           </button>
        </div>
      </div>

      {/* Main Operational Ledger */}
      <div className="bg-white rounded-[4rem] border border-slate-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-48"></div>
        
        {loading ? (
          <div className="p-20 space-y-6">
             {[1,2,3,4,5].map(i => (
               <div key={i} className="flex gap-8 items-center animate-pulse">
                  <div className="w-16 h-16 bg-slate-50 rounded-[1.8rem]"></div>
                  <div className="flex-1 h-12 bg-slate-50 rounded-2xl"></div>
                  <div className="w-32 h-12 bg-slate-50 rounded-2xl"></div>
               </div>
             ))}
          </div>
        ) : filteredDoctors?.length > 0 ? (
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Practitioner Profile</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Clinical Credentials</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Fee Protocol</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Operational Status</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic text-right">Sequence Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDoctors.map((doc, index) => (
                  <tr key={doc._id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-12 py-8">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-blue-600/10 rounded-[1.8rem] blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="w-16 h-16 rounded-[1.8rem] bg-slate-900 border-4 border-white shadow-xl flex items-center justify-center text-white font-black overflow-hidden bg-cover bg-center group-hover:scale-105 transition-transform relative z-10" style={{ backgroundImage: doc.image ? `url(${BaseUrl}/${doc.image})` : 'none' }}>
                             {!doc.image && doc.name.charAt(0)}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white z-20 shadow-lg group-hover:scale-110 transition-transform"></div>
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-lg flex items-center gap-2 uppercase tracking-tight italic">
                            Dr. {doc.name}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 px-3 py-1 bg-white border border-slate-100 rounded-full w-fit">
                             <Mail size={10} className="text-blue-500" />
                             <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{doc.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-8">
                       <div className="flex flex-col gap-2">
                          <span className="flex items-center gap-2 text-[10px] font-black text-slate-700 bg-white border border-slate-100 px-4 py-2 rounded-2xl uppercase tracking-widest italic w-fit shadow-sm group-hover:border-blue-200 transition-colors">
                            <GraduationCap size={14} className="text-blue-600" />
                            {doc.qualification}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1 italic">Speciality: {doc.department}</span>
                       </div>
                    </td>
                    <td className="px-12 py-8">
                       <div className="space-y-1">
                          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none italic">Standard Cycle</p>
                          <p className="font-black text-slate-900 mt-2 flex items-center text-xl tracking-tighter italic">
                             <span className="text-blue-600 mr-1 opacity-50">₹</span>{doc.consultationFee}
                          </p>
                       </div>
                    </td>
                    <td className="px-12 py-8">
                       <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-[1.5rem] shadow-sm border ${doc.status === "Active" ? "bg-green-50/50 text-green-600 border-green-100" : "bg-red-50/50 text-red-600 border-red-100"} group-hover:scale-105 transition-transform`}>
                          <div className={`w-2 h-2 rounded-full ${doc.status === "Active" ? "bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500"}`}></div>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">{doc.status}</span>
                       </div>
                    </td>
                    <td className="px-12 py-8">
                      <div className="flex items-center justify-end gap-3">
                        {doc.status === "Active" ? (
                          <button
                            onClick={() => blockDoctor(doc._id, doc.status)}
                            className="bg-slate-900 text-white hover:bg-red-600 px-6 py-4 rounded-[1.8rem] font-black text-[9px] uppercase tracking-[0.3em] transition-all flex items-center gap-3 shadow-xl shadow-slate-200 active:scale-95 italic group/btn overflow-hidden relative"
                          >
                            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                            <span className="relative z-10 flex items-center gap-3">
                               <ShieldCheck size={14} className="group-hover/btn:rotate-12 transition-transform" />
                               Restrict Sequence
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={() => blockDoctor(doc._id, doc.status)}
                            className="bg-blue-600 text-white hover:bg-slate-900 px-6 py-4 rounded-[1.8rem] font-black text-[9px] uppercase tracking-[0.3em] shadow-2xl shadow-blue-100 transition-all flex items-center gap-3 active:scale-95 italic group/btn overflow-hidden relative"
                          >
                            <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                            <span className="relative z-10 flex items-center gap-3">
                               <UserCheck size={14} className="group-hover/btn:scale-110 transition-transform" />
                               Restore Sequence
                            </span>
                          </button>
                        )}
                        <button className="p-4 bg-white text-slate-300 border border-slate-100 rounded-[1.5rem] hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
                           <MoreHorizontal size={20} />
                        </button>
                      </div>
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
                  <Stethoscope size={80} />
               </div>
               <h3 className="font-black text-slate-900 uppercase tracking-tighter text-4xl italic italic">Staff Sync Isolated</h3>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] mt-6 max-w-sm mx-auto italic">Zero practitioner entities detected within the active registry matrix.</p>
               <button onClick={getAllDoctor} className="mt-12 flex items-center gap-3 mx-auto px-8 py-4 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all italic">
                  <Activity size={14} className="animate-pulse" /> Force Protocol Sync
               </button>
             </div>
          </div>
        )}
      </div>

      {/* Global Staff Stats Mobile/Compact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden h-48 flex flex-col justify-between shadow-2xl shadow-blue-900/10">
            <User size={64} className="absolute right-0 bottom-0 -mb-4 -mr-4 text-white opacity-5" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Total Integrated Staff</p>
            <h4 className="text-5xl font-black italic tracking-tighter tabular-nums">{doctor.length}</h4>
         </div>
         <div className="bg-white rounded-[3rem] p-10 border border-slate-100 flex flex-col justify-between h-48 group shadow-sm">
            <ShieldCheck size={48} className="text-blue-500 opacity-20 group-hover:scale-110 transition-transform" />
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic leading-none mb-2">Verified Status</p>
               <p className="text-4xl font-black text-slate-900 italic tracking-tighter tabular-nums">100%</p>
            </div>
         </div>
         <div className="bg-white rounded-[3rem] p-10 border border-slate-100 flex flex-col items-center justify-center text-center h-48 group shadow-sm">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic mb-4">Registry Integrity</h5>
            <div className="flex items-center gap-2">
               {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-6 bg-slate-900 rounded-full group-hover:scale-y-125 transition-transform" style={{ transitionDelay: `${i*100}ms` }}></div>)}
            </div>
            <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mt-4">Optimized</p>
         </div>
      </div>
    </div>
  );
}

export default AllDoctors;
