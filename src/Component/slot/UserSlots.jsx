import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import SlotBookingAddress from "./SlotBookingAddress";
import { getUserBookedSlot, getSelectedDoctorDetails } from "../../sevices/userApi";
import { Calendar, Clock, ChevronRight, ArrowLeft, CheckCircle, Briefcase, Star } from "lucide-react";

function UserSlots() {
  const today = moment().startOf("day");
  const [userSelectTime, setUserSelectTime] = useState("");
  const [doctorSlot, setDoctorSlot] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [show, setShow] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [doctorData, setDoctorData] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get("id");

  useEffect(() => {
    getDoctorData();
    getBookedSlot();
  }, []);

  const getDoctorData = async () => {
    try {
      let { data } = await getSelectedDoctorDetails(doctorId);
      if (data.success) {
        setDoctorData(data.doctor);
        setDoctorSlot(data.doctor?.slots);
      }
    } catch (err) {}
  };

  const getBookedSlot = async () => {
    let { data } = await getUserBookedSlot(doctorId);
    if (data.success) setBookedSlots(data.bookingTimes);
  };

  const dates = [];
  for (let i = 1; i < 11; i++) {
    dates.push(today.clone().add(i, "days"));
  }

  const getTimeSlot = () => {
    let timeSlots = [];
    if (selectedDate) {
      for (let i = 10; i <= 17; i++) {
        const startTime = moment(selectedDate).hour(i).minute(0);
        const endTime = moment(selectedDate).hour(i + 1).minute(0);
        timeSlots.push({ startTime, endTime });
      }
    }
    return timeSlots;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {!show ? (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Doctor Profile Card */}
          <div className="lg:w-1/3">
             <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden sticky top-32 animate-fade-in">
                <div className="h-32 bg-slate-900 relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-400/20 mix-blend-overlay"></div>
                </div>
                <div className="px-8 pb-8 relative">
                   <div className="w-32 h-32 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden bg-white -mt-16 mb-6 mx-auto relative z-10 group">
                      <img 
                         src={doctorData?.image || doctorData?.imageUrl || "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"} 
                         alt={doctorData?.name} 
                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                   </div>
                   <div className="text-center">
                      <h2 className="text-2xl font-black text-slate-900 mb-1">Dr. {doctorData?.name}</h2>
                      <p className="text-sm font-bold text-blue-600 mb-4 bg-blue-50 py-1.5 px-4 rounded-full inline-block border border-blue-100">{doctorData?.department}</p>
                      
                      <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-6 bg-slate-50 py-3 rounded-2xl border border-slate-100 font-medium">
                         <Briefcase size={16} className="text-slate-400" /> 
                         <span>{doctorData?.experience || "Experienced Practitioner"}</span>
                      </div>
                      
                      <div className="text-left bg-gradient-to-br from-slate-50 to-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                            Consultation Fee
                            <Star size={12} className="text-amber-400" />
                         </p>
                         <p className="text-xl font-black text-slate-900">₹{doctorData?.consultationFee || "Not Disclosed"}</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Column: Date & Time Slots */}
          <div className="lg:w-2/3">
             <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="bg-slate-50 p-8 lg:p-10 border-b border-slate-200">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                         <Calendar size={24} />
                      </div>
                      <div>
                         <h2 className="text-2xl font-bold text-slate-900 leading-tight">Book Appointment</h2>
                         <p className="text-slate-500 text-sm mt-1">Select your preferred date and time slot</p>
                      </div>
                   </div>
                </div>

                <div className="p-8 lg:p-10">
                  {/* Step 1: Date Selection */}
                  <div className="mb-12">
                     <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-3">
                        <span className="w-5 h-5 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center text-[10px]">1</span>
                        Select Date
                     </h3>
                     
                     <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar px-1">
                       {dates.map((date, index) => (
                         <button
                           key={index}
                           onClick={() => setSelectedDate(date)}
                           className={`flex-shrink-0 w-[5.5rem] py-5 rounded-2xl border-2 transition-all duration-300 transform active:scale-95 ${
                             selectedDate && selectedDate.isSame(date, 'day')
                             ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-600/20 transform -translate-y-1"
                             : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white hover:-translate-y-1 hover:shadow-md"
                           }`}
                         >
                           <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedDate && selectedDate.isSame(date, 'day') ? "text-blue-100" : "text-slate-400"}`}>{date.format("ddd")}</p>
                           <p className="text-2xl font-black leading-none my-1.5">{date.format("DD")}</p>
                           <p className={`text-[10px] font-bold uppercase tracking-widest ${selectedDate && selectedDate.isSame(date, 'day') ? "text-blue-200" : "text-slate-400 opacity-60"}`}>{date.format("MMM")}</p>
                         </button>
                       ))}
                     </div>
                  </div>

                  {/* Step 2: Time Selection */}
                  {selectedDate ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-3">
                         <span className="w-5 h-5 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center text-[10px]">2</span>
                         Select Time Slot
                      </h3>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {getTimeSlot().map(({ startTime, endTime }, idx) => {
                          const slotString = startTime.format("MMMM Do YYYY, h:mm:ss a");
                          const isDoctorAvailable = doctorSlot?.includes(slotString);
                          const isBooked = bookedSlots.includes(slotString);
                          const isSelected = userSelectTime === slotString;

                          if (!isDoctorAvailable) return null;

                          return (
                            <button
                              key={idx}
                              disabled={isBooked}
                              onClick={() => setUserSelectTime(isSelected ? "" : slotString)}
                              className={`py-4 px-2 rounded-[1.25rem] transition-all duration-300 border-2 flex flex-col items-center gap-2 transform active:scale-95 ${
                                isBooked 
                                  ? "bg-slate-50 border-transparent border-slate-100 text-slate-300 cursor-not-allowed opacity-60" 
                                  : isSelected
                                  ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20 -translate-y-1"
                                  : "bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-1 hover:shadow-md"
                              }`}
                            >
                              <Clock size={16} className={isSelected ? "text-slate-400" : isBooked ? "text-slate-200" : "text-slate-400"} />
                              <span className="text-sm font-black tracking-tight">
                                {startTime.format("hh:mm A")}
                              </span>
                              {isBooked ? (
                                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Reserved</span>
                              ) : isSelected ? (
                                <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">Selected</span>
                              ) : (
                                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Available</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                     <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4 border border-slate-100">
                           <Calendar size={24} className="text-slate-300" />
                        </div>
                        <p className="text-sm font-bold text-slate-500">Select a date to view available time slots</p>
                     </div>
                  )}

                  {/* Action Bar */}
                  <div className={`mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-500 ${userSelectTime ? 'opacity-100 my-0' : 'opacity-0 h-0 overflow-hidden mt-0 pt-0 border-transparent'}`}>
                    <div className="flex items-center gap-4 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100 w-full sm:w-auto">
                       <div className="bg-emerald-500 rounded-full p-1 text-white shadow-sm">
                          <CheckCircle size={14} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Status</p>
                          <p className="text-sm font-bold text-emerald-800 leading-none">Slot Ready</p>
                       </div>
                    </div>
                    <button
                      disabled={!userSelectTime}
                      onClick={() => setShow(true)}
                      className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black tracking-wide text-sm transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-95 disabled:cursor-not-allowed group"
                    >
                      Proceed to Checkout <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
             </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 lg:p-12 mb-8">
             <div className="flex items-center gap-4 mb-10">
                <button 
                  onClick={() => setShow(false)} 
                  className="w-12 h-12 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all border border-slate-200"
                >
                   <ArrowLeft size={20} />
                </button>
                <div>
                   <h2 className="text-2xl font-bold text-slate-900 leading-tight">Patient Details</h2>
                   <p className="text-sm text-slate-500">Finalize your appointment information</p>
                </div>
             </div>
             
             <SlotBookingAddress
               doctorData={doctorData}
               userSelectTime={userSelectTime}
             />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSlots;