import React, { useEffect, useState } from "react";
import { userBookingData, cancelUserSlot } from "../../sevices/userApi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function AppointmentDetails() {
  const [bookingDatas, setBookingDatas] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    getBookingDetails();
  }, [load]);
  const handleLoad = () => {
    setLoad(!load);
  };
  const getBookingDetails = async () => {
    let { data } = await userBookingData();
    if (data.success) {
      setBookingDatas(data.bookingData);
    }
  };

  const cancelBooking = async (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let { data } = await cancelUserSlot(bookingId);
        if (data.success) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          handleLoad()
        }
      }
    });
  };
  console.log(bookingDatas, "ggg");
  return (
    <div className="flex items-start justify-center max-w-screen-xl bg-slate-200 ">
      <div className="w-11/12 h-full my-10 bg-white shadow-2xl rounded-3xl">
        {bookingDatas &&
          bookingDatas.map((bookingData, index) => {
            return (
              <div className="h-auto shadow-2xl ">
                <div className="h-8 ml-5 font-semibold ">
                  <div>
                    <h1 className="float-left ">{bookingData.status}</h1>
                    <h1 className="float-right mr-8">
                      {bookingData.bookingTime}
                    </h1>
                  </div>
                </div>
                <div className="ml-5">
                  <div>
                    <h1 className="text-xl font-semibold text-blue-700">
                      Hospital Consultation
                    </h1>
                    <h1 className="mt-3 text-xl font-bold">
                     Dr. {bookingData.DoctorName}
                    </h1>
                    <h1 className="font-medium">
                      {bookingData.DoctorDepartment}
                    </h1>
                  </div>
                </div>
                <div className="mt-5 ml-5 h-max mb-7">
                  <div className="flex justify-between text-lg font-semibold ">
                    <div className="flex">
                      <h1 className="font-light text-blue-700 ">
                        PatientName :
                      </h1>
                      <h1 className="ml-3 ">MashidaFarsha</h1>
                    </div>
                    {bookingData.status=="Cancel"? <button
                     
                      className="mb-2 mr-2 btn btn-success"
                    ><Link to={'/department'}>Book Again</Link>
                      
                    </button>:<button
                      onClick={() => cancelBooking(bookingData._id)}
                      className="mb-2 mr-2 btn btn-error "
                    >
                      cancel booking
                    </button>}
                    
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AppointmentDetails;
