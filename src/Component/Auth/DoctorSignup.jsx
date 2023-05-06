import React from "react";
import { useState } from "react";
import { doctorSignup } from "../../sevices/doctorApi";
import axios from "../../axios/doctorAxios"
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import DoctorOtp from "../../Component/Auth/DoctorOtp";

function DoctorSignup() {
    const [load, setLoad] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const generateError = (err) => {
    Swal(err);
  };

  const generateSuccess = (err) => {
    Swal(err);
  };
  const handleLoad = () => {
    setLoad(!load);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(values);
      let { data } = await doctorSignup(values)
      
    
      console.log(data, "oooo");
      if (data.otpSend) {
      
        const signupModal= document.getElementById("doctorSignup")
        const otpModal= document.getElementById("sent_otp")
        signupModal.checked=false
        otpModal.checked=true
     
      } else {
        generateError(data.message);
      }
    } catch {}
  };
  return (
    <>
      <input type="checkbox" id="doctorSignup" className="modal-toggle" />
      <label htmlFor="doctorSignup" className="cursor-pointer modal">
        <label className="relative modal-box overflow-y-auto scrollbar-none scrollbar-thumb-gray-400 scrollbar-track-transparent" htmlFor="doctorSignup">
          <div className="h-auto w-auto">
            <h1 className="mb-10 font-bold">PLEASE SIGNUP BABYCARE</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div className="card-body">
              <div>
                <div className="block mb-2">
                  <label htmlFor="category">Name</label>
                </div>
                <input
                    className="input input-bordered"
                  id="categoryName"
                  type="text"
                  required={true}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="block mb-2">
                  <label htmlFor="description">Email</label>
                </div>
                <input
                  className="input input-bordered"
                  id="description"
                  type="text"
                  required={true}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="block mb-2">
                  <label htmlFor="description">Password</label>
                </div>
                <input
                   className="input input-bordered"
                  id="description"
                  type="text"
                  required={true}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="block mb-2">
                  <label htmlFor="description">ConfirmPassword</label>
                </div>
                <input
                   className="input input-bordered"
                  id="description"
                  type="text"
                  required={true}
                  onChange={(e) =>
                    setValues({ ...values, confirmPassword: e.target.value })
                  }
                />
              </div>
              <div className="">
                
                <button
                  className="mt-2 w-40 btn btn-outline btn-secondary"
                  htmlFor="doctorSignup"
                >
                  SUBMIT
                </button>
               
              </div>
              </div>
            </form>
          </div>
       
        </label>
      </label>
      <DoctorOtp handleLoad={handleLoad} load={load} />
    </>

    
  );
}

export default DoctorSignup;
