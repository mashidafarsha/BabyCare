import React, { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import { getSelectedDoctorDetails } from "../../sevices/userApi";
import { BaseUrl } from "../../constants/constants";
import { GraduationCap, Award, Calendar, Heart, Star, CheckCircle, User, Briefcase, MapPin } from "lucide-react";

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

  if (!doctorData) return (
     <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-500">Loading doctor profile...</p>
     </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left: Profile Image & Key Info */}
          <div className="w-full lg:w-1/3 bg-slate-50 p-10 flex flex-col items-center border-r border-slate-200">
             <div className="relative mb-8">
                <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                   <img
                     src={doctorData.image || doctorData.imageUrl || "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"}
                     className="w-full h-full object-cover"
                     alt={doctorData.name}
                   />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border-2 border-white shadow-md">
                   Available
                </div>
             </div>

              <div className="text-center space-y-2 mb-10">
                 <h2 className="text-2xl font-bold text-slate-900">Dr. {doctorData.name}</h2>
                 <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">{doctorData.department || "Specialist"}</p>
                 <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                    <Star size={16} className="text-orange-400 fill-orange-400" />
                    <span className="font-bold text-slate-700">4.9</span>
                    <span>(Professional Rating)</span>
                 </div>
              </div>

              {/* Fee & Rapid Info */}
              <div className="w-full grid grid-cols-2 gap-4 mb-10">
                 <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Consultation</p>
                    <p className="text-lg font-black text-slate-900">₹{doctorData.consultationFee || "TBD"}</p>
                 </div>
                 <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center shadow-sm">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xs font-black text-green-600 uppercase">Active</p>
                 </div>
              </div>

              <Link 
                to={`/userSlots?id=${doctorData._id}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-100 active:scale-95"
              >
                <Calendar size={18} />
                Book Appointment
              </Link>
              
              <p className="mt-6 text-[10px] text-slate-400 uppercase font-bold tracking-wider">Verified Professional Profile</p>
           </div>

           {/* Right: Detailed Credentials */}
           <div className="w-full lg:w-2/3 p-10 lg:p-16 space-y-12">
             
             <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <User size={20} className="text-blue-600" />
                  Professional Summary
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm italic">
                  {doctorData.about || "This practitioner has not yet provided a professional biography. They are a dedicated member of our clinical team committed to patient care."}
                </p>
             </section>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-4">
                   <div className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                      <Briefcase size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                      <p className="text-lg font-bold text-slate-800">{doctorData.experience || "Not Disclosed"}</p>
                   </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-4">
                   <div className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                      <GraduationCap size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Education</p>
                      <p className="text-lg font-bold text-slate-800">{doctorData.qualification || "Degrees not listed"}</p>
                   </div>
                </div>
             </div>

             <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle size={20} className="text-blue-600" />
                  Specialties & Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                   {[doctorData.department || "General", "Clinical Excellence", "Patient Care", "Diagnosis"].map((skill, i) => (
                     <span key={i} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold border border-blue-100">
                        {skill}
                     </span>
                   ))}
                </div>
             </section>

             <section className="pt-8 border-t border-slate-100 flex flex-wrap gap-8 items-center justify-between">
                <div className="flex items-center gap-3">
                   <Heart size={20} className="text-red-500" />
                   <div>
                      <p className="text-sm font-bold text-slate-800">100% Patient Focus</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Compassionate Care</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <MapPin size={20} className="text-blue-600" />
                   <div>
                      <p className="text-sm font-bold text-slate-800">{doctorData.address || "Main Clinical Hub"}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Clinic Location</p>
                   </div>
                </div>
             </section>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DoctorDetailsDisplay;