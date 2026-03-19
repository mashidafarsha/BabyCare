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
        
        {/* Simple Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Specialized Departments
            </h2>
            <p className="text-slate-500 text-lg">
              We provide comprehensive medical care across various specialties, ensuring personalized treatment for every patient.
            </p>
          </div>
          
          <Link 
            to={"/department"} 
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all"
          >
            See All Specialties <ArrowRight size={20} />
          </Link>
        </div>

        {/* Clean Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {department.slice(0, 8).map((item, index) => (
            <Link 
              key={index}
              to={"/departmentDoctor"} 
              state={{ categoryId: item._id }}
              className={`group bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 animate-slide-up delay-${(index + 1) * 100}`}
            >
              <div className="w-12 h-12 rounded-xl bg-white text-blue-600 flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {getDepartmentIcon(item.categoryName)}
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                {item.categoryName}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                Global healthcare protocols and specialized medical attention.
              </p>
              
              <div className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DepartmentBanner;