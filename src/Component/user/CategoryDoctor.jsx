import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryDoctors } from "../../sevices/userApi";
import { setDoctorData } from "../../redux/features/doctorDetailsSlice";
import { Link } from "react-router-dom";
function CategoryDoctor() {
  const [doctros, setDoctors] = useState([]);
  const [departmentNames, setDepartmentName] = useState("");
  let { department } = useSelector((state) => state.department);

  const dispatch = useDispatch();
  useEffect(() => {
    setDepartmentName(department.categoryName);
    if (departmentNames.length>0) {

      getCategoryDoctors();
    }
  }, [departmentNames]);
 

  const getCategoryDoctors = async () => {
  
    let { data } = await categoryDoctors(departmentNames);
 
    if (data.success) {
      setDoctors(data.categoryDoctors);
    }
  };
  
 

  return (
    <div>
      <h1 className="text-xl font-bold">SPECIALITIES</h1>
      <div className="w-9/12 h-auto">
        {doctros.map((doctor, index) => {
          return (
            <div className="float-left shadow-xl m-7 card bg-base-100 w-52 ">
              <figure className="px-10 pt-10">
                <img
                  src={
                    doctor.image ? `http://localhost:4000/${doctor.image}` : ""
                  }
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="items-center mb-5 text-center card-body h-28">
                <h2 className="card-title">Dr.{doctor.name}</h2>
                <p>{doctor.department}</p>
                <p>{doctor.experience}</p>
                <p>{doctor.consultationFee}</p>
              </div>
              <div className="justify-center card-actions">
                <button
               
                  // onClick={()=>getDoctorData(doctor._id)}
                  className="font-bold text-blue-800"
                >
                  {" "}
                  <Link to={`/doctorDetails?id=${doctor._id}`}> Consult Now</Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryDoctor;
