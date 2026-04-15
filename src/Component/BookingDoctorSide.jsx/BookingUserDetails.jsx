import React, { useEffect, useState } from "react";
import { getDoctorActiveBooking, updateCompleteBooking, addPrescription } from "../../sevices/doctorApi";
import { Calendar, Clock, UserCheck, ArrowRight, Search, CheckCircle2, ShieldCheck, Activity, Users, MoreHorizontal, Zap, MessageSquare, Monitor, Play, FileText, Timer } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function BookingUserDetails() {
  const [bookedData, setBookedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getActiveBookings();
    const interval = setInterval(getActiveBookings, 60000); // Polling every 1 min for live sync
    return () => clearInterval(interval);
  }, []);

  const getActiveBookings = async () => {
    setIsSyncing(true);
    try {
      let { data } = await getDoctorActiveBooking();
      if (data.success) {
        // Sort by booking time to represent the actual queue
        const sortedData = data.bookedSlots.sort((a, b) => new Date(a.bookingTime) - new Date(b.bookingTime));
        setBookedData(sortedData);
      }
    } catch (error) {
      console.error("Clinical Fetch Error:", error);
    } finally {
      setTimeout(() => setIsSyncing(false), 500); // Visual buffer
    }
  };

  const handleComplete = async (bookingId) => {
    try {
      const result = await Swal.fire({
        title: "Finalize Encounter?",
        text: "This will archive the session and mark the patient as treated in the registry.",
        icon: "info",
        background: "#0f172a",
        color: "#f8fafc",
        showCancelButton: true,
        confirmButtonColor: "#10B981",
        cancelButtonColor: "#334155",
        confirmButtonText: "Finalize & Archive",
        customClass: {
          popup: 'rounded-[2rem]',
          confirmButton: 'rounded-xl font-black uppercase tracking-widest text-[10px] px-8 py-4',
          cancelButton: 'rounded-xl font-black uppercase tracking-widest text-[10px] px-8 py-4'
        }
      });

      if (result.isConfirmed) {
        const { data } = await updateCompleteBooking(bookingId);
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Registry Updated",
            text: "Patient treatment record has been successfully finalized.",
            background: "#0f172a",
            color: "#f8fafc",
            timer: 2000,
            showConfirmButton: false,
            borderRadius: "2rem"
          });
          getActiveBookings();
        }
      }
    } catch (error) {
      console.error("Encounter Finalization Error:", error);
    }
  };

  const handleAddPrescription = async (bookingId) => {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Medical Advice & Prescription',
      inputPlaceholder: 'Type medicines, dosage, and instructions here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Save Prescription',
      background: '#ffffff',
      color: '#0f172a',
      customClass: {
        popup: 'rounded-[2rem]',
        input: 'min-h-[150px] p-4 text-sm font-medium border-slate-200 rounded-xl focus:ring-blue-500',
        confirmButton: 'rounded-xl font-black uppercase tracking-widest text-[10px] px-8 py-4',
        cancelButton: 'rounded-xl font-black uppercase tracking-widest text-[10px] px-8 py-4'
      }
    });

    if (text) {
      try {
        const { data } = await addPrescription(bookingId, text);
        if (data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Prescription Saved',
            text: 'The medical advice has been recorded successfully.',
            timer: 2000,
            showConfirmButton: false,
            borderRadius: '2rem'
          });
          getActiveBookings();
        }
      } catch (error) {
        console.error("Prescription Error:", error);
      }
    }
  };

  const filteredBookings = bookedData.filter(item => 
    item.UserId?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6 lg:px-12 font-sans animate-in fade-in duration-1000">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Cinematic Operations Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-slate-200/60 pb-16 relative">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full border border-white/5 shadow-2xl">
               <Monitor size={12} className="text-blue-500 animate-pulse" />
               <span className="text-[9px] font-black text-white uppercase tracking-[0.4em] italic leading-none">Operational Command Center v4.0</span>
            </div>
            <div>
               <h1 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
                 Patient <span className="text-blue-600">Encounter Queue</span>
               </h1>
               <div className="flex items-center gap-4 mt-6">
                 <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] italic max-w-lg border-l-4 border-blue-600 pl-8">
                   Real-time triage synchronization and longitudinal record management terminal for the TRUE CARE clinical infrastructure.
                 </p>
               </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10">
             <div className="relative w-full sm:w-96 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="text"
                  placeholder="Scan Patient Biological ID..."
                  className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-400 transition-all text-sm font-black text-slate-800 shadow-sm placeholder:text-slate-300 italic"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button 
               onClick={getActiveBookings}
               className={`p-5 rounded-[2rem] bg-slate-900 text-white hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 group relative overflow-hidden`}
             >
                <div className={`absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500`}></div>
                <Activity size={20} className={`relative z-10 ${isSyncing ? "animate-spin" : "group-hover:rotate-12 transition-transform"}`} />
             </button>
          </div>
        </div>

        {/* Operational Intelligence Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-blue-900/10 h-64 flex flex-col justify-between">
             <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:scale-125 transition-transform duration-1000">
                <Users size={120} />
             </div>
             <div className="space-y-1 relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Active Transmission Queue</p>
                <h3 className="text-6xl font-black tracking-tighter tabular-nums italic">{bookedData.length}</h3>
             </div>
             <div className="flex items-center gap-3 relative z-10">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic leading-none">Live Operational Floor</span>
             </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex items-center justify-between group h-64 relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
             <div className="flex items-center gap-8 relative z-10">
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-24 h-24 rounded-[2.5rem] bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-inner group-hover:rotate-6 transition-transform">
                     <UserCheck size={40} />
                  </div>
                </div>
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Immediate Protocol Triage</p>
                   <h3 className="text-3xl font-black text-slate-800 tracking-tighter leading-none italic uppercase">
                     {bookedData[0]?.UserId?.name || "Registry Empty"}
                   </h3>
                   <div className="flex items-center gap-3">
                      <span className="px-5 py-2 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] italic">Next Sequence</span>
                      <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ID Verified</span>
                   </div>
                </div>
             </div>
             <div className="hidden lg:flex flex-col items-end relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Priority Level</p>
                <div className="w-12 h-12 rounded-full border-4 border-blue-600 flex items-center justify-center">
                   <Zap size={18} className="text-blue-600 fill-blue-600" />
                </div>
             </div>
          </div>

          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between items-center h-64">
             <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center text-blue-600">
                <Calendar size={28} />
             </div>
             <div className="text-center space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
                <h4 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h4>
             </div>
             <div className="w-full h-px bg-slate-50"></div>
             <div className="flex items-center gap-2">
                <Timer size={12} className="text-slate-300" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
             </div>
          </div>
        </div>

        {/* Operational Floor Segment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((data, index) => (
              <div 
                key={index}
                className="bg-white rounded-[4rem] border border-slate-100 p-12 shadow-sm hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-4 transition-all duration-700 relative group overflow-hidden"
              >
                {/* Visual Accent Layer */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                
                {/* Protocol Temporal Metadata */}
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-3 bg-slate-900 px-5 py-2.5 rounded-[1.5rem] shadow-xl shadow-slate-200">
                    <Clock size={14} className="text-blue-400" />
                    <span className="text-[11px] font-black text-white uppercase tracking-[0.2em] italic tabular-nums">
                      {data.bookingTime.split(',')[1]}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-2 bg-blue-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <button className="relative z-10 p-3 text-slate-400 hover:text-slate-900 transition-colors"><MoreHorizontal size={20} /></button>
                  </div>
                </div>

                {/* Patient Biological Profile */}
                <div className="space-y-8">
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="relative">
                       <div className="absolute -inset-4 bg-blue-500/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                       <div className="w-24 h-24 bg-slate-50 rounded-[2.8rem] flex items-center justify-center text-slate-300 border border-slate-100 shadow-inner group-hover:text-blue-600 group-hover:bg-white group-hover:rotate-6 transition-all duration-700 relative z-10">
                          <Users size={40} />
                       </div>
                       <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white z-20 shadow-lg"></div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none group-hover:text-blue-600 transition-colors uppercase">
                        {data.UserId?.name}
                      </h2>
                      <div className="flex items-center justify-center gap-3 mt-4">
                        <div className="flex items-center gap-1.5 bg-blue-50/50 px-3 py-1 rounded-full border border-blue-100">
                           <ShieldCheck size={10} className="text-blue-600" />
                           <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none">REG ID: {data._id.slice(-6).toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Encounter Parameter Matrix */}
                  <div className="grid grid-cols-2 gap-4 bg-[#F8FAFC] p-8 rounded-[3rem] border border-slate-100 relative group/matrix overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-600 translate-y-full group-hover/matrix:translate-y-0 transition-transform"></div>
                    <div className="space-y-1.5 border-r border-slate-200 pr-4">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Encounter Date</p>
                      <p className="text-[11px] font-black text-slate-800 italic uppercase truncate">{data.bookingTime.split(',')[0].slice(0, 12)}</p>
                    </div>
                    <div className="space-y-1.5 pl-4 flex flex-col items-end">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Operational Stage</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${data.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-600 animate-pulse'}`}></div>
                        <p className={`text-[11px] font-black italic uppercase ${data.status === 'Completed' ? 'text-emerald-600' : 'text-blue-600'}`}>
                          {data.status === 'Completed' ? 'Prescription Issued' : 'Triage Phase'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operational Interaction Terminal */}
                <div className="flex items-center gap-4 mt-8 relative z-20 w-full overflow-hidden">
                  <button 
                    onClick={() => handleAddPrescription(data._id)}
                    className="flex-1 min-w-0 flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-blue-700 transition-all shadow-lg active:scale-95 group/btn"
                  >
                    <FileText size={16} className="shrink-0" />
                    <span className="truncate">Add Prescription</span>
                  </button>
                  
                  <button 
                    onClick={() => handleComplete(data._id)}
                    className="flex-1 min-w-0 flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-slate-800 transition-all shadow-lg active:scale-95 group/comp"
                  >
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span className="truncate">Seal Encounter</span>
                  </button>

                  <button 
                    onClick={() => navigate(`/doctor/doctorChat`)}
                    className="shrink-0 w-14 h-14 bg-white text-slate-500 rounded-2xl border-2 border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm active:scale-95 flex items-center justify-center"
                    title="Communicate with Patient"
                  >
                    <MessageSquare size={20} />
                  </button>
                </div>

                {/* Background Sequence Index */}
                <div className="absolute bottom-[-10%] left-[-5%] text-[180px] font-black text-slate-50 leading-none select-none italic -z-0 group-hover:text-blue-600/5 transition-colors">0{index + 1}</div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-48 flex flex-col items-center justify-center bg-white rounded-[5rem] border-2 border-dashed border-slate-100 shadow-[inset_0_20px_60px_-15px_rgba(0,0,0,0.03)] group relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)]"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 bg-slate-50 rounded-[4rem] flex items-center justify-center mb-10 border border-slate-100 group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000 shadow-inner">
                   <ShieldCheck size={56} className="text-slate-200" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic leading-none">Registry Isolation Active</h3>
                <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mt-6 italic">Zero patient encounters detected in the operational floor matrix.</p>
                <div className="mt-12 flex items-center gap-3 bg-slate-50 px-6 py-2.5 rounded-full border border-slate-100">
                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Monitoring Live Data Streams...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingUserDetails;