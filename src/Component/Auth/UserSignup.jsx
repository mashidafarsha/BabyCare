import React, { useState } from "react";
import { userSignup } from "../../sevices/userApi";
import UserOtp from "./UserOtp";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UserSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Passwords mismatch check
    if(password !== cPassword) {
      return Swal.fire({ icon: 'error', title: 'Mismatch', text: 'Passwords do not match!' });
    }

    try {
      // API call
      let response = await userSignup(name, email, phone, password, cPassword);
      console.log("Signup Response:", response); // റെസ്‌പോൺസ് വരുന്നുണ്ടോ എന്ന് നോക്കുക

      // നിങ്ങളുടെ API ഡാറ്റാ സ്ട്രക്ചർ അനുസരിച്ച് ഇത് മാറ്റുക
      // മിക്കവാറും response.data അല്ലെങ്കിൽ response.data.data എന്നായിരിക്കും
      const result = response.data; 

      if(result && result.status === "pending") {
        const userOtpCheckbox = document.getElementById("user_otp");
        if(userOtpCheckbox) {
          userOtpCheckbox.checked = true; // മോഡൽ ഓപ്പൺ ചെയ്യുന്നു
        }
      } else if (result && result.success) {
         Swal.fire('Success', 'Registration successful', 'success').then(() => {
           navigate("/login");
         });
      } else {
         Swal.fire('Error', result.message || 'Signup failed', 'error');
      }
    } catch (error) {
      console.error("Signup Error:", error);
      Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    }
  };
  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Left Side: Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h1 className="text-6xl font-black tracking-tighter italic uppercase mb-6">TrueCare</h1>
          <p className="text-blue-100 text-xl font-medium leading-relaxed">
            Join our community today. Get access to the best medical professionals and take control of your health journey.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-700/50 rounded-2xl backdrop-blur-sm text-center">
              <p className="text-2xl font-bold">100+</p>
              <p className="text-[10px] uppercase font-black tracking-widest opacity-70">Doctors</p>
            </div>
            <div className="p-4 bg-blue-700/50 rounded-2xl backdrop-blur-sm text-center">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-[10px] uppercase font-black tracking-widest opacity-70">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-md my-10">
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tight">Create Account</h2>
            <p className="text-slate-500 font-medium mt-2 text-sm uppercase tracking-widest">Start your journey with us</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-5">
            {/* Name */}
            <div className="form-control">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="form-control">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 ml-1">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* Phone */}
              <div className="form-control">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 ml-1">Phone</label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 ml-1">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => setCpassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg mt-4">
              Register Now
            </button>

            <div className="mt-6 text-center">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">
                Already have an account? 
                <Link to={'/'} className="text-blue-600 ml-2 hover:underline">Login Here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <UserOtp />
    </div>
  );
}

export default UserSignup;