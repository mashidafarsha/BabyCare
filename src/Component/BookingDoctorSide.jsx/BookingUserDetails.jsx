import React, { useEffect, useState } from "react";
import { getDoctorActiveBooking } from "../../sevices/doctorApi";
import { Calendar, Clock, UserCheck, ArrowRight, Search } from "lucide-react";

function BookingUserDetails() {
  const [bookedData, setBookedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getActiveBookings();
  }, []);

  const getActiveBookings = async () => {
    try {
      let { data } = await getDoctorActiveBooking();
      if (data.success) {
        setBookedData(data.bookedSlots);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // സെർച്ച് ചെയ്യാനുള്ള സൗകര്യം (Extra Feature for Interview)
  const filteredBookings = bookedData.filter(item => 
    item.UserId?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
              Patient <span className="text-blue-600">Appointments</span>
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              Manage your daily schedule and patient flow
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search patient name..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Summary (ഇതൊരു പ്രൊഫഷണൽ ടച്ച് നൽകും) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-200">
            <p className="text-[10px] font-black uppercase opacity-80 tracking-[0.2em]">Total Bookings</p>
            <h3 className="text-3xl font-black mt-1">{bookedData.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Next Patient</p>
            <h3 className="text-lg font-bold text-slate-800 mt-1 truncate">
              {bookedData[0]?.UserId?.name || "No upcoming"}
            </h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-center">
             <Calendar className="text-blue-600 mr-2" />
             <span className="font-black text-slate-700 uppercase text-xs">{new Date().toDateString()}</span>
          </div>
        </div>

        {/* Main List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((data, index) => (
              <div 
                key={index}
                className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
              >
                {/* Time Badge */}
                <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <Clock size={12} className="text-blue-600" />
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">
                    {data.bookingTime.split(',')[1]} {/* സമയം മാത്രം എടുക്കാൻ */}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                    <UserCheck size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                      {data.UserId?.name}
                    </h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Patient ID: #{data._id.slice(-6)}</p>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Date</span>
                    <span className="text-xs font-bold text-slate-700">{data.bookingTime.split(',')[0]}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Status</span>
                    <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-black uppercase">Confirmed</span>
                  </div>
                </div>

                <button className="w-full mt-8 flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all shadow-lg active:scale-95">
                  Attend Now <ArrowRight size={14} />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-slate-100 shadow-inner">
              <p className="text-slate-400 font-black uppercase tracking-widest italic">No appointments matched your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingUserDetails;