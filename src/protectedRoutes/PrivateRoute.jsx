import React, { useEffect, useState } from "react";
import { authAdmin } from "../sevices/adminApi";
import { authDoctor } from "../sevices/doctorApi";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { setDoctorDetails } from "../redux/features/doctorSlice";
import { setAdminDetails } from "../redux/features/adminSlice";
import { setUserDetails } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { authUser } from "../sevices/userApi";

function PrivateRoute({ role, route }) {
  let [auth, setAuth] = useState(null);
  let [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (role === "user") {
      authUser()
        .then((response) => {
          console.log(response);
          if (response.data.status == false) {
            localStorage.removeItem("userToken");
            dispatch(setUserDetails({}))
            navigate("/")
          }else{
            dispatch(setUserDetails({ user: response.data.userData }))
            setAuth(response.data?.status);
            setMessage(response.data?.message);
          }
         
        })
        .catch((response) => {
          console.log(response)
          setAuth(response.data?.status)
          navigate('/')
        });
    } else if (role === "admin") {
      authAdmin()
        .then((response) => {
          console.log(response);
          if (response.data.status == false) {
            localStorage.removeItem("adminToken");
            dispatch(setUserDetails({}))
            navigate("/admin");
          }else{
            dispatch(setAdminDetails({ admin: response.data.adminData }))
            setAuth(response.data?.status);
            setMessage(response.data?.message);
          }
       
        })
        .catch((response) => {
          console.log(response);
          setAuth(response.data?.status);
          navigate("/admin");
        });
    } else if (role === "doctor") {
      authDoctor()
        .then((response) => {
          console.log(response.data);
          if (response.data.status == false) {
            localStorage.removeItem("doctorToken");
            dispatch(setDoctorDetails({}));
            navigate("/doctor");
          } else {
            console.log("dispatch");
            dispatch(setDoctorDetails({ doctor: response.data.doctorData }))
            setAuth(response.data?.status);
            setMessage(response.data?.message);
          }
        })
        .catch((response) => {
          console.log(response);
          setAuth(response.data?.status);
          navigate("/doctor");
        });
    }
  }, []);

  if (auth == null) return;
  return auth ? <Outlet /> : <Navigate to={route} />;
}

export default PrivateRoute;
