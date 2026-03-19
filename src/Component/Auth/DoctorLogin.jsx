import React, { useEffect, useState } from "react";
import { doctorLogin } from "../../sevices/doctorApi";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDoctorDetails } from "../../redux/features/doctorSlice";
import { Mail, Lock, ShieldCheck, ArrowRight, Zap, Activity } from "lucide-react";

function DoctorLogin() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("doctorWaitingToken")) {
      navigate("/doctor/waiting");
    } else if (localStorage.getItem("doctorToken")) {
      navigate("/doctor");
    }
  }, [navigate]);

  const generateError = (err) => {
    Swal.fire({
      icon: "error",
      title: "Registration Interrupted",
      text: err || "Please verify your registration credentials.",
      borderRadius: "2rem",
      confirmButtonColor: "#1e293b"
    });
  };

  const handleLoad = () => setLoad(!load);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let { data } = await doctorLogin(values);
      if (data.errors) {
        if (data.errors.email) generateError(data.errors.email);
        else if (data.errors.password) generateError(data.errors.password);
      } else if (data.doctor.status === "Active") {
        localStorage.setItem("doctorToken", data.token);
        dispatch(setDoctorDetails({ doctor: data.doctor }));
        Swal.fire({
          icon: "success",
          title: "Welcome Back",
          text: `Dr. ${data.doctor.name}, your clinical dashboard is ready.`,
          showConfirmButton: false,
          timer: 2000,
          borderRadius: "2.5rem"
        });
        navigate("/doctor");
      } else {
        navigate("/doctor/Info");
      }
    } catch (error) {
      console.error(error);
      generateError("Service connection failed. Please verify your clinical credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4 lg:p-12 font-sans animate-in fade-in duration-1000">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
         <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-indigo-50 rounded-full blur-[100px] opacity-50"></div>
      </div>

      <div className="max-w-6xl w-full bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row border border-slate-100 relative z-10 transition-all duration-700 hover:shadow-blue-900/5">
        
        {/* Left Side: Premium Clinical Visual */}
        <div className="hidden md:block md:w-5/12 relative bg-slate-900 overflow-hidden group">
          <img
            className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-100 transition-transform duration-1000"
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000"
            alt="Practitioner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-12 lg:p-16">
            <div className="space-y-6">
               <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
               <h2 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-tight">
                 Elevate Your <br/> <span className="text-blue-500">Practice.</span>
               </h2>
               <p className="text-slate-400 text-sm font-medium tracking-wide leading-relaxed max-w-xs">
                 Join a network of elite medical professionals providing world-class pediatric care through high-fidelity digital infrastructure.
               </p>
               <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-3">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                           <User size={12} className="text-slate-500" />
                        </div>
                     ))}
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">500+ Specialists Peer-Validated</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Module */}
        <div className="w-full md:w-7/12 p-10 lg:p-20 flex flex-col justify-center relative bg-white">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Activity size={20} className="animate-pulse" />
               </div>
               <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] italic">True Care Network</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">Practitioner <span className="text-blue-600">Login</span></h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mt-3">Enter your clinical credentials to access your terminal.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 block group-focus-within:text-blue-600 transition-colors italic">Clinical Registry Email</label>
                <div className="relative">
                   <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                   <input
                     type="email"
                     placeholder="practitioner@truecare.app"
                     className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-bold text-slate-700"
                     onChange={(e) => setValues({ ...values, email: e.target.value })}
                     required
                   />
                </div>
              </div>

              <div className="group">
                <div className="flex justify-between items-center mb-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-focus-within:text-blue-600 transition-colors italic">Secure Access Key</label>
                   <Link to="#" className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Reset Key?</Link>
                </div>
                <div className="relative">
                   <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                   <input
                     type="password"
                     placeholder="••••••••••••"
                     className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-bold text-slate-700"
                     onChange={(e) => setValues({ ...values, password: e.target.value })}
                     required
                   />
                </div>
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white py-6 rounded-[1.8rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-blue-600 transition-all transform active:scale-[0.97] shadow-2xl shadow-slate-200 relative overflow-hidden group/btn flex items-center justify-center gap-3"
            >
               <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
               <span className="relative z-10 flex items-center gap-3 italic">
                 {isSubmitting ? "Synchronizing Credentials..." : "Authenticate Protocol"} 
                 {!isSubmitting && <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />}
               </span>
            </button>
          </form>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-50 pt-10 px-2">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest italic">
              Unregistered Specialist?{" "}
              <Link to="/doctor/signup" className="text-blue-600 hover:text-slate-900 transition-colors ml-1 font-black underline underline-offset-4">
                Initialize Onboarding
              </Link>
            </p>
            <div className="flex items-center gap-2 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700">
               <ShieldCheck size={14} className="text-slate-400" />
               <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em]">256-Bit SSL Secured</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DoctorLogin;