import React, { useEffect, useState } from "react";
import { getDoctorActiveBooking } from "../../sevices/doctorApi";
function BookingUserDetails() {
  const [bookedData, setBookeData] = useState([]);
  useEffect(() => {
    getActiveBookings();
  }, []);

  const getActiveBookings = async () => {
    let { data } = await getDoctorActiveBooking();
    if (data.success) {
      setBookeData(data.bookedSlots);
    }
  };
  return (
    <>
    <div className="flex items-start justify-center">
      <h1 className="text-2xl font-bold">Your Booked Slots</h1>
    </div>
    <div className="flex items-start justify-center h-screen max-w-screen-xl bg-slate-200 ">
      
      {bookedData &&
        bookedData.map((data, index) => {
          return (
            <div className="float-left text-blue-700 shadow-xl m-7 card bg-base-100 w-52">
              <div className="card-body">
                <h2 className="card-title">{data.bookingTime}</h2>
                <p className="font-bold">{data.UserId.name}</p>
              </div>
            </div>
          );
        })}
    </div>
    </>
  );
}

export default BookingUserDetails;
