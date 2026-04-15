import React, { useState, useEffect } from "react";
import { Search, FileText, CheckCircle, XCircle, UserPlus, Info, ExternalLink, Terminal, Activity, ShieldCheck, ClipboardCheck, ArrowUpRight, Mail } from "lucide-react";
import { getRegisterDoctor, acceptDoctor } from "../../sevices/adminApi";
import { BaseUrl } from "../../constants/constants";
import Swal from "sweetalert2";
import RejectedReason from "./RejectedReason";

function DoctorApprovel() {
  const [load, setLoad] = useState(false);
  const [docDetail, setDocDetail] = useState('');
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    getDoctorDetails();
  }, [load]);

  const handleLoad = () => {
    setLoad(!load);
  };

  const getDoctorDetails = async () => {
    setLoading(true);
    setIsSyncing(true);
    try {
      let { data } = await getRegisterDoctor();
      if (data.success) {
        setDoctor(data.doctors);
      }
    } catch (error) {
      console.error("Verification queue synchronization failed:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setIsSyncing(false), 500);
    }
  };

  const acceptHandler = (id) => {
    try {
      Swal.fire({
        title: 'Verify Practitioner?',
        text: "This action will integrate the practitioner into the active TRUE CARE clinical floor.",
        icon: 'info',
        background: "#0f172a",
        color: "#f8fafc",
        showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#334155',
        confirmButtonText: 'Confirm Verification',
        customClass: {
          popup: 'rounded-[3rem] border border-white/5 shadow-2xl',
          title: 'font-black uppercase tracking-tighter italic text-3xl',
          confirmButton: 'rounded-2xl font-black uppercase tracking-widest text-[10px] px-10 py-5',
          cancelButton: 'rounded-2xl font-black uppercase tracking-widest text-[10px] px-10 py-5'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          let { data } = await acceptDoctor(id);
          if (data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Registry Updated',
              text: 'Practitioner identity has been successfully verified.',
              background: "#0f172a",
              color: "#f8fafc",
              timer: 2000,
              showConfirmButton: false,
              borderRadius: '2rem'
            });
            handleLoad();
          }
        }
      });
    } catch (error) {
      console.error("Verification sequence interrupted:", error);
    }
  };

  const filteredDoctors = doctor?.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* Cinematic Audit Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-slate-200/60 pb-12 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full border border-white/5 shadow-2xl">
             <Terminal size={12} className="text-blue-500 animate-pulse" />
             <span className="text-[9px] font-black text-white uppercase tracking-[0.4em] italic leading-none">Credentialing & Audit Queue</span>
          </div>
          <div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
              Verification <span className="text-blue-600">Gate</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] italic mt-6 border-l-4 border-blue-600 pl-8 max-w-xl">
              Strict multi-layered verification of practitioner credentials, clinical certifications, and institutional compliance.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10">
           <div className="relative w-full sm:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Scan Registration ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2.5rem] focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-400 transition-all text-sm font-black text-slate-800 shadow-sm placeholder:text-slate-300 italic uppercase tracking-widest"
              />
           </div>
           <button 
             onClick={getDoctorDetails}
             className={`p-5 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 group relative overflow-hidden`}
           >
              <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <Activity size={20} className={`relative z-10 ${isSyncing ? "animate-spin" : "group-hover:rotate-12 transition-transform"}`} />
           </button>
        </div>
      </div>

      {/* Verification Ledger Container */}
      <div className="bg-white rounded-[4rem] border border-slate-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-48"></div>
        
        {loading ? (
          <div className="p-20 space-y-6">
             {[1,2,3].map(i => (
               <div key={i} className="flex gap-8 items-center animate-pulse">
                  <div className="w-16 h-16 bg-slate-50 rounded-[1.8rem]"></div>
                  <div className="flex-1 h-12 bg-slate-50 rounded-2xl"></div>
                  <div className="w-48 h-12 bg-slate-50 rounded-2xl"></div>
               </div>
             ))}
          </div>
        ) : filteredDoctors?.length > 0 ? (
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Practitioner Sequence</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Clinical Evidence</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Certified Documentation</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic text-right">Verification Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDoctors.map((doc, index) => (
                  <tr key={doc._id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-12 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.8rem] bg-slate-900 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform relative z-10">
                           <img 
                             src={doc.image || doc.imageUrl || "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"} 
                             alt={doc.name} 
                             className="w-full h-full object-cover"
                           />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-lg uppercase tracking-tight italic">Dr. {doc.name}</p>
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
                            <Info size={14} className="text-blue-600" />
                            {doc.qualification}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1 italic">Speciality: {doc.department}</span>
                       </div>
                    </td>
                    <td className="px-12 py-8">
                       <a 
                         href={`${BaseUrl}/${doc.document}`} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-4 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] transition-all hover:bg-blue-600 shadow-xl shadow-slate-200 group/link italic"
                       >
                         <ClipboardCheck size={16} className="text-blue-400" />
                         Audit Certificate
                         <ExternalLink size={12} className="opacity-40 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                       </a>
                    </td>
                    <td className="px-12 py-8">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => acceptHandler(doc._id)}
                          className="bg-blue-600 text-white hover:bg-slate-900 px-8 py-4 rounded-[1.8rem] font-black text-[9px] uppercase tracking-[0.3em] shadow-2xl shadow-blue-100 transition-all flex items-center gap-3 active:scale-95 italic group/btn overflow-hidden relative"
                        >
                           <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                           <span className="relative z-10 flex items-center gap-3">
                              <CheckCircle size={16} />
                              Confirm Verify
                           </span>
                        </button>
                        <label 
                          htmlFor="reject_modal" 
                          onClick={() => setDocDetail(doc)}
                          className="bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-100 hover:border-red-100 px-6 py-4 rounded-[1.8rem] font-black text-[9px] uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center gap-3 active:scale-95 italic"
                        >
                          <XCircle size={16} />
                          Decline
                        </label>
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
                  <UserPlus size={80} />
               </div>
               <h3 className="font-black text-slate-900 uppercase tracking-tighter text-4xl italic">Verification Queue Empty</h3>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] mt-6 max-w-sm mx-auto italic">No practitioner applications currently require administrative audit sequence.</p>
               <button onClick={getDoctorDetails} className="mt-12 flex items-center gap-3 mx-auto px-8 py-4 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all italic">
                  <Activity size={14} className="animate-pulse" /> Force Queue Sync
               </button>
             </div>
          </div>
        )}
      </div>

      {/* Verification Metrics Compact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden h-48 flex flex-col justify-between shadow-2xl shadow-blue-900/10 group">
            <ShieldCheck size={64} className="absolute right-0 bottom-0 -mb-4 -mr-4 text-white opacity-5 group-hover:scale-125 transition-transform" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Audit Status</p>
            <h4 className="text-3xl font-black italic tracking-tighter uppercase">Verified System</h4>
         </div>
         <div className="bg-white rounded-[3rem] p-10 border border-slate-100 flex flex-col justify-between h-48 group shadow-sm">
            <ClipboardCheck size={48} className="text-blue-500 opacity-20 group-hover:scale-110 transition-transform" />
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic leading-none mb-2">Pending Sequences</p>
               <p className="text-4xl font-black text-slate-900 italic tracking-tighter tabular-nums">{doctor.length}</p>
            </div>
         </div>
         <div className="bg-white rounded-[3rem] p-10 border border-slate-100 flex flex-col items-center justify-center text-center h-48 group shadow-sm">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic mb-4">Registration Velocity</h5>
            <div className="flex items-center gap-2">
               {[1,2,3,4,5,6].map(i => <div key={i} className="w-1.5 h-6 bg-blue-600 rounded-full group-hover:scale-y-125 transition-transform" style={{ transitionDelay: `${i*100}ms` }}></div>)}
            </div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-4">Normal Operations</p>
         </div>
      </div>

      <RejectedReason docDetail={docDetail} handleLoad={handleLoad} />
    </div>
  );
}

export default DoctorApprovel;
