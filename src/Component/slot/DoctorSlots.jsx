import React, { useEffect, useState } from "react";
import moment from "moment";
import { doctorSelectSlot, displayScheduledTime } from "../../sevices/doctorApi";
import Swal from "sweetalert";

function DoctorSlots() {
  const [load, setLoad] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  
  const today = moment().startOf("day");
  const dates = [];

  for (let i = 1; i <= 10; i++) {
    dates.push(today.clone().add(i, "days"));
  }

  useEffect(() => {
    getScheduledTimes();
  }, [load]);

  const handleLoad = () => setLoad(!load);

  const getScheduledTimes = async () => {
    let { data } = await displayScheduledTime();
    if (data.success) setBookedSlots(data.slots);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedTime([]); // പുതിയ ഡേറ്റ് സെലക്ട് ചെയ്യുമ്പോൾ പഴയ സെലക്ഷൻ ക്ലിയർ ചെയ്യുന്നു
  };

  const handleTimeSelect = (timeStr) => {
    if (selectedTime.includes(timeStr)) {
      setSelectedTime(selectedTime.filter((val) => val !== timeStr));
    } else {
      setSelectedTime([...selectedTime, timeStr]);
    }
  };

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

  const handleSubmit = async () => {
    if (selectedTime.length !== 0) {
      let { data } = await doctorSelectSlot(selectedTime);
      if (data.success) {
        Swal("Success", "Successfully Added your Slots", "success");
        handleLoad();
        setSelectedTime([]);
      } else {
        Swal("Error", "Could not add slots", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">Schedule Your Slots</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium uppercase tracking-widest">Select dates and available hours for patients</p>
        </div>

        {/* Date Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3 mb-10">
          {dates.map((date, index) => {
            const isSelected = selectedDate && selectedDate.isSame(date, 'day');
            return (
              <button
                key={index}
                onClick={() => handleSelectDate(date)}
                className={`p-4 rounded-2xl flex flex-col items-center justify-center transition-all border-2 
                  ${isSelected ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" 
                  : "bg-white border-slate-100 text-slate-600 hover:border-blue-300"}`}
              >
                <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">{date.format("ddd")}</span>
                <span className="text-lg font-black tracking-tighter">{date.format("DD")}</span>
                <span className="text-[10px] font-bold uppercase">{date.format("MMM")}</span>
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-slate-50 pb-6">
              <h2 className="text-xl font-black text-slate-800 italic uppercase">
                Available Hours <span className="text-blue-600 text-sm ml-2">— {selectedDate.format("MMMM Do, YYYY")}</span>
              </h2>
              <div className="flex gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-[10px] font-bold uppercase text-slate-400">Selected</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-800 rounded-full"></div><span className="text-[10px] font-bold uppercase text-slate-400">Booked</span></div>
              </div>
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {getTimeSlot().map(({ startTime, endTime }, idx) => {
                const timeStr = startTime.format("MMMM Do YYYY, h:mm:ss a");
                const isBooked = bookedSlots.includes(timeStr);
                const isSelected = selectedTime.includes(timeStr);

                return (
                  <button
                    key={idx}
                    disabled={isBooked}
                    onClick={() => handleTimeSelect(timeStr)}
                    className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2
                      ${isBooked ? "bg-slate-800 border-slate-800 text-slate-400 cursor-not-allowed opacity-50" 
                      : isSelected ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100" 
                      : "bg-slate-50 border-transparent text-slate-600 hover:bg-white hover:border-blue-400"}`}
                  >
                    {startTime.format("LT")} - {endTime.format("LT")}
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            {selectedTime.length > 0 && (
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={handleSubmit}
                  className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                >
                  Confirm & Update Slots ({selectedTime.length})
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorSlots;