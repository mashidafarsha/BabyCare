import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdminDetails } from "../../features/adminSlice";

function AdminLogin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const admin=useSelector((state)=>state.admin)

  const generateError = (err) => {
    Swal(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values, "values");
    try {
      let { data } = await axios.post(
        "http://localhost:4000/admin/adminLogin",
        { ...values }
      );
      console.log(data, "data");
      if (data) {
        if (data.errors) {
          console.log(data.errors);
          if (data.errors.email) generateError(data.errors.email);
          else if (data.errors.password) generateError(data.errors.password);
        } else {
          localStorage.setItem("adminToken", data.token);
          dispatch(
            setAdminDetails({
              email: data.admin.email,
              name: data.admin.name,
              token: data.token,
            })
          );
          navigate("/adminHome");
        }
      
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="flex md:flex-row flex-col ">
        <div className="w-auto">
          <img
            className="w-80 h-96"
            src="https://i.pinimg.com/564x/16/20/29/162029f2471a6bfdc34cae1b491154bd.jpg"
            alt=""
          />
        </div>
        <div className="w-80 h-96   bg-blue-400 ">
          <h1 className="mt-5 text-2xl font-semibold text-center text-gray-700">
            BABY CARE
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
