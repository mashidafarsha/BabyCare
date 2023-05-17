import React, { useEffect, useState } from "react";
import { getDoctorsData } from "../../sevices/userApi";
import { setDoctorData } from "../../redux/features/doctorDetailsSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function SubBanner() {
  const [doctorImage, setDoctorImage] = useState([]);
  const dispatch=useDispatch()
  useEffect(() => {
    getAllDoctors();
  }, []);

  const getAllDoctors = async () => {
    try {
      let { data } = await getDoctorsData();
      console.log(data, "llll");
      if (data.success) {
        setDoctorImage(data.doctorData);
      }
    } catch {}
  };
  return (
    <>
      <div className="flex items-start justify-center mx-auto overflow-hidden">
        <div className="flex items-start justify-between w-8/12">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-800 ">
              OUR DOCTORS
            </h1>
            <h1 className="font-bold">
              Consult with top doctors across specialities
            </h1>
          </div>
          <div>
            <button class=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              See All Doctors
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center mx-auto overflow-hidden">
        <div className="w-screen p-4 space-x-4 shadow-2xl carousel carousel-center bg-slate-200 rounded-box">
          {doctorImage.map((doctor, index) => {
            return (
              <div className="w-56 shadow-xl card bg-base-100">
                <figure className="h-40">
                  <img
                    src={
                      doctor.image
                        ? `http://localhost:4000/${doctor.image}`
                        : ""
                    }
                    className="w-full"
                  />
                </figure>
                <div className="mb-5 h-28 card-body">
                  <h2 className="uppercase card-title">Dr.{doctor.name}</h2>
                  <p className="">{doctor.department}</p>
                  <p>{doctor.experience}</p>
                  <p>Rs. {doctor.consultationFee}</p>
                  </div>
                  <div className="justify-center card-actions">
                  <button
                  onClick={() =>
                    dispatch(setDoctorData({ doctorData: doctor }))
                  }
                  className="font-bold text-blue-800"
                >
                  {" "}
                  <Link to="/doctorDetails">View</Link>
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

export default SubBanner;
