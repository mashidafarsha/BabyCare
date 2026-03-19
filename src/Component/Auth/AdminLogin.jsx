import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../redux/features/adminSlice";
import { adminLogin } from "../../sevices/adminApi";
import { Lock, Mail, ShieldCheck, HeartPulse } from "lucide-react";

function AdminLogin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let { data } = await adminLogin(values);
      if (data) {
        if (data.errors) {
          Swal.fire({
            icon: "error",
            title: "Authentication Failed",
            text: data.errors.email || data.errors.password || "Invalid credentials provided.",
            confirmButtonColor: "#2563EB",
            borderRadius: "2rem"
          });
        } else {
          localStorage.setItem("adminToken", data.token);
          dispatch(setAdminDetails({ admin: data.admin }));
          Swal.fire({
            icon: "success",
            title: "Access Granted",
            text: "Welcome back to the Command Center.",
            timer: 1500,
            showConfirmButton: false,
            borderRadius: "2rem"
          });
          navigate("/admin");
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "System Error",
        text: "Could not establish connection to the security server.",
        borderRadius: "2rem"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 z-10 m-4 animate-in zoom-in-95 duration-700">
        {/* Visual Brand Side */}
        <div className="w-full md:w-1/2 bg-slate-900 relative p-12 flex flex-col justify-between overflow-hidden">
           <div className="absolute inset-0 opacity-40">
              <img 
                src="https://img.freepik.com/free-photo/technology-security-concept-with-lock_23-2149129596.jpg" 
                className="w-full h-full object-cover grayscale brightness-50"
                alt="Security Background"
              />
           </div>
           
           <div className="relative z-10">
              <div className="flex items-center gap-3 text-white mb-8">
                 <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-900/40">
                    <HeartPulse size={24} />
                 </div>
                 <h2 className="text-2xl font-black uppercase tracking-tighter italic">True Care</h2>
              </div>
              <h1 className="text-4xl font-black text-white leading-tight uppercase tracking-tighter">
                Administrative <br/> 
                <span className="text-blue-500">Security Gateway</span>
              </h1>
              <p className="text-slate-400 mt-6 font-medium leading-relaxed max-w-xs italic text-sm">
                Authorized access only. All sessions are encrypted and logged for clinical integrity and protocol compliance.
              </p>
           </div>

           <div className="relative z-10 pt-12">
              <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest border-t border-white/5 pt-8">
                 <ShieldCheck size={16} className="text-blue-500" />
                 <span>Military Grade SSL Protection</span>
              </div>
           </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-12 md:p-20 bg-white">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">Command Access</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Please authenticate to manage the ecosystem</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Administrator Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="email"
                  required
                  placeholder="admin@truecare.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all shadow-sm"
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Credential</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all shadow-sm"
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
            >
              {loading ? "Authenticating..." : (
                <>
                  Establish Session <ShieldCheck size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[8px] text-slate-300 font-black uppercase tracking-[0.2em]">
              BabyCare Health Management Systems • v2.4.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
