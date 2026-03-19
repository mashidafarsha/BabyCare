import React, { useEffect, useState } from "react";
import moment from "moment";
import { doctorSelectSlot, displayScheduledTime } from "../../sevices/doctorApi";
import Swal from "sweetalert2";
import { Calendar, Clock, CheckCircle2, AlertCircle, ChevronRight, Lock, History, ShieldCheck, Zap } from "lucide-react";

function DoctorSlots() {
  const [load, setLoad] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    try {
      let { data } = await displayScheduledTime();
      if (data.success) setBookedSlots(data.slots);
    } catch (err) {
      console.error("Failed to fetch slots", err);
    }
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedTime([]); 
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
        const startTime = moment(selectedDate).hour(i).minute(0).second(0).millisecond(0);
        const endTime = moment(selectedDate).hour(i + 1).minute(0).second(0).millisecond(0);
        timeSlots.push({ startTime, endTime });
      }
    }
    return timeSlots;
  };

  const handleSubmit = async () => {
    if (selectedTime.length === 0) return;

    setIsSubmitting(true);
    try {
      let { data } = await doctorSelectSlot(selectedTime);
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Schedule Synchronized",
          text: `Successfully added ${selectedTime.length} new clinical slots.`,
          timer: 2000,
          showConfirmButton: false,
          borderRadius: "2rem"
        });
        handleLoad();
        setSelectedTime([]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Allocation Failed",
          text: data.message || "Could not register clinical slots.",
          borderRadius: "2rem"
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6 lg:px-12 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Technical Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
               <Zap size={12} className="text-blue-600 fill-blue-600" />
               <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none">Scheduler Engine v2.0</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Clinical Slot Architect</h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] flex items-center gap-2">
              <Calendar size={14} className="text-blue-500" /> Precision Resource Allocation • Next 10 Days
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100">
             <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                <History size={20} />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Committed Slots</p>
                <p className="text-xl font-black text-slate-900 tracking-tight">{bookedSlots.length} Total</p>
             </div>
          </div>
        </div>

        {/* Calendar Navigation Ribbon */}
        <div className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-slate-100 flex overflow-x-auto scrollbar-none gap-2">
          {dates.map((date, index) => {
            const isSelected = selectedDate && selectedDate.isSame(date, 'day');
            return (
              <button
                key={index}
                onClick={() => handleSelectDate(date)}
                className={`min-w-[100px] flex-1 py-5 rounded-[1.8rem] flex flex-col items-center justify-center transition-all duration-300 group
                  ${isSelected ? "bg-blue-600 text-white shadow-2xl shadow-blue-200 scale-105 z-10" 
                  : "hover:bg-slate-50 text-slate-500 border border-transparent hover:border-slate-100"}`}
              >
                <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isSelected ? "text-blue-100/70" : "text-slate-400"}`}>{date.format("ddd")}</span>
                <span className="text-2xl font-black tracking-tighter tabular-nums leading-none">{date.format("DD")}</span>
                <span className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${isSelected ? "text-blue-200" : "text-slate-400 group-hover:text-blue-600"}`}>{date.format("MMM")}</span>
              </button>
            );
          })}
        </div>

        {selectedDate ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
             {/* Information Panel */}
             <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden h-full flex flex-col justify-between">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
                   
                   <div className="relative z-10 space-y-6">
                      <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 mb-4">
                         <ShieldCheck size={32} className="text-blue-400" />
                      </div>
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Clinical <br/>Registry</h2>
                      <div className="space-y-4 pt-6 border-t border-white/5">
                         <div className="flex items-start gap-4">
                            <Clock size={18} className="text-blue-400 mt-1" />
                            <div>
                               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Date</p>
                               <p className="text-sm font-bold text-slate-300">{selectedDate.format("MMMM Do, YYYY")}</p>
                            </div>
                         </div>
                         <div className="flex items-start gap-4">
                            <CheckCircle2 size={18} className="text-green-400 mt-1" />
                            <div>
                               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Selected Allocation</p>
                               <p className="text-sm font-bold text-slate-300">{selectedTime.length} Hours Targeted</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="relative z-10 pt-10">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">System Intelligence Policy:</p>
                      <p className="text-xs text-slate-500 mt-2 font-medium italic leading-relaxed">Ensure physical clinical readiness for all committed slots. Modifications require 24h lead time.</p>
                   </div>
                </div>
             </div>

             {/* Slot Selection Segment */}
             <div className="lg:col-span-8 bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-slate-900 group-hover:scale-110 transition-transform duration-1000">
                   <Clock size={240} />
                </div>
                
                <div className="relative z-10">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                      <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic flex items-center gap-3">
                         Resource Availability Grid <AlertCircle size={20} className="text-slate-300" />
                      </h3>
                      <div className="flex gap-4">
                         <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Active Choice</span>
                         </div>
                         <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Committed</span>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {getTimeSlot().map(({ startTime, endTime }, idx) => {
                       const timeStr = startTime.format("MMMM Do YYYY, h:mm:ss a");
                       const isBooked = bookedSlots.includes(timeStr);
                       const isSelected = selectedTime.includes(timeStr);

                       return (
                         <button
                           key={idx}
                           disabled={isBooked}
                           onClick={() => handleTimeSelect(timeStr)}
                           className={`p-6 rounded-[2rem] flex items-center justify-between transition-all duration-300 border-2 group/slot
                             ${isBooked ? "bg-slate-900 border-slate-900 text-slate-500 cursor-not-allowed" 
                             : isSelected ? "bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-200" 
                             : "bg-slate-50 border-transparent text-slate-700 hover:bg-white hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5"}`}
                         >
                           <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-2xl transition-colors ${isSelected ? "bg-blue-500 text-white" : isBooked ? "bg-slate-800" : "bg-white group-hover/slot:bg-blue-50 group-hover/slot:text-blue-600"}`}>
                                 <Clock size={16} />
                              </div>
                              <div className="text-left">
                                 <p className={`text-sm font-black tracking-tight ${isSelected ? "text-white" : "text-slate-800"}`}>{startTime.format("h:mm A")}</p>
                                 <p className={`text-[10px] font-bold ${isSelected ? "text-blue-100" : "text-slate-400"}`}>Duration: 60m</p>
                              </div>
                           </div>
                           <div className="flex items-center">
                              {isBooked ? <Lock size={14} /> : isSelected ? <CheckCircle2 size={18} /> : <ChevronRight size={14} className="opacity-0 group-hover/slot:opacity-100 transition-opacity translate-x-1" />}
                           </div>
                         </button>
                       );
                     })}
                   </div>

                   {/* Registry Submission */}
                   <div className={`mt-12 transition-all duration-500 ${selectedTime.length > 0 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                      <button 
                         onClick={handleSubmit}
                         disabled={isSubmitting}
                         className="w-full bg-slate-900 hover:bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 transition-all active:scale-95 group/btn overflow-hidden relative"
                      >
                         <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                         <span className="relative z-10 flex items-center gap-3">
                            {isSubmitting ? "Sychronizing Infrastructure..." : `Authorize Registry Update (${selectedTime.length} Slots)`}
                            <ShieldCheck size={18} />
                         </span>
                      </button>
                   </div>
                </div>
             </div>
          </div>
        ) : (
          <div className="bg-white rounded-[4rem] p-24 text-center border border-slate-100 animate-pulse">
             <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-slate-100">
                <Calendar size={40} className="text-slate-200" />
             </div>
             <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">Pending Date Selection</h3>
             <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] mt-3">Select a date from the ribbon above to architect your clinical schedule</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorSlots;