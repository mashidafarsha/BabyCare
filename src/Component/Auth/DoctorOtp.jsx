import React, { useState } from 'react';
import { sendOtp } from '../../sevices/doctorApi';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, Activity, Zap } from 'lucide-react';

function DoctorOtp() {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const generateError = (err) => {
    Swal.fire({
      icon: "error",
      title: "Verification Failed",
      text: err || "The access key entered is invalid or has expired.",
      borderRadius: "2rem",
      confirmButtonColor: "#1e293b"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const { data } = await sendOtp(otp);
      if (data.created) {
        Swal.fire({
          icon: "success",
          title: "Identity Verified",
          text: "OTP protocol successful. Proceeding to credentialing phase.",
          showConfirmButton: false,
          timer: 2000,
          borderRadius: "2.5rem"
        });
        navigate('/doctor/info');
      } else {
        generateError(data.message);
      }
    } catch (err) {
      console.error(err);
      generateError("Service connection failure during verification.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="sent_otp" className="modal-toggle" />
      <div className="modal backdrop-blur-md bg-slate-900/40">
        <div className="modal-box bg-white rounded-[3rem] p-12 max-w-md border border-slate-100 shadow-2xl relative overflow-hidden transform transition-all duration-500 hover:shadow-blue-900/5">
          {/* Decorative Visual */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <div className="absolute top-10 right-10 opacity-5">
             <ShieldCheck size={120} />
          </div>

          <div className="text-center mb-10 space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-blue-600 mb-2">
               <Lock size={28} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">Access <span className="text-blue-600">Verification</span></h1>
               <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-3">Enter the clinical OTP sent to your registry email.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 block group-focus-within:text-blue-600 transition-colors italic">Institutional Access Key</label>
              <div className="relative">
                 <Zap className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                 <input
                   type="text"
                   placeholder="Enter 6-Digit Key"
                   className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.8rem] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-600/5 transition-all text-center text-lg font-black tracking-[0.5em] text-slate-800 placeholder:tracking-normal placeholder:text-[10px] placeholder:font-black placeholder:uppercase placeholder:text-slate-300"
                   onChange={(e) => setOtp(e.target.value)}
                   required
                 />
              </div>
            </div>

            <div className="space-y-4">
              <button
                disabled={isVerifying}
                className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-blue-600 transition-all transform active:scale-[0.97] shadow-xl shadow-slate-200 relative overflow-hidden group/btn flex items-center justify-center gap-3 italic"
              >
                 <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                 <span className="relative z-10 flex items-center gap-3">
                   {isVerifying ? "Verifying..." : "Validate Protocol"} 
                   {!isVerifying && <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />}
                 </span>
              </button>
              
              <label 
                htmlFor="sent_otp" 
                className="w-full py-4 text-center block text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] cursor-pointer hover:text-slate-900 transition-colors italic"
              >
                Abort Replay
              </label>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-center gap-3 opacity-30">
             <Activity size={12} className="text-slate-400" />
             <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Terminal ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorOtp;