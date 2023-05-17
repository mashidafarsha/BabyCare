import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNavProfile } from "../../sevices/doctorApi";
import { useNavigate } from "react-router-dom";
function DoctorNavbar() {
  const [doctorImage, setDoctorImage] = useState("");
  useEffect(() => {
    getDoctorData();
  }, []);
  const navigate = useNavigate();
  const getDoctorData = async () => {
    let { data } = await getNavProfile();
    console.log(data);
    setDoctorImage(data.doctorProfile.image);
  };
  return (
    <div>
      <div className="bg-teal-500 navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/doctor/doctorSlot"}>All Slots</Link>{" "}
              </li>

              <li>
                <Link to={"/doctor/doctorSchedules"}>My Slots</Link>
              </li>
              <li>
                <Link to={"/doctor/bookingDetails"}>Booking Users</Link>
              </li>
            </ul>
          </div>
          <a className="text-xl normal-case btn btn-ghost">
            <Link to={"/doctor/doctorHome"}>BABY CARE</Link>
          </a>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 menu menu-horizontal">
            <li>
              <Link to={"/doctor/doctorSlot"}>All Slots</Link>
            </li>

            <li>
              <Link to={"/doctor/doctorSchedules"}>My Slots</Link>
            </li>
            <li>
                <Link to={"/doctor/bookingDetails"}>Booking Users</Link>
              </li>
          </ul>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={`http://localhost:4000/${doctorImage}`} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  onClick={() => {
                    localStorage.removeItem("doctorToken");
                    navigate("/doctor");
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorNavbar;
