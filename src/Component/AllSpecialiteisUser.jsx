import React from "react";
import { useState, useEffect } from "react";
import { getDepartmentData } from "../sevices/userApi";
function AllSpecialiteisUser() {
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    getAllDepartment();
  }, []);
  console.log(department, "ooooooooo");
  const getAllDepartment = async () => {
    try {
      let { data } = await getDepartmentData();
      console.log(data, "eeeee");
      if (data.success) {
        setDepartment(data.departmentData);
      }
    } catch {}
  };

  return (
    <div>
      <h1 className="text-xl font-bold">TOP SPECIALITIES</h1>
      <div className="grid w-9/12 grid-cols-3 gap-6 bg-slate-500 h-6/6">
        {department.map((department, index) => {
          return (
            <div className="shadow-xl m-7 card bg-base-100">
              <figure className="px-10 pt-10">
                <img
                  src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="items-center text-center card-body">
                <h2 className="card-title">{department.categoryName}</h2>

                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllSpecialiteisUser;
