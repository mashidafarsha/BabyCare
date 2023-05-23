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
