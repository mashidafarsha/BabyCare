import React, { useEffect, useState } from "react";
import { getNavProfile, getDoctorActiveBooking, scheduledDoctorSlot } from "../../sevices/doctorApi";
import EditDoctorProfile from "../profile/EditDoctorProfile";
import { BaseUrl } from "../../constants/constants";
import { User, Activity, Calendar, DollarSign, Award, ChevronRight, Settings, Star, ShieldCheck, Stethoscope, HeartPulse, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DoctorProfile() {
  const [load, setLoad] = useState(false);
  const [doctor, setDoctor] = useState("");
  const [activeBookings, setActiveBookings] = useState(0);
  const [scheduledSlots, setScheduledSlots] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getDoctorData();
  }, [load]);

  const getDoctorData = async () => {
    try {
      const [{ data: profileData }, { data: bookingData }, { data: slotData }] = await Promise.all([
        getNavProfile(),
        getDoctorActiveBooking(),
        scheduledDoctorSlot()
      ]);
      
      setDoctor(profileData.doctorProfile);
      setActiveBookings(bookingData.activeBookings?.length || 0);
      setScheduledSlots(slotData.scheduledSlots?.length || 0);
    } catch (err) {
      console.error("Dashboard synchronization failed:", err);
    }
  };

  const handleLoad = () => setLoad(!load);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6 lg:px-12 animate-in fade-in duration-1000">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Clinical Command</h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] flex items-center gap-2">
              <Activity size={14} className="text-blue-500 animate-pulse" /> Platform Operational • Real-time Sync
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-[1.5rem] shadow-sm border border-slate-100">
             <div className="flex -space-x-3 px-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                  </div>
                ))}
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
               <span className="text-blue-600 block mb-0.5">{activeBookings} Patients</span> Queued Today
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Identity Segment */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-32 bg-slate-900 group-hover:h-36 transition-all duration-500"></div>
              
              <div className="relative pt-16 pb-8 px-8 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
                  <div className="w-36 h-36 rounded-[2.2rem] overflow-hidden border-4 border-white shadow-xl relative z-10">
                    <img 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
                      src={doctor.image || doctor.imageUrl || "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"}
                      alt={doctor.name} 
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white z-20"></div>
                </div>

                <div className="text-center mt-6 space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Dr. {doctor.name}</h2>
                    <ShieldCheck size={20} className="text-blue-500" />
                  </div>
                  <div className="px-4 py-1.5 bg-blue-50 rounded-full inline-block">
                    <span className="text-blue-600 font-black text-[9px] uppercase tracking-widest">{doctor.department}</span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 mt-10">
                   <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Fee</p>
                      <p className="text-sm font-black text-slate-800">₹{doctor.consultationFee}</p>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Rating</p>
                      <div className="flex items-center justify-center gap-1 text-orange-400">
                         <Star size={12} fill="currentColor" />
                         <span className="text-sm font-black text-slate-800">4.9</span>
                      </div>
                   </div>
                </div>

                <label 
                  htmlFor="doctor_profile" 
                  className="w-full mt-8 bg-slate-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all cursor-pointer shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95"
                >
                  Edit Practitioner Profile <Settings size={16} />
                </label>
              </div>
            </div>

            {/* Verification Metadata */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">Credentials & Certifications</h3>
              <div className="space-y-4">
                  {[
                    { icon: <Award className="text-blue-500" />, label: "Qualification", value: doctor.qualification || "Degrees not listed" },
                    { icon: <Stethoscope className="text-teal-500" />, label: "Experience", value: doctor.experience || "Not Disclosed" },
                    { icon: <MapPin className="text-indigo-500" />, label: "Location", value: doctor.address || "Main Hub" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                          {item.icon}
                       </div>
                       <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{item.label}</p>
                          <p className="text-xs font-black text-slate-700 mt-0.5">{item.value}</p>
                       </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Operational Metrics Segment */}
          <div className="lg:col-span-8 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { label: "Active Sessions", value: activeBookings, icon: <Activity />, color: "bg-blue-600 shadow-blue-200" },
                 { label: "Booked Slots", value: scheduledSlots, icon: <Calendar />, color: "bg-teal-600 shadow-teal-200" },
                 { label: "Revenue generated", value: `₹${activeBookings * (doctor.consultationFee || 0)}`, icon: <DollarSign />, color: "bg-indigo-600 shadow-indigo-200" }
               ].map((stat, idx) => (
                 <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                    <div className="relative z-10 flex flex-col justify-between h-full">
                       <div className={`${stat.color} w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                          {stat.icon}
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                          <h4 className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</h4>
                       </div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 opacity-5 text-slate-900 group-hover:scale-125 transition-transform duration-700">
                       {React.cloneElement(stat.icon, { size: 120 })}
                    </div>
                 </div>
               ))}
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm overflow-hidden relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
               
               <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div>
                     <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">Schedule Optimization</h3>
                     <p className="text-slate-400 font-bold text-xs mt-2 max-w-sm italic">Configure your clinical availability and manage patient consultations through our unified schedule interface.</p>
                  </div>
                  <div className="flex gap-4">
                     <button 
                       onClick={() => navigate("/doctor/doctorSlot")}
                       className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-2xl shadow-blue-100 transition-all active:scale-95"
                     >
                       Manage Slots <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                  </div>
               </div>
            </div>

            {/* System Intelligence Greeting */}
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative h-64 flex flex-col justify-center overflow-hidden">
               <div className="absolute inset-0 opacity-20">
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Hospital View" />
               </div>
               <div className="relative z-10 space-y-4">
                  <h3 className="text-3xl font-black italic tracking-tighter leading-tight">GOOD DAY, <br/><span className="text-blue-500">DR. {doctor.name?.toUpperCase()}</span></h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest max-w-md italic">The 'True Care' network is currently experiencing high volume in {doctor.department}. Stay optimized.</p>
               </div>
               <div className="absolute right-12 bottom-0 top-0 flex items-center opacity-10">
                  <HeartPulse size={200} />
               </div>
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