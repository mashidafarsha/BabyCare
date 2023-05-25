import React, { useState } from "react";
import { userSignup } from "../../sevices/userApi";
import UserOtp from "./UserOtp";
import { Link } from "react-router-dom";
function UserSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, phone, password, cPassword, "kkkk");
    let { data } = await userSignup(name, email, phone, password, cPassword);
    console.log(data,"hhhhhhh");
    if(data.data.status==="pending"){
      // let userSignup=document.getElementById("user_signup")
      let userOtp=document.getElementById("user_otp")
      // userSignup.checked=false
      userOtp.checked=true
    }
  };
  return (
    <div>
        <div className="flex items-center justify-center h-full overflow-hidden bg-white">
      {/* <input type="checkbox" id="user_signup" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box"> */}
          {/* <div className="min-h-screen hero bg-base-200"> */}
            
            <div className="h-auto bg-blue-200 md:w-4/12 sm:w-1/2 mt-14 mb-9">
            <h1 className="font-bold text-center mt-9">PLEASE REGISTER</h1>
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-bordered"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="email"
                      className="input input-bordered"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      type="number"
                      placeholder="phone"
                      className="input input-bordered"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="number"
                      placeholder="password"
                      className="input input-bordered"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Confirm password"
                      className="input input-bordered"
                      onChange={(e) => setCpassword(e.target.value)}
                    />
                    <button className="label">
                      <Link to={'/'}> <p className="label-text-alt link link-hover">
                        do you have already account?
                      </p></Link>
                     
                    </button>
                  </div>
                  <div className="mt-6 form-control modal-action">
                    <button type="submit">
                      SUBMIT
                      {/* <label htmlFor="user_signup" className="btn">
                        SUBMIT
                      </label> */}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          {/* </div> */}
        {/* </div> */}
       </div>
      <UserOtp/>
    </div>
  );
}

export default UserSignup;
