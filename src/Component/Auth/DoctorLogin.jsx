import React, { useEffect, useState } from "react";
import { doctorLogin } from "../../sevices/doctorApi";
import Swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDoctorDetails } from "../../redux/features/doctorSlice";

function DoctorLogin() {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("doctorWaitingToken")) {
      navigate("/doctor/waiting");
    } else if (localStorage.getItem("doctorToken")) {
      navigate("/doctor");
    }
  }, [navigate]);

  const generateError = (err) => Swal("Error", err, "error");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await doctorLogin(values);
      if (data.errors) {
        if (data.errors.email) generateError(data.errors.email);
        else if (data.errors.password) generateError(data.errors.password);
      } else if (data.doctor.status === "Active") {
        localStorage.setItem("doctorToken", data.token);
        dispatch(setDoctorDetails({ doctor: data.doctor }));
        navigate("/doctor");
      } else {
        navigate("/doctor/Info");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Image Section (Hidden on small screens) */}
        <div className="hidden md:block md:w-1/2 relative bg-blue-600">
          <img
            className="w-full h-full object-cover opacity-80"
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000"
            alt="Doctor"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex flex-col justify-end p-10">
            <h2 className="text-white text-3xl font-bold italic uppercase tracking-tighter">Welcome back, Doctor.</h2>
            <p className="text-blue-100 mt-2 text-sm">Your patients are waiting for your expertise.</p>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-800 uppercase italic">True Doctor Login</h1>
            <div className="h-1.5 w-16 bg-blue-600 rounded-full mt-2 mx-auto md:mx-0"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Email Address</label>
              <input
                type="email"
                placeholder="doctor@truecare.com"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                onChange={(e) => setValues({ ...values, password: e.target.value })}
                required
              />
            </div>

            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-600 transition-all transform active:scale-[0.98] shadow-lg shadow-slate-200">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account?{" "}
              <Link to="/doctor/signup" className="text-blue-600 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DoctorLogin;