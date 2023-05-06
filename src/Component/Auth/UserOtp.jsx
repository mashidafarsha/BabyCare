import React, { useState } from "react";
import {userOtpSubmit} from "../../sevices/userApi";
import { useNavigate } from "react-router-dom";
import AlertError from "../alert/AlertError";
function UserOtp() {
    const [otp,setOtp]=useState("")
const navigate=useNavigate()

const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("kkkkk");
    console.log(otp);
    let {data}=await userOtpSubmit(otp)
   if(data.status){
    navigate("/")
   }else{
    console.log(data);

   }
   
}
    
  return (
    <div>
      <input type="checkbox" id="user_otp" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="min-h-screen hero bg-base-200">
            <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
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
                     onChange={(e)=>setOtp(e.target.value)}
                    />
                  </div>

                  <div className="mt-6 form-control modal-action">
                    <button type="submit">
                     
                        SUBMIT
                    
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserOtp;
