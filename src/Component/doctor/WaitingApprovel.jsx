import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApprovelreason } from "../../sevices/doctorApi";
import { ShieldCheck, Clock, AlertCircle, ArrowRight, Activity, Zap, ShieldAlert } from "lucide-react";

function WaitingApprovel() {
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("Pending");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("doctorWaitingToken")) {
      getReason();
    } else {
      navigate("/doctorLogin");
    }
  }, [navigate]);

  const getReason = async () => {
    try {
      let { data } = await getApprovelreason();
      if (data.reasonData.status === "Active") {
        localStorage.removeItem('doctorWaitingToken');
        navigate('/doctor');
      } else {
        setReason(data.reasonData.rejectReason);
        setStatus(data.reasonData.status);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 lg:p-12 font-sans overflow-hidden">
      {/* Dynamic Background Decorations */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-blue-50/50 rounded-full blur-[140px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[45rem] h-[45rem] bg-indigo-50/50 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-2xl w-full bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/40 border border-slate-100 overflow-hidden relative z-10 transition-all duration-700 hover:shadow-blue-900/5">
        
        {/* Verification Status Header */}
        <div className={`p-10 lg:p-14 text-center space-y-8 relative overflow-hidden ${status === 'Rejected' ? 'bg-red-50' : 'bg-slate-900'}`}>
           {status !== 'Rejected' && <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2"></div>}
           
           <div className="relative z-10">
              <div className={`mx-auto w-24 h-24 rounded-[2.5rem] flex items-center justify-center transition-all duration-1000 ${status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-blue-600/10 text-blue-500 shadow-xl shadow-blue-500/10 animate-bounce'}`}>
                 {status === 'Rejected' ? <ShieldAlert size={44} /> : <ShieldCheck size={44} />}
              </div>
           </div>

           <div className="space-y-4 relative z-10">
              <h1 className={`text-4xl font-black uppercase italic tracking-tighter leading-none ${status === 'Rejected' ? 'text-red-900' : 'text-white'}`}>
                {status === 'Rejected' ? "Institutional <span className='text-red-600'>Refusal</span>" : "Institutional <span className='text-blue-500'>Peer-Review</span>"}
              </h1>
              <p className={`font-bold text-[10px] uppercase tracking-[0.4em] italic ${status === 'Rejected' ? 'text-red-600' : 'text-slate-400'}`}>
                Terminal Status: {status === 'Rejected' ? "Protocol Interrupted" : "Cycle Synchronization Active"}
              </p>
           </div>
        </div>

        {/* Status Intelligence Module */}
        <div className="p-12 lg:p-16 space-y-10">
           <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 relative group overflow-hidden">
              <div className="absolute top-4 right-8 opacity-5">
                 <Clock size={40} className="text-slate-900" />
              </div>
              <div className="space-y-4 relative z-10">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 italic">
                    <Activity size={14} className="text-blue-500" /> Executive Summary
                 </h4>
                 <p className="text-slate-700 text-sm font-bold leading-relaxed tracking-wide italic underline-offset-4 decoration-blue-500/30">
                    {status === 'Rejected' 
                      ? `${reason}. Institutional standards not met. Re-submission protocol available after 24-hour cool-down.`
                      : "Your professional credentials and institutional artifacts are currently undergoing peer-validation by the TRUE CARE medical board."}
                 </p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">EST. Synchronization</p>
                 <p className="text-xs font-black text-slate-900 tracking-tight italic">12-24 Institutional Hours</p>
              </div>
              <div className="space-y-2 text-right">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Protocol Secure</p>
                 <p className="text-xs font-black text-blue-600 tracking-tight italic flex items-center justify-end gap-1">
                    <Zap size={10} /> 256-Bit SSL Active
                 </p>
              </div>
           </div>

           <div className="pt-6">
              <button 
                onClick={() => navigate('/doctorLogin')}
                className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-blue-600 transition-all transform active:scale-[0.97] shadow-xl shadow-slate-200 relative overflow-hidden group/btn flex items-center justify-center gap-3 italic"
              >
                 <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                 <span className="relative z-10 flex items-center gap-3">
                    Return to Navigation Registry <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                 </span>
              </button>
           </div>
        </div>

        {/* Footer Telemetry */}
        <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between gap-4 grayscale opacity-40">
           <div className="flex items-center gap-2">
              <AlertCircle size={12} className="text-slate-400" />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Regulatory ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
           </div>
           <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">© 2026 TRUE CARE INSTITUTIONAL</span>
        </div>

      </div>
    </div>
  );
}

export default WaitingApprovel;
