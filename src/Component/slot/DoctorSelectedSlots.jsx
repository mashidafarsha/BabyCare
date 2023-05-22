import React, { useEffect, useState } from "react";
import {
  scheduledDoctorSlot,
  cancelDoctorSchedule,
  getUserBookedSlot,
} from "../../sevices/doctorApi";
import Swal from "sweetalert2";
import moment from "moment";
function DoctorSelectedSlots() {
  const [load, setLoad] = useState(false);
  const today = moment().startOf("day");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  const [slots, setSlots] = useState([]);
  const [bookedSlot, setBookedSlot] = useState([]);

  useEffect(() => {
    getSheduledSlot();
    getBookedSlot();
  }, [load]);

  const handleLoad = () => {
    setLoad(!load);
  };

  const dates = [];
  for (let i = 1; i < 11; i++) {
    let date = today.clone().add(i, "days");
    dates.push(date);
  }

  const handleDateSelect = (date) => {
    setSelectedTime(null);
    setSelectedDate(date);
  };

  const getTimeSlot = () => {
    let timeSlots = [];
    if (selectedDate) {
      for (let i = 10; i <= 17; i++) {
        const startTime = moment(selectedDate).hour(i).minute(0);
        const endTime = moment(selectedDate)
          .hour(i + 1)
          .minute(0);
        timeSlots.push({ startTime, endTime });
      }
      return timeSlots;
    }
  };

  const getBookedSlot = async () => {
    let { data } = await getUserBookedSlot();
    if (data.success) {
      setBookedSlot(data.bookedSlots);
    }
  };

  const cancelSchedule = async (startTime) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete the time slot",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let { data } = await cancelDoctorSchedule(startTime);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        handleLoad();
      }
    });
  };

  const getSheduledSlot = async () => {
    let { data } = await scheduledDoctorSlot();

    setSlots(data.slots);
  };
  return (
    <div className="h-screen bg-emerald-100">
      <div className="flex items-start justify-center ">
        <div className="mt-5 w-8/12 p-4 shadow-xl max-w- carousel carousel-center  bg-[#7493a863] rounded-box bg-gradient-to-r from-teal-400">
          {dates?.map((date, index) => {
            return (
              <div>
                <button
                  onClick={() => handleDateSelect(date)}
                  className="m-6 bg-black border-none btn"
                >
                  {date.format("dddd")}
                </button>
                <h4 className="p-1 text-sm font-semibold text-center">
                  {date.format("MMM Do YY")}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-start justify-center mt-4">
        <div className="avatar placeholder">
          <h1 className="font-bold">Booked</h1>
          <div className="w-8 ml-3 bg-blue-700 rounded-full text-neutral-content">
            <span className="text-xs"></span>
          </div>
        </div>
      </div>
      <div className="w-full text-center">
      {selectedDate && (
           <h1 className="text-lg font-bold mt-7">{selectedDate.format("MMMM Do YYYY, dddd")}</h1> 
      )}
           </div>

      {selectedDate && (
        <div className="flex items-start justify-center ">
          <div className="w-7/12 m-16 ">
            {getTimeSlot().map(({ startTime, endTime }) => {
              return (
                slots.includes(startTime.format("MMMM Do YYYY, h:mm:ss a")) && (
                  <button
                    onClick={() =>
                      cancelSchedule(
                        startTime.format("MMMM Do YYYY, h:mm:ss a")
                      )
                    }
                    className={`${
                      bookedSlot.some(
                        (slot) =>
                          slot.bookingTime ===
                          startTime.format("MMMM Do YYYY, h:mm:ss a")
                      )
                        ? "bg-blue-700 text-white"
                        : "btn-success"
                    } m-5 btn`}
                  >
                    <b className="p-3">{`${startTime.format(
                      "hh:mm A"
                    )} - ${endTime.format("hh:mm A")}`}</b>
                  </button>
                )
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorSelectedSlots;
