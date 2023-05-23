import React from "react";
import { useState } from "react";
import { doctorSignup } from "../../sevices/doctorApi";

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

  const generateError = (err) => {
    Swal(err);
  };

  const handleLoad = () => {
    setLoad(!load);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(values);
      let { data } = await doctorSignup(values);

      console.log(data, "oooo");
      if (data.otpSend) {
        const otpModal = document.getElementById("sent_otp");

        otpModal.checked = true;
      } else {
        generateError(data.message);
      }
    } catch {}
  };
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen overflow-hidden bg-white">
        <div className="w-4/12 h-auto bg-blue-200 ">
          <h1 className="mt-4 font-bold text-center ">
            PLEASE SIGNUP TRUECARE
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div className="card-body ">
              <div>
                <div className="block mb-2">
                  <label htmlFor="category">Name</label>
                </div>
                <input
                  className="w-full input input-bordered"
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
                  className="w-full input input-bordered"
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
                  className="w-full input input-bordered"
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
                  className="w-full input input-bordered"
                  id="description"
                  type="text"
                  required={true}
                  onChange={(e) =>
                    setValues({ ...values, confirmPassword: e.target.value })
                  }
                />
              </div>
              <div className="">
                <button className="w-full mt-4 btn btn-outline btn-secondary">
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
        </div>

        <DoctorOtp handleLoad={handleLoad} load={load} />
      </div>
    </>
  );
}

export default DoctorSignup;
