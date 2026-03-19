import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import SlotBookingAddress from "./SlotBookingAddress";
import { getUserBookedSlot, getSelectedDoctorDetails } from "../../sevices/userApi";
import { Calendar, Clock, ChevronRight, ArrowLeft, CheckCircle } from "lucide-react";

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
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      {!show ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="bg-slate-50 p-8 lg:p-10 border-b border-slate-200">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <h2 className="text-2xl font-bold text-slate-900 mb-2">Book an Appointment</h2>
                   <p className="text-slate-500 text-sm">Select a convenient date and time for your consultation with Dr. {doctorData?.name}</p>
                </div>
                <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
                   <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Calendar size={20} />
                   </div>
                   <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Specialist</p>
                      <p className="text-sm font-bold text-slate-800">Dr. {doctorData?.name}</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-8 lg:p-12">
            {/* Step 1: Date Selection */}
            <div className="mb-12">
               <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                  Select Date
               </h3>
               
               <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                 {dates.map((date, index) => (
                   <button
                     key={index}
                     onClick={() => setSelectedDate(date)}
                     className={`flex-shrink-0 w-24 py-5 rounded-2xl border-2 transition-all duration-300 ${
                       selectedDate && selectedDate.isSame(date, 'day')
                       ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md"
                       : "border-slate-100 bg-slate-50 text-slate-500 hover:border-blue-200 hover:bg-white"
                     }`}
                   >
                     <p className="text-[10px] font-bold uppercase tracking-widest mb-1">{date.format("ddd")}</p>
                     <p className="text-2xl font-bold leading-none">{date.format("DD")}</p>
                     <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">{date.format("MMM")}</p>
                   </button>
                 ))}
               </div>
            </div>

            {/* Step 2: Time Selection */}
            {selectedDate ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                   <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px]">2</span>
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
                        className={`p-4 rounded-xl transition-all duration-300 border flex flex-col items-center gap-2 ${
                          isBooked 
                            ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed" 
                            : isSelected
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                            : "bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:bg-blue-50/30"
                        }`}
                      >
                        <Clock size={16} className={isSelected ? "text-white" : isBooked ? "text-slate-200" : "text-blue-600"} />
                        <span className="text-sm font-bold">
                          {startTime.format("hh:mm A")}
                        </span>
                        {isBooked && (
                          <span className="text-[8px] font-bold uppercase tracking-widest opacity-60">Reserved</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
               <div className="py-16 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50">
                  <Calendar size={32} className="text-slate-200 mx-auto mb-4" />
                  <p className="text-sm font-medium text-slate-400">Please select a date first</p>
               </div>
            )}

            {/* Action Bar */}
            <div className={`mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-500 ${userSelectTime ? 'opacity-100' : 'opacity-40'}`}>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle size={20} />
                 </div>
                 <p className="text-sm font-medium text-slate-600">Selected slot is available</p>
              </div>
              <button
                disabled={!userSelectTime}
                onClick={() => setShow(true)}
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-3 active:scale-95 disabled:cursor-not-allowed"
              >
                Proceed to Checkout <ChevronRight size={18} />
              </button>
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