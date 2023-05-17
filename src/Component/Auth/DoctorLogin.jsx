import React, { useEffect, useState } from "react";
import { doctorLogin } from "../../sevices/doctorApi";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDoctorDetails } from "../../redux/features/doctorSlice";
import { Link } from "react-router-dom";
import DoctorSignup from "./DoctorSignup";

function DoctorLogin() {
  // const [load, setLoad] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("doctorWaitingToken")) {
      navigate("/doctor/waiting");
    } else if (localStorage.getItem("doctorToken")) {
      navigate("/doctor/doctorHome");
    }
  }, []);

  // const handleLoad = () => {
  //   setLoad(!load);
  // };
  const generateError = (err) => {
    Swal(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let { data } = await doctorLogin(values);

      console.log(data, "data");
      if (data.errors) {
        if (data.errors.email) generateError(data.errors.email);
        else if (data.errors.password) generateError(data.errors.password);
      } else if (data.doctor.status === "Active") {
        localStorage.setItem("doctorToken", data.token);
        console.log(data.doctor, "oooo");
        dispatch(setDoctorDetails({ doctor: data.doctor }));
        console.log("kkkk");
        navigate("/doctor/doctorHome");
      } else {
        navigate("/doctor/Info");
      }
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row ">
        <div className="w-auto">
          <img
            className="w-80 h-96"
            src="https://i.pinimg.com/564x/16/20/29/162029f2471a6bfdc34cae1b491154bd.jpg"
            alt=""
          />
        </div>
        <div className="bg-blue-400 w-80 h-96 ">
          <h1 className="mt-5 text-2xl font-semibold text-center text-gray-700">
            BABY DOCTOR LOGIN
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600">
                LOGIN
              </button>
            </div>
            <button>
              <Link to={"/doctor/signup"}>
                {" "}
                <p>You have no account?</p>
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
