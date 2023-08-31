import React, { useEffect, useState } from "react";
import { getDepartmentData } from "../../sevices/userApi";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../constants/constants";
function DepartmentBanner() {
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    getAllDepartment();
  }, []);
  console.log(department, "ooooooooo");
  const getAllDepartment = async () => {
    try {
      let { data } = await getDepartmentData();
      console.log(data, "llll");
      if (data.success) {
        setDepartment(data.departmentData);
      }
    } catch {}
  };
  return (
    <>
      <div className="flex items-start justify-center mx-auto overflow-hidden  ">
        <div className="flex items-start justify-between w-8/12">
          <div>
            <h1 className="text-4xl font-extrabold text-black-800 mt-4">
              10+ Specialities
            </h1>
            <h1 className="font-bold">
              Consult with top doctors across specialities
            </h1>
          </div>
          <div>
            <button class=" bg-blue-500 hover:bg-blue-400 text-white font-bold mt-4 py-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              <Link to={"/department"}> See All Specialities </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center w-10/12 mx-auto overflow-hidden border border-stone-400 mt-7">
        <div className="w-screen p-4 space-x-4 shadow-2xl carousel carousel-center bg-slate-200 rounded-box">
          {department.map((department, index) => {
            return (
              <div className="w-40 shadow-xl sm:w-44 card bg-base-100">
                <figure className="h-32 ml-3 w-32 border-4 border-blue-300 rounded-full overflow-hidden">
                  <img
                    src={
                      department.image ? `${BaseUrl}/${department.image}` : ""
                    }
                    className="h-32 w-32 rounded-full"
                    alt=""
                  />
                </figure>
                <div className="h-20 mb-5 card-body">
                  <h2 className="text-sm font-bold uppercase card-title">
                    {department.categoryName}
                  </h2>
                </div>
                <div className="justify-center mb-7 card-actions">
                  <button className="font-bold text-blue-800">
                    {" "}
                    <Link to={"/department"}>Consult Now</Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DepartmentBanner;
