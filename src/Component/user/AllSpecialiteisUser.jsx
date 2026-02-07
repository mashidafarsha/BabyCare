import React, { useState, useEffect } from "react";
import { getDepartmentData } from "../../sevices/userApi";
import { useDispatch } from "react-redux";
import { setCategoryDetails } from "../../redux/features/categorySlice";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../constants/constants";

function AllSpecialiteisUser() {
  const [department, setDepartment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllDepartment();
  }, []);

  const getAllDepartment = async () => {
    try {
      let { data } = await getDepartmentData();
      if (data.success) setDepartment(data.departmentData);
    } catch (error) { console.log(error); }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Top Specialities</h1>
        <div className="h-1.5 w-20 bg-blue-600 rounded-full mt-2"></div>
      </div>

      {/* Grid Layout - Responsive focus */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {department.map((dept, index) => (
          <div key={index} className="group bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-50 flex flex-col items-center">
            
            {/* Image Wrapper */}
            <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 p-1 border-2 border-dashed border-blue-200 group-hover:border-blue-500 transition-colors">
              <img
                src={dept.image ? `${BaseUrl}/${dept.image}` : "https://via.placeholder.com/150"}
                alt={dept.categoryName}
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="mt-6 text-center">
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                {dept.categoryName}
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-medium">Verified Specialists</p>
            </div>

            <div className="mt-6 w-full">
              <Link 
                to="/departmentDoctor"
                onClick={() => dispatch(setCategoryDetails({ department: dept }))}
                className="block text-center py-3 rounded-xl bg-blue-50 text-blue-700 font-bold hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Consult Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllSpecialiteisUser;