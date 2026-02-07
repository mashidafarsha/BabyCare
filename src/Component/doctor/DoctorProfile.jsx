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
    setDoctor(data.doctorProfile);
  };

  const handleLoad = () => setLoad(!load);

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center py-12 px-4">
      <div className="max-w-md w-full">
        
        {/* Profile Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 overflow-hidden border border-slate-100 relative pt-12">
          
          {/* Top Decorative Circle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-br from-blue-600 to-indigo-700 -z-0 opacity-10"></div>

          <div className="relative flex flex-col items-center p-8">
            
            {/* Avatar with Ring */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-lg border-4 border-white relative">
                <img 
                  className="w-full h-full object-cover" 
                  src={`${BaseUrl}/${doctor.image}`} 
                  alt={doctor.name} 
                />
              </div>
            </div>

            {/* Info */}
            <div className="text-center mt-6">
              <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tight">
                Dr. {doctor.name}
              </h2>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mt-1">
                {doctor.department || "Medical Specialist"}
              </p>
              
              <div className="h-px w-12 bg-slate-100 mx-auto my-6"></div>
              
              <p className="text-slate-500 text-sm font-medium italic">
                {doctor.qualification || "Qualification details not added"}
              </p>
            </div>

            {/* Action Button */}
            <div className="w-full mt-8">
              <label 
                htmlFor="doctor_profile" 
                className="flex items-center justify-center w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all cursor-pointer shadow-lg shadow-slate-200 active:scale-95"
              >
                Edit your profile
              </label>
            </div>
          </div>

          {/* Bottom Stats or Info (Optional) */}
          <div className="bg-slate-50 p-6 flex justify-around border-t border-slate-100">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase">Consultation</p>
              <p className="text-sm font-bold text-slate-700">₹{doctor.consultationFee || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase">Status</p>
              <span className="text-[10px] px-2 py-1 bg-green-100 text-green-700 rounded-full font-black uppercase">Active</span>
            </div>
          </div>
        </div>

        {/* Modal/Edit Component */}
        <EditDoctorProfile doctorData={doctor} handleLoad={handleLoad}/>
      </div>
    </div>
  );
}

export default DoctorProfile;