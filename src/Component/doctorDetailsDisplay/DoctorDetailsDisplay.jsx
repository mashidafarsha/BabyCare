import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserSlots from "../slot/UserSlots";
function DoctorDetailsDisplay() {
  let { doctorData } = useSelector((state) => state.doctorData);
  console.log(doctorData);
  useEffect(() => {}, []);
  // const [show, setShow] = useState(false)
  
  return (
    <div >
      <div className= 'h-auto hero bg-base-200'>
        <div className="flex-col hero-content lg:flex-row-reverse">
          <div>
            <img
              src={
                doctorData.image
                  ? `http://localhost:4000/${doctorData.image}`
                  : ""
              }
              className="rounded-lg shadow-2xl w-52 h-52"
            />
            <button className="w-auto mt-5 ml-16 bg-blue-700 btn">
              <Link to="/userSlots">Book your Slots</Link>

            </button>
          </div>

          <div>
            <h1 className="text-2xl font-bold">Dr: {doctorData.name}</h1>
            <hr className="w-auto my-3 border-t-2 border-gray-400" />
            <h1 className="font-medium text-indigo-900">
              {doctorData.department} | {doctorData.experience}
            </h1>
            <hr className="w-auto my-3 border-t-2 border-gray-400" />
            <div>
              <h1 className="text-xs font-semibold">Education</h1>
              <p className="text-sm font-semibold">
                {doctorData.qualification}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={show ? 'block' : 'hidden'}>
      <UserSlots  doctorData={doctorData}/>
      </div> */}
      
    </div>
  );
}

export default DoctorDetailsDisplay;
