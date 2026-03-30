import React from "react";
import { Users, Award, Heart, Clock } from "lucide-react";

function TrustStats() {
  const stats = [
    { 
      label: "Specialized Doctors", 
      value: "200+", 
      icon: <Users size={24} />, 
      desc: "Top-rated medical professionals in every field." 
    },
    { 
      label: "Years of Excellence", 
      value: "15+", 
      icon: <Award size={24} />, 
      desc: "Delivering world-class healthcare since 2010." 
    },
    { 
      label: "Happy Patients", 
      value: "100k+", 
      icon: <Heart size={24} />, 
      desc: "Trusted by thousands of families for their care." 
    },
    { 
      label: "Emergency Support", 
      value: "24/7", 
      icon: <Clock size={24} />, 
      desc: "Always here for you when you need us most." 
    }
  ];

  return (
    <section className="py-24 bg-slate-900 rounded-[3rem] mx-4 md:mx-10 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="group animate-slide-up"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-blue-400 flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                {stat.label}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustStats;
