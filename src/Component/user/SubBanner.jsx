import React, { useEffect, useState } from "react";
import { getDoctorsData } from "../../sevices/userApi";
function SubBanner() {
  const [doctorImage, setDoctorImage] = useState([]);
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
            <button class=" bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded">
              See All Doctors
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center mx-auto overflow-hidden">
        <div className="max-w-md p-4 space-x-4 shadow-2xl carousel carousel-center bg-slate-200 rounded-box">
          {doctorImage.map((doctor, index) => {
            return (
              <div className="shadow-xl card w-96 bg-base-100">
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
                <div className="h-40 card-body">
                  <h2 className="card-title">{doctor.name}</h2>
                  <p>{doctor.department}</p>
                  <div className="justify-end card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
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
