import React, { useState } from "react";
import UserSignup from "./UserSignup";
import { userLogin } from "../../sevices/userApi";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [email,setEmail]=useState("")
  const [passord,setPassword]=useState("")
const navigate=useNavigate()
  const handleSubmit=async(e)=>{
   e.preventDefault()
   let {data}=await userLogin(email,passord)
   console.log(data);
   if(data.success){
    localStorage.setItem("userToken", data.token);
    navigate("/home")
   }else{
    
   }
  }
  return (
    <div>
      <div className="min-h-screen hero bg-base-200">
        <div className="flex-col hero-content lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h3 className="text-5xl font-bold">WELCOME</h3>
            <h4 className="py-6 text-4xl font-medium">TO BABYCARE</h4>
          </div>
          <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    className="input input-bordered"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <div className="flex">
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </label>
                    <label htmlFor="user_signup" className="ml-20 label">
                      <a className="label-text-alt link link-hover">
                        Register Your Account!
                      </a>
                    </label>
                  </div>
                </div>
                <div className="mt-6 form-control">
                  <button className="btn btn-primary">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <UserSignup />
    </div>
  );
}

export default UserLogin;
