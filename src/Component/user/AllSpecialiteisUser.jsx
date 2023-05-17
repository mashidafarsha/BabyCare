import React from "react";
import { useState, useEffect } from "react";
import { getDepartmentData } from "../../sevices/userApi";
import { useDispatch } from "react-redux";
import { setCategoryDetails } from "../../redux/features/categorySlice";
import { Link } from "react-router-dom";
import CategoryDoctor from "./CategoryDoctor";
function AllSpecialiteisUser() {
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showCategoryDoctor, setShowCategoryDoctor] = useState(false);
  // const [show, setShow] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    getAllDepartment();
  }, []);

  const getAllDepartment = async () => {
    try {
      let { data } = await getDepartmentData();
      console.log(data, "eeeee");
      if (data.success) {
        setDepartment(data.departmentData);
      }
    } catch {}
  };

  // const handleConsultNowClick = (department) => {
  //   setSelectedDepartment(department);
  //   setShowCategoryDoctor(true);
  // };

  return (
    <div>
      <h1 className="text-xl font-bold">TOP SPECIALITIES</h1>
      <div className="w-9/12 h-auto">
        {department.map((department, index) => {
          return (
            <div className="float-left shadow-xl m-7 card bg-base-100 w-52 ">
              <figure className="px-10 pt-10">
                <img
                  src={
                    department.image
                      ? `http://localhost:4000/${department.image}`
                      : ""
                  }
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="items-center text-center card-body h-28">
                <h2 className="card-title">{department.categoryName}</h2>
              </div>
              <div className="justify-center mb-7 card-actions">
                <button
                  onClick={() =>
                    dispatch(setCategoryDetails({ department: department }))
                  }
                  // onClick={() => handleConsultNowClick(department)}
                  className="font-bold text-blue-800"
                >
                  <Link to="/departmentDoctor"> Consult Now</Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* {showCategoryDoctor && (
        <CategoryDoctor departmentName={selectedDepartment.categoryName} />
      )} */}
    </div>
  );
}

export default AllSpecialiteisUser;
