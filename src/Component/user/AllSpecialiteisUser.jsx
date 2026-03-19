import React, { useEffect, useState } from "react";
import { getDepartmentData } from "../../sevices/userApi";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../constants/constants";
import { ArrowRight, Stethoscope, Heart, Brain, Eye, Baby, Syringe, Microscope, ShieldCheck, Dna, Pill } from "lucide-react";

function AllSpecialiteisUser() {
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
    if (n.includes("cardio")) return <Heart size={32} />;
    if (n.includes("neuro")) return <Brain size={32} />;
    if (n.includes("pediatr") || n.includes("child")) return <Baby size={32} />;
    if (n.includes("eye") || n.includes("opthal")) return <Eye size={32} />;
    if (n.includes("surger")) return <Syringe size={32} />;
    if (n.includes("infect")) return <ShieldCheck size={32} />;
    if (n.includes("pathol")) return <Microscope size={32} />;
    if (n.includes("pharmaco")) return <Pill size={32} />;
    return <Dna size={32} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-32">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Simple Header */}
        <div className="mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Medical Specialities
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            Explore our wide range of specialized medical departments staffed by experienced professionals dedicated to your health and recovery.
          </p>
        </div>

        {/* Clean Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {department.map((item, index) => (
            <Link
              key={index}
              to={"/departmentDoctor"}
              state={{ categoryId: item._id }}
              className={`group bg-white p-10 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col items-center text-center animate-slide-up delay-${(index % 5 + 1) * 100}`}
            >
              <div className="w-20 h-20 rounded-2xl bg-slate-50 text-blue-600 flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {getDepartmentIcon(item.categoryName)}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
                {item.categoryName}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Specialized care with modern diagnostic protocols and expert attention.
              </p>

              <div className="mt-auto flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllSpecialiteisUser;