import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../constants/constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function UserNavbar() {
  const [image,setImage]=useState("")
  let {user} = useSelector((state) => state.user);
  useEffect(() => {
    setImage(user.image)
  }, []);
  const navigate=useNavigate()
  // const getUserProfileData = async () => {
  //   let { data } = await getUserProfile();
  //   if(data.success){
  //     
  //   }
  // };
  return (
    <div className="">
      <div className="bg-blue-300 shadow-2xl navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden ">
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
                <a>Doctors</a>
              </li>
              <li>
              <a> <Link to={'/department'}>Department</Link></a>
              </li>
              <li>
              <a> <Link to={'/plans'}>Plans</Link></a>
              </li>
              <li>
               
                <a> <Link to={'/myAppointment'}>My appointments</Link></a>
              </li>
            </ul>
          </div>
          <a className="text-xl italic normal-case btn btn-ghost">
            <Link to={"/home"}> PRO CARE</Link>
          </a>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 menu menu-horizontal">
            <li>
              <a>
                <Link to={""}>Doctors</Link>
              </a>
            </li>
            <li>
            <a> <Link to={'/department'}>Department</Link></a>
            </li>
            <li>
            <a> <Link to={'/plans'}>Plans</Link></a>
            </li>
            <li>
            <a> <Link to={'/myAppointment'}>My appointments</Link></a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={`${BaseUrl}/${image}`} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    <Link to={"/profile"}>Profile</Link>
                  </a>
                </li>

                <li>
                  <a
                    onClick={() => {
                      localStorage.removeItem("userToken");
                      navigate("/login");
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
    </div>
  );
}

export default UserNavbar;
