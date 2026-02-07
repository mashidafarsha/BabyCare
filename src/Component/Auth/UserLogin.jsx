import React, { useEffect, useState } from "react";
import { userLogin } from "../../sevices/userApi";
import { useNavigate, Link } from "react-router-dom";
import { setUserDetails } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2"; // sweetalert2 ആണ് കൂടുതൽ ലുക്ക്

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // typo fixed: passord -> password
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate('/');
    }
  }, [navigate]);

  const generateError = (err) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err,
      confirmButtonColor: '#2563eb'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return generateError("Please fill all fields");

    let { data } = await userLogin(email, password);
    if (data) {
      if (data.errors) {
        if (data.errors.email) generateError(data.errors.email);
        else if (data.errors.password) generateError(data.errors.password);
      } else {
        localStorage.setItem("userToken", data.token);
        dispatch(setUserDetails({ user: data.user }));
        navigate("/");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Illustration & Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h1 className="text-6xl font-black tracking-tighter italic uppercase mb-6">TrueCare</h1>
          <p className="text-blue-100 text-xl font-medium leading-relaxed">
            Your health is our priority. Connect with expert doctors and manage your appointments seamlessly.
          </p>
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-4 bg-blue-700/50 p-4 rounded-2xl backdrop-blur-sm">
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">✓</div>
              <p className="font-bold">24/7 Expert Consultation</p>
            </div>
            <div className="flex items-center gap-4 bg-blue-700/50 p-4 rounded-2xl backdrop-blur-sm">
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">✓</div>
              <p className="font-bold">Secure Health Records</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 font-medium mt-2 text-sm uppercase tracking-widest">Enter your details to login</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="form-control">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div className="form-control">
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Password</label>
                  <a href="#" className="text-[10px] font-black text-blue-600 uppercase hover:underline">Forgot?</a>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Login Button */}
              <button className="w-full py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg mt-4">
                Login Now
              </button>
            </div>

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">
                New to TrueCare? 
                <Link to={'/signup'} className="text-blue-600 ml-2 hover:underline">Register Account</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;