import React, { useEffect, useState } from "react";
import { scheduledDoctorSlot, cancelDoctorSchedule, getUserBookedSlot } from "../../sevices/doctorApi";
import Swal from "sweetalert2";
import moment from "moment";
import { Calendar, Clock, CheckCircle, XCircle, User, ShieldAlert, ChevronRight, Activity, Trash2, Info } from "lucide-react";

function DoctorSelectedSlots() {
  const [load, setLoad] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [bookedSlot, setBookedSlot] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const today = moment().startOf("day");
  const dates = [];
  for (let i = 1; i <= 10; i++) {
    dates.push(today.clone().add(i, "days"));
  }

  useEffect(() => {
    syncClinicalData();
  }, [load]);

  const handleLoad = () => setLoad(!load);

  const handleDateSelect = (date) => setSelectedDate(date);

  const syncClinicalData = async () => {
    setIsSyncing(true);
    try {
      const [{ data: bookedData }, { data: scheduledData }] = await Promise.all([
        getUserBookedSlot(),
        scheduledDoctorSlot()
      ]);
      
      if (bookedData.success) setBookedSlot(bookedData.bookedSlots);
      if (scheduledData) setSlots(scheduledData.slots);
    } catch (err) {
      console.error("Clinical sync failure:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const getTimeSlot = () => {
    let timeSlots = [];
    if (selectedDate) {
      for (let i = 10; i <= 17; i++) {
        const startTime = moment(selectedDate).hour(i).minute(0).second(0).millisecond(0);
        const endTime = moment(selectedDate).hour(i + 1).minute(0).second(0).millisecond(0);
        timeSlots.push({ startTime, endTime });
      }
      return timeSlots;
    }
    return [];
  };

  const cancelSchedule = async (startTimeStr) => {
    const isBooked = bookedSlot.some(slot => slot.bookingTime === startTimeStr);
    
    if (isBooked) {
      return Swal.fire({
        icon: "error",
        title: "Protocol Violation",
        text: "This slot is committed to a patient encounter and cannot be terminated via this interface.",
        borderRadius: "2rem"
      });
    }

    Swal.fire({
      title: "Terminate Clinical Slot?",
      text: "This time segment will be removed from your public availability.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Terminate Slot",
      borderRadius: "2.5rem",
      customClass: {
        confirmButton: 'rounded-2xl font-black uppercase tracking-widest text-[10px] px-8 py-4',
        cancelButton: 'rounded-2xl font-black uppercase tracking-widest text-[10px] px-8 py-4'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        let { data } = await cancelDoctorSchedule(startTimeStr);
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Slot Terminated",
            timer: 1500,
            showConfirmButton: false,
            borderRadius: "2rem"
          });
          handleLoad();
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6 lg:px-12 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Navigation Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
               <Activity size={12} className="text-teal-600 animate-pulse" />
               <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest leading-none">Schedule Ledger Active</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Clinical Schedule Ledger</h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] flex items-center gap-2">
              <Calendar size={14} className="text-teal-500" /> Operational Overview • Patient Encounters
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className={`p-4 rounded-[1.8rem] bg-white border border-slate-100 shadow-sm transition-all ${isSyncing ? "opacity-50" : "opacity-100"}`}>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                   <span className="text-xs font-black text-slate-800 uppercase italic">Real-time Sync</span>
                </div>
             </div>
          </div>
        </div>

        {/* Date Selector Ribbon */}
        <div className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-slate-100 flex overflow-x-auto scrollbar-none gap-2">
          {dates.map((date, index) => {
            const isSelected = selectedDate && selectedDate.isSame(date, 'day');
            return (
              <button
                key={index}
                onClick={() => handleDateSelect(date)}
                className={`min-w-[100px] flex-1 py-5 rounded-[1.8rem] flex flex-col items-center justify-center transition-all duration-300
                  ${isSelected ? "bg-teal-600 text-white shadow-2xl shadow-teal-200 scale-105 z-10" 
                  : "hover:bg-slate-50 text-slate-500 border border-transparent hover:border-slate-100"}`}
              >
                <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isSelected ? "text-teal-100/70" : "text-slate-400"}`}>{date.format("ddd")}</span>
                <span className="text-2xl font-black tracking-tighter tabular-nums leading-none">{date.format("DD")}</span>
                <span className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${isSelected ? "text-teal-200" : "text-slate-400"}`}>{date.format("MMM")}</span>
              </button>
            );
          })}
        </div>

        {selectedDate ? (
          <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-slate-900 group-hover:scale-110 transition-transform duration-1000">
               <Activity size={240} />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter">
                    Encounters Summary <span className="text-teal-600 text-sm ml-2">— {selectedDate.format("MMMM Do")}</span>
                  </h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Architectural Registry for Selected Interval</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50/50 rounded-full border border-blue-100">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-[9px] font-black uppercase text-blue-600 tracking-widest">Patient Booked</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-teal-50/50 rounded-full border border-teal-100">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-[9px] font-black uppercase text-teal-600 tracking-widest">Available</span>
                  </div>
                </div>
              </div>

              {/* Grid Layout for Slots */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getTimeSlot().map(({ startTime, endTime }, idx) => {
                  const timeStr = startTime.format("MMMM Do YYYY, h:mm:ss a");
                  const isScheduled = slots.includes(timeStr);
                  const isBooked = bookedSlot.some(slot => slot.bookingTime === timeStr);

                  if (!isScheduled) return null;

                  return (
                    <div 
                      key={idx}
                      className={`p-6 rounded-[2rem] border-2 transition-all duration-300 flex flex-col justify-between h-48 group/card
                        ${isBooked 
                          ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200" 
                          : "bg-slate-50 border-transparent text-slate-700 hover:bg-white hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-900/5"}`}
                    >
                      <div className="flex justify-between items-start">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isBooked ? "bg-white/10" : "bg-white shadow-sm"}`}>
                            <Clock size={20} className={isBooked ? "text-white" : "text-teal-600"} />
                         </div>
                         <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${isBooked ? "bg-white/20 text-white" : "bg-teal-100 text-teal-700"}`}>
                            {isBooked ? "Committed" : "Open Slot"}
                         </div>
                      </div>

                      <div className="space-y-1">
                         <p className={`text-xl font-black tracking-tighter ${isBooked ? "text-white" : "text-slate-800"}`}>
                            {startTime.format("hh:mm A")}
                         </p>
                         <p className={`text-[10px] font-bold uppercase tracking-widest ${isBooked ? "text-blue-100" : "text-slate-400"}`}>
                            Patient Session • 60 min
                         </p>
                      </div>

                      <div className="flex items-center gap-4 pt-4 border-t border-current/10 overflow-hidden">
                         {isBooked ? (
                           <div className="flex items-center gap-3 w-full">
                              <User size={14} className="text-blue-100" />
                              <span className="text-[10px] font-black uppercase tracking-widest truncate">Reg. Encounter Active</span>
                              <ChevronRight size={14} className="ml-auto opacity-50" />
                           </div>
                         ) : (
                           <button 
                             onClick={() => cancelSchedule(timeStr)}
                             className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors w-full group/btn"
                           >
                              <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform" />
                              <span>Terminate Record</span>
                           </button>
                         )}
                      </div>
                    </div>
                  );
                })}

                {/* Empty Condition for the selected day */}
                {slots.filter(s => s.includes(selectedDate.format("MMMM Do YYYY"))).length === 0 && (
                  <div className="col-span-full py-20 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                       <ShieldAlert size={28} className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">No operational records found for this interval.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[4rem] p-24 text-center border border-slate-100 animate-pulse">
             <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-slate-100">
                <Info size={40} className="text-slate-200" />
             </div>
             <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">Pending Ledger Query</h3>
             <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] mt-3">Select a date segment from the navigation ribbon to access record data</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorSelectedSlots;