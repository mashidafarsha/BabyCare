import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { categoryDoctors } from "../../sevices/userApi";
import { BaseUrl } from "../../constants/constants";
import { Link } from "react-router-dom";

function CategoryDoctor() {
  const [doctors, setDoctors] = useState([]);
  const { department } = useSelector((state) => state.department);

  useEffect(() => {
    if (department?.categoryName) {
      getCategoryDoctors(department.categoryName);
    }
  }, [department]);

  const getCategoryDoctors = async (deptName) => {
    try {
      let { data } = await categoryDoctors(deptName);
      if (data.success) {
        setDoctors(data.categoryDoctors);
      }
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Heading Section */}
      <div className="mb-10 text-center md:text-left animate-slide-up">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Specialists in {department?.categoryName || "Department"}
        </h1>
        <div className="h-1 w-20 bg-blue-600 mt-3 mx-auto md:mx-0 rounded-full"></div>
      </div>

      {/* Grid Layout: Responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {doctors.map((doctor, index) => (
          <div key={index} className={`bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group overflow-hidden animate-slide-up delay-${(index % 5 + 1) * 100}`}>
            
            {/* Doctor Image Section */}
            <div className="relative pt-8 flex justify-center">
              <div className="absolute top-0 w-full h-24 bg-blue-50 group-hover:bg-blue-100 transition-colors"></div>
              <div className="relative z-10 w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-md">
                <img
                  src={doctor.image ? `${BaseUrl}/${doctor.image}` : "https://via.placeholder.com/150"}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                Dr. {doctor.name}
              </h2>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mt-1">
                {doctor.department}
              </p>
              
              {/* Doctor Stats Tags */}
              <div className="flex justify-center gap-2 mt-4">
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full">
                  {doctor.experience} Exp
                </span>
                <span className="bg-green-50 text-green-600 text-[10px] font-bold px-3 py-1 rounded-full">
                  Fee: ₹{doctor.consultationFee}
                </span>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <Link 
                  to={`/doctorDetails?id=${doctor._id}`}
                  className="block w-full py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-slate-900 transition-all duration-300 transform active:scale-95"
                >
                  Consult Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {doctors.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium italic">No doctors found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default CategoryDoctor;