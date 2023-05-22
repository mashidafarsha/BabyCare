import React, { useEffect, useState } from "react";
import { getNavProfile } from "../../sevices/doctorApi";
import EditDoctorProfile from "../profile/EditDoctorProfile";
import { BaseUrl } from "../../constants/constants";
function DoctorProfile() {
  const [load, setLoad] = useState(false);
  const [doctor, setDoctor] = useState("");
  useEffect(() => {
    getDoctorData();
  }, [load]);

  const getDoctorData = async () => {
    let { data } = await getNavProfile();
    console.log(data);
    setDoctor(data.doctorProfile);
  };
 
  const handleLoad = () => {
    setLoad(!load);
  };
 
 
  return (
    <div className="h-screen overflow-hidden bg-emerald-100 ">
      <div className="flex items-start justify-center w-full h-32">
        <div className="mt-8 shadow stats">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Downloads</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center w-full mt-8 ">
        <div className="shadow-xl card w-96 bg-[#7493a863] rounded-box bg-gradient-to-r from-teal-400">
          <figure className="px-10 pt-10">
            <div className="avatar">
              <div className="w-40 rounded-xl">
                <img className="" src={`${BaseUrl}/${doctor.image}`} />
              </div>
            </div>
          </figure>
          <div className="items-center text-center card-body">
            <h2 className="card-title">{doctor.name}</h2>
            <p>{doctor.qualification}</p>
            <div className="card-actions">
               <label htmlFor="doctor_profile" className="btn" >
                        View your profile
                      </label>
              
            </div>
          </div>
        </div>
      </div>
      <EditDoctorProfile doctorData={doctor} handleLoad={handleLoad}/>
    </div>
  );
}

export default DoctorProfile;
