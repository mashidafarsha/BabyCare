import React, { useEffect, useState } from "react";
import { getDepartmentData } from "../../sevices/userApi";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../constants/constants";

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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Our Departments</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2">
              10+ Medical Specialities
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Consult with our world-class specialists for expert medical advice.
            </p>
          </div>
          <Link 
            to={"/department"} 
            className="inline-block bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-blue-200 text-center"
          >
            View All Specialities
          </Link>
        </div>

        {/* Categories Carousel/Grid */}
        <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar snap-x">
          {department.map((item, index) => (
            <div 
              key={index} 
              className="flex-none w-64 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 group snap-start"
            >
              <div className="flex flex-col items-center text-center">
                {/* Circular Image with animated border */}
                <div className="relative p-1 rounded-full border-2 border-dashed border-blue-200 group-hover:border-blue-500 transition-colors duration-500">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-slate-50">
                    <img
                      src={item.image ? `${BaseUrl}/${item.image}` : "https://via.placeholder.com/150"}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      alt={item.categoryName}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {item.categoryName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-tighter">Specialist Doctors</p>
                </div>

                <Link 
                  to={"/department"} 
                  className="mt-6 w-full py-2 bg-blue-50 text-blue-700 font-bold rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                >
                  Consult Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DepartmentBanner;