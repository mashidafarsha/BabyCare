import React, { useEffect, useState } from "react";
import { scheduledDoctorSlot, cancelDoctorSchedule, getUserBookedSlot } from "../../sevices/doctorApi";
import Swal from "sweetalert2";
import moment from "moment";

function DoctorSelectedSlots() {
  const [load, setLoad] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [bookedSlot, setBookedSlot] = useState([]);
  
  const today = moment().startOf("day");
  const dates = [];
  for (let i = 1; i <= 10; i++) {
    dates.push(today.clone().add(i, "days"));
  }

  useEffect(() => {
    getSheduledSlot();
    getBookedSlot();
  }, [load]);

  const handleLoad = () => setLoad(!load);

  const handleDateSelect = (date) => setSelectedDate(date);

  const getBookedSlot = async () => {
    let { data } = await getUserBookedSlot();
    if (data.success) setBookedSlot(data.bookedSlots);
  };

  const getSheduledSlot = async () => {
    let { data } = await scheduledDoctorSlot();
    setSlots(data.slots);
  };

  const getTimeSlot = () => {
    let timeSlots = [];
    if (selectedDate) {
      for (let i = 10; i <= 17; i++) {
        const startTime = moment(selectedDate).hour(i).minute(0);
        const endTime = moment(selectedDate).hour(i + 1).minute(0);
        timeSlots.push({ startTime, endTime });
      }
      return timeSlots;
    }
  };

  const cancelSchedule = async (startTimeStr) => {
    // ഒരു യൂസർ ബുക്ക് ചെയ്ത സ്ലോട്ട് ആണോ എന്ന് പരിശോധിക്കുന്നു
    const isBooked = bookedSlot.some(slot => slot.bookingTime === startTimeStr);
    
    if (isBooked) {
      return Swal.fire("Action Blocked", "This slot is already booked by a patient and cannot be deleted.", "error");
    }

    Swal.fire({
      title: "Remove this slot?",
      text: "Patients will no longer be able to book this time.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Remove it",
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl font-bold uppercase tracking-widest text-xs px-6 py-3',
        cancelButton: 'rounded-xl font-bold uppercase tracking-widest text-xs px-6 py-3'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        let { data } = await cancelDoctorSchedule(startTimeStr);
        if (data.success) {
          Swal.fire("Removed!", "The time slot has been deleted.", "success");
          handleLoad();
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">My Scheduled Slots</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium uppercase tracking-widest">Manage your existing time slots and appointments</p>
        </div>

        {/* Date Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3 mb-10">
          {dates.map((date, index) => {
            const isSelected = selectedDate && selectedDate.isSame(date, 'day');
            return (
              <button
                key={index}
                onClick={() => handleDateSelect(date)}
                className={`p-4 rounded-2xl flex flex-col items-center justify-center transition-all border-2 
                  ${isSelected ? "bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-200" 
                  : "bg-white border-slate-100 text-slate-600 hover:border-teal-300"}`}
              >
                <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">{date.format("ddd")}</span>
                <span className="text-lg font-black tracking-tighter">{date.format("DD")}</span>
                <span className="text-[10px] font-bold uppercase">{date.format("MMM")}</span>
              </button>
            );
          })}
        </div>

        {/* Slots Area */}
        {selectedDate && (
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-slate-50 pb-6">
              <h2 className="text-xl font-black text-slate-800 italic uppercase">
                Your Slots <span className="text-teal-600 text-sm ml-2">— {selectedDate.format("MMMM Do, YYYY")}</span>
              </h2>
              <div className="flex gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Booked by Patient</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Available Slot</span>
                </div>
              </div>
            </div>

            {/* Time Slots Rendering */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getTimeSlot().map(({ startTime, endTime }, idx) => {
                const timeStr = startTime.format("MMMM Do YYYY, h:mm:ss a");
                const isScheduled = slots.includes(timeStr);
                const isBooked = bookedSlot.some(slot => slot.bookingTime === timeStr);

                if (!isScheduled) return null; // ഷെഡ്യൂൾ ചെയ്യാത്ത സ്ലോട്ടുകൾ കാണിക്കില്ല

                return (
                  <button
                    key={idx}
                    onClick={() => cancelSchedule(timeStr)}
                    className={`group relative py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2
                      ${isBooked 
                        ? "bg-blue-50 border-blue-100 text-blue-700 cursor-not-allowed shadow-sm" 
                        : "bg-teal-50 border-teal-50 text-teal-700 hover:border-red-400 hover:bg-red-50 hover:text-red-600"}`}
                  >
                    <span className="group-hover:hidden">
                      {startTime.format("hh:mm A")} - {endTime.format("hh:mm A")}
                    </span>
                    <span className="hidden group-hover:inline">
                      {isBooked ? "Confirmed Appointment" : "Cancel Slot"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Empty State */}
            {slots.filter(s => s.includes(selectedDate.format("MMMM Do YYYY"))).length === 0 && (
              <div className="text-center py-10">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No slots scheduled for this day.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default DoctorSelectedSlots;