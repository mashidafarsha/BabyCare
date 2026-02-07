import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import SlotBookingAddress from "./SlotBookingAddress";
import { getUserBookedSlot, getSelectedDoctorDetails } from "../../sevices/userApi";

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
    <div className="container mx-auto px-4">
      {!show ? (
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          
          {/* Header Section */}
          <div className="bg-slate-900 p-8 text-center text-white">
            <h2 className="text-2xl font-black italic uppercase tracking-wider">Select Your Appointment</h2>
            <p className="text-slate-400 text-sm mt-1">Available slots for Dr. {doctorData?.name}</p>
          </div>

          <div className="p-6 md:p-10">
            {/* Date Selection Grid */}
            <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4 italic">Step 1: Pick a Date</h3>
            <div className="flex overflow-x-auto gap-4 pb-6 no-scrollbar">
              {dates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 w-24 py-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedDate && selectedDate.isSame(date, 'day')
                    ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md"
                    : "border-slate-100 hover:border-blue-200 text-slate-500"
                  }`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-tighter">{date.format("ddd")}</p>
                  <p className="text-xl font-black">{date.format("DD")}</p>
                  <p className="text-[10px] font-medium">{date.format("MMM")}</p>
                </button>
              ))}
            </div>

            {/* Time Slot Selection */}
            {selectedDate && (
              <div className="mt-10 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4 italic">Step 2: Choose a Time Slot</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        className={`py-4 px-6 rounded-2xl font-bold transition-all text-sm border-2 ${
                          isBooked 
                            ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed line-through" 
                            : isSelected
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                            : "bg-white border-slate-100 text-slate-600 hover:border-blue-300"
                        }`}
                      >
                        {startTime.format("hh:mm A")} - {endTime.format("hh:mm A")}
                        {isBooked && <span className="block text-[8px] uppercase tracking-widest mt-1">Booked</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className={`mt-12 pt-8 border-t transition-all ${userSelectTime ? 'opacity-100' : 'opacity-30'}`}>
              <button
                disabled={!userSelectTime}
                onClick={() => setShow(true)}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all disabled:cursor-not-allowed shadow-xl"
              >
                Proceed to Booking Address
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <SlotBookingAddress
            doctorData={doctorData}
            userSelectTime={userSelectTime}
          />
          <div className="text-center mt-6">
            <button onClick={() => setShow(false)} className="text-blue-600 font-bold hover:underline">
              ← Go back and change slot
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSlots;