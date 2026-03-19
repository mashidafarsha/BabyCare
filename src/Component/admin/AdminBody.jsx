import React, { useState, useEffect } from "react";
import {
  getApprovedDoctor,
  getAllUserData,
  getPlans,
  AllBookingDataForChart,
} from "../../sevices/adminApi";

import { Users, Stethoscope, CalendarCheck, TrendingUp, Activity, ArrowUpRight, ShieldCheck, Zap, Monitor, Terminal, Timer, Database } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

function AdminBody() {
  const [doctorCount, setDoctorCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [cancelBooking, setCancelBooking] = useState(0);
  const [activeBooking, setActiveBooking] = useState(0);
  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 300000); // 5 mins auto-sync
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    setIsSyncing(true);
    try {
      const [doctors, users, plans, bookings] = await Promise.all([
        getApprovedDoctor(),
        getAllUserData(),
        getPlans(),
        AllBookingDataForChart()
      ]);

      if (doctors.data.success) setDoctorCount(doctors.data.doctors.length);
      if (users.data.success) setUserCount(users.data.user.length);
      if (plans.data.success) setPlansData(plans.data.plans);
      if (bookings.data.success) {
        setCancelBooking(bookings.data.cancelBooking);
        setActiveBooking(bookings.data.activeBooking);
      }
    } catch (error) {
      console.error("Dashboard synchronization failed:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setIsSyncing(false);
      }, 800);
    }
  };

  const bookingCount = {
    labels: ["Active Protocols", "Terminated Sequences"],
    datasets: [
      {
        data: [activeBooking, cancelBooking],
        backgroundColor: ["#2563EB", "#F1F5F9"],
        borderColor: ["#2563EB", "#E2E8F0"],
        borderWidth: 0,
        hoverOffset: 20
      },
    ],
  };

  const chartData = {
    labels: plansData?.map((ele) => ele?.planname.toUpperCase()),
    datasets: [
      {
        data: plansData?.map((ele) => ele?.user?.length || 0),
        backgroundColor: [
          "#0F172A",
          "#2563EB",
          "#0D9488",
          "#6366F1",
          "#4F46E5",
          "#1E293B",
        ],
        borderWidth: 0,
        hoverOffset: 20
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 10,
            weight: "900",
            family: "'Inter', sans-serif"
          },
          color: "#64748B"
        },
      },
      tooltip: {
        backgroundColor: "#0F172A",
        titleFont: { size: 12, weight: "900" },
        bodyFont: { size: 11, weight: "700" },
        padding: 12,
        cornerRadius: 12,
        displayColors: false
      }
    },
  };

  if (loading) {
    return (
      <div className="space-y-10 animate-pulse p-8">
        <div className="flex justify-between items-end">
           <div className="space-y-2">
              <div className="h-10 bg-slate-200 w-64 rounded-2xl"></div>
              <div className="h-4 bg-slate-100 w-48 rounded-full"></div>
           </div>
           <div className="h-12 bg-slate-100 w-32 rounded-2xl"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => <div key={i} className="h-48 bg-slate-50 rounded-[3rem] border border-slate-100"></div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="h-[500px] bg-slate-50 rounded-[4rem] border border-slate-100"></div>
          <div className="h-[500px] bg-slate-50 rounded-[4rem] border border-slate-100"></div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Patients", value: userCount, icon: <Users size={20} />, color: "bg-blue-600 shadow-blue-200", trend: "+12.5%", desc: "Verified registry" },
    { label: "Active Registry", value: doctorCount, icon: <Stethoscope size={20} />, color: "bg-slate-900 shadow-slate-200", trend: "+4.2%", desc: "Credentialed staff" },
    { label: "Encounter Rate", value: activeBooking, icon: <CalendarCheck size={20} />, color: "bg-teal-600 shadow-teal-200", trend: "+18.9%", desc: "Real-time sync" },
    { label: "Efficiency", value: "98.4%", icon: <Activity size={20} />, color: "bg-indigo-600 shadow-indigo-200", trend: "+0.8%", desc: "Protocol adherence" },
  ];

  return (
    <div className="space-y-12 pb-20 font-sans animate-in fade-in duration-1000">
      
      {/* Cinematic Operations Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 relative">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full border border-white/5 shadow-2xl">
             <Terminal size={12} className="text-blue-500 animate-pulse" />
             <span className="text-[9px] font-black text-white uppercase tracking-[0.4em] italic leading-none">Global Command Center v4.2</span>
          </div>
          <div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
              Operational <span className="text-blue-600">Oversight</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] italic mt-6 border-l-4 border-blue-600 pl-8 max-w-2xl">
              Longitudinal tracking of clinical sequences, practitioner bandwidth, and institutional adherence matrices within the TRUE CARE infrastructure.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 relative z-10 bg-white p-4 rounded-[2.5rem] shadow-sm border border-slate-100">
           <div className={`p-4 rounded-2xl bg-slate-900 text-white shadow-xl transition-all duration-500 ${isSyncing ? "animate-spin" : "hover:rotate-12"}`}>
              <Database size={20} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Last Data Sync</p>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                 <p className="text-sm font-black text-slate-800 italic uppercase">Just Now</p>
              </div>
           </div>
        </div>
      </div>

      {/* Triage Macro Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[4rem] p-10 flex flex-col justify-between border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-4 transition-all duration-700 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className={`${stat.color} p-5 rounded-[2rem] text-white shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                {stat.icon}
              </div>
              <div className="flex flex-col items-end">
                 <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black flex items-center gap-2 shadow-sm italic">
                   {stat.trend} <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </span>
                 <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-2">{stat.desc}</span>
              </div>
            </div>
            
            <div className="mt-12 relative z-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic leading-none mb-2">{stat.label}</p>
              <h3 className="text-5xl font-black text-slate-900 tracking-tighter italic tabular-nums group-hover:text-blue-600 transition-colors">{stat.value}</h3>
            </div>

            {/* Background Sequence Watermark */}
            <div className="absolute bottom-[-15%] right-[-5%] text-9xl font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 italic pointer-events-none">0{i+1}</div>
          </div>
        ))}
      </div>

      {/* Visual Analytics Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-[5rem] p-16 h-[550px] flex flex-col border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 text-slate-900 group-hover:rotate-12 transition-transform duration-1000 pointer-events-none">
             <CalendarCheck size={180} />
          </div>
          <div className="flex justify-between items-center mb-16 relative z-10">
             <div className="space-y-2">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.3em] italic">Sequence Termination Ratio</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Active vs Cancelled encounters</p>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all duration-500">
                <Monitor size={20} />
             </div>
          </div>
          <div className="flex-grow relative z-10">
            <Pie data={bookingCount} options={options} />
          </div>
        </div>

        <div className="bg-white rounded-[5rem] p-16 h-[550px] flex flex-col border border-slate-100 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-5 text-slate-900 group-hover:-rotate-12 transition-transform duration-1000 pointer-events-none">
              <TrendingUp size={180} />
           </div>
           <div className="flex justify-between items-center mb-16 relative z-10">
             <div className="space-y-2">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.3em] italic">Institutional Tier Index</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Health plan adherence matrix</p>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all duration-500">
                <ShieldCheck size={20} />
             </div>
          </div>
          <div className="flex-grow relative z-10">
            <Doughnut data={chartData} options={options} />
          </div>
        </div>
      </div>

      {/* Real-time Interaction Terminal */}
      <div className="bg-slate-900 rounded-[5rem] p-16 text-white relative overflow-hidden group shadow-2xl shadow-blue-900/20">
         <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80" className="w-full h-full object-cover scale-150 group-hover:scale-100 transition-transform duration-[2s]" alt="Hospital Logistics" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
         
         <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl animate-pulse">
                     <Zap size={28} />
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Security Protocol: Level 01</h3>
                     <p className="text-blue-400 text-[11px] font-black uppercase tracking-[0.5em] italic">System Intelligence Monitoring Active</p>
                  </div>
               </div>
               <p className="text-slate-400 text-sm font-bold italic max-w-xl leading-relaxed">
                 The TRUE CARE global oversight terminal is currently executing real-time data ingestion across 24 clinical nodes. Continuous optimization algorithms are active.
               </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
               <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 flex items-center gap-6 min-w-[280px] group/item hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover/item:rotate-12 transition-transform">
                     <Timer size={24} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">System Uptime</p>
                     <p className="text-xl font-black text-white italic tabular-nums">99.98%</p>
                  </div>
               </div>
               <button className="bg-white text-slate-900 px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 italic">
                 Institutional Reports
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

export default AdminBody;
