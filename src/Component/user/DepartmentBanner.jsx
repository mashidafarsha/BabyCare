import React, { useEffect, useState } from "react";
import { getDepartmentData } from "../../sevices/userApi";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../constants/constants";
import { ArrowRight, Stethoscope, Heart, Brain, Eye, Baby, Syringe, Microscope, ShieldCheck, Dna, Pill } from "lucide-react";

function DepartmentBanner() {
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    getAllDepartment();
  }, []);

  const getAllDepartment = async () => {
    try {
      let { data } = await getDepartmentData();
      if (data.success) {
        setDepartment(data.departmentData);
      }
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  const getDepartmentIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes("cardio")) return <Heart size={24} />;
    if (n.includes("neuro")) return <Brain size={24} />;
    if (n.includes("pediatr") || n.includes("child")) return <Baby size={24} />;
    if (n.includes("eye") || n.includes("opthal")) return <Eye size={24} />;
    if (n.includes("surger")) return <Syringe size={24} />;
    if (n.includes("infect")) return <ShieldCheck size={24} />;
    if (n.includes("pathol")) return <Microscope size={24} />;
    if (n.includes("pharmaco")) return <Pill size={24} />;
    return <Dna size={24} />;
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest animate-fade-in">
              <span className="w-8 h-px bg-blue-600"></span> Clinical Excellence
            </div>
            <h2 className="premium-heading mb-4">
              Our Specialized <span className="text-blue-600">Departments</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              We provide comprehensive medical care across various specialties, ensuring personalized treatment protocols for every patient.
            </p>
          </div>
          
          <Link 
            to={"/department"} 
            className="group inline-flex items-center gap-3 py-3 px-6 bg-slate-50 text-blue-600 font-bold text-sm rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm border border-slate-100"
          >
            See All Specialties <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {department.slice(0, 8).map((item, index) => (
            <Link 
              key={index}
              to={"/departmentDoctor"} 
              state={{ categoryId: item._id }}
              className={`group relative p-10 rounded-[2rem] border border-slate-100 bg-white hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 animate-slide-up overflow-hidden delay-${(index + 1) * 100}`}
            >
              {/* Subtle Bg Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-100/50 transition-colors"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 text-blue-600 flex items-center justify-center mb-8 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  {getDepartmentIcon(item.categoryName)}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.categoryName}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                  State-of-the-art medical attention with global healthcare protocols.
                </p>
                
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest group-hover:gap-3 transition-all">
                  Consult Now <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DepartmentBanner;