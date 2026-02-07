import React, { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import { getSelectedDoctorDetails } from "../../sevices/userApi";
import { BaseUrl } from "../../constants/constants";

function DoctorDetailsDisplay() {
  const [doctorData, setDoctorData] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get('id');

  useEffect(() => {
    if (doctorId) getDoctorData();
  }, [doctorId]);

  const getDoctorData = async () => {
    try {
      let { data } = await getSelectedDoctorDetails(doctorId);
      if (data.success) {
        setDoctorData(data.doctor);
      }
    } catch (error) {
      console.error("Error fetching doctor data", error);
    }
  };

  if (!doctorData) return <div className="text-center py-20 font-bold">Loading Doctor Profile...</div>;

  return (
    <div className="container mx-auto px-4 lg:px-20">
      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
        <div className="flex flex-col md:flex-row">
          
          {/* Left Side: Image & Action */}
          <div className="w-full md:w-2/5 lg:w-1/3 bg-slate-50 p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-slate-100">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-3xl rotate-6 scale-105 opacity-20 group-hover:rotate-12 transition-transform"></div>
              <img
                src={doctorData.image ? `${BaseUrl}/${doctorData.image}` : "https://via.placeholder.com/300"}
                className="relative z-10 rounded-3xl shadow-lg w-64 h-64 object-cover border-4 border-white"
                alt={doctorData.name}
              />
            </div>
            
            <Link 
              to={`/userSlots?id=${doctorData._id}`}
              className="mt-8 w-full bg-blue-600 text-white text-center py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-slate-900 transition-all transform active:scale-95"
            >
              Book Appointment Slot
            </Link>
          </div>

          {/* Right Side: Information */}
          <div className="w-full md:w-3/5 lg:w-2/3 p-8 md:p-12 lg:p-16">
            <div className="mb-6">
              <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Verified Specialist
              </span>
              <h1 className="text-4xl font-black text-slate-800 mt-4 leading-tight">
                Dr. {doctorData.name}
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Department</p>
                <p className="text-lg font-bold text-slate-700 uppercase">{doctorData.department}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Experience</p>
                <p className="text-lg font-bold text-slate-700">{doctorData.experience}</p>
              </div>
            </div>

            <hr className="border-slate-100 my-8" />

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2 italic underline decoration-2 underline-offset-4">
                  Educational Background
                </h3>
                <p className="text-slate-600 text-lg font-medium leading-relaxed">
                  {doctorData.qualification}
                </p>
              </div>
              
              {/* Optional: About section if you have doctorData.description */}
              {doctorData.description && (
                <div>
                  <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2 italic">
                    About Doctor
                  </h3>
                  <p className="text-slate-500 leading-relaxed italic">
                    {doctorData.description}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DoctorDetailsDisplay;