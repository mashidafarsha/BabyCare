import React, { useState } from "react";
import { userOtpSubmit } from "../../sevices/userApi";
import { useNavigate } from "react-router-dom";

function UserOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("kkkkk");
    console.log(otp);
    let { data } = await userOtpSubmit(otp);
    console.log(data);
    if (data.success) {
      navigate("/");
    } else {
      console.log(data);
    }
  };

  return (
    <div>
      <input type="checkbox" id="user_otp" className="modal-toggle" />
      <label htmlFor="user_otp" className="cursor-pointer modal">
        <label
          className="relative modal-box bg-gradient-to-r from-pink-50 to-indigo-600"
          htmlFor="user_otp"
        >
          <div className="h-64 w-96">
            <h1 className="mb-10 font-bold">Enter Your OTP</h1>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">OTP</span>
                  </label>
                  <input
                    type="number"
                    placeholder="phone"
                    className="input input-bordered"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="modal-action">
                  <button
                    className="btn btn-outline bg-gradient-to-r from-violet-900 to-indigo-600 text-white"
                    htmlFor="user_otp"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </label>
      </label>
    </div>
  );
}

export default UserOtp;
