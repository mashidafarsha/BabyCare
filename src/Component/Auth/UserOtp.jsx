import React, { useState } from "react";
import { userOtpSubmit } from "../../sevices/userApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UserOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return Swal.fire("Error", "Please enter the OTP", "error");

    let { data } = await userOtpSubmit(otp);
    if (data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Verified!',
        text: 'Account created successfully',
        timer: 2000,
        showConfirmButton: false
      });
      navigate("/");
    } else {
      Swal.fire("Failed", "Invalid OTP, please try again", "error");
    }
  };

  return (
    <div>
      <input type="checkbox" id="user_otp" className="modal-toggle" />
      <div className="modal backdrop-blur-sm bg-slate-900/40">
        <div className="modal-box p-0 overflow-hidden rounded-[2.5rem] max-w-sm border-none shadow-2xl bg-white">
          
          {/* Top Header Section */}
          <div className="bg-blue-600 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m10-5V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h4" />
              </svg>
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight italic">Verify OTP</h2>
            <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Check your registered mobile/email</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1 text-center">Enter 4 or 6 Digit Code</label>
                  <input
                    type="text"
                    placeholder="0 0 0 0"
                    maxLength="6"
                    className="w-full py-4 bg-slate-50 border-none rounded-2xl text-center text-2xl font-black tracking-[0.5em] focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-200"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg"
                  >
                    Verify & Proceed
                  </button>
                  
                  <label 
                    htmlFor="user_otp" 
                    className="w-full block text-center py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 cursor-pointer transition-colors"
                  >
                    Cancel Request
                  </label>
                </div>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default UserOtp;