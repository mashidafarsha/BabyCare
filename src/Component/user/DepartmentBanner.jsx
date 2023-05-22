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
      <div className="flex items-start justify-center mx-auto overflow-hidden ">
        <div className="flex items-start justify-between w-8/12">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-800 ">
              10+ Specialities
            </h1>
            <h1 className="font-bold">
              Consult with top doctors across specialities
            </h1>
          </div>
          <div>
            <button class=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
             <Link to={"/department"}>  See All Specialities </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center w-10/12 mx-auto overflow-hidden border border-stone-400">
        <div className="w-screen p-4 space-x-4 shadow-2xl carousel carousel-center bg-slate-200 rounded-box">
          {department.map((department, index) => {
            return (
              <div className="shadow-xl w-60 card bg-base-100">
                <figure className="h-40">
                  <img  src={
                      department.image
                        ? `${BaseUrl}/${department.image}`
                        : ""
                    } className="w-full h-32 rounded-full " />
                </figure>
                <div className="h-20 mb-5 card-body">
                  <h2 className="card-title">{department.categoryName}</h2>
                </div>
                <div className="justify-center mb-7 card-actions">
                 
                  <button className="font-bold text-blue-800"> <Link to={'/department'}>Consult Now</Link></button>
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
