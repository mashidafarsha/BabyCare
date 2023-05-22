import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import moment from "moment";
import SlotBookingAddress from "./SlotBookingAddress";
import {
  getUserBookedSlot,
  getSelectedDoctorDetails,
} from "../../sevices/userApi";
function UserSlots() {
  const today = moment().startOf("day");
  const [userSelectTime, setUserSelectTime] = useState("");
  const [doctorSlot, setDoctorSlot] = useState([]);
  // const [doctorId, setDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const [show, setShow] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  const [doctorData, setDoctorData] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get("id");
  useEffect(() => {
    getDoctorData()
   
    getBookedSlot()
  }, []);
  console.log(doctorSlot, "uuuuuuuuuuuu");

  const getDoctorData = async () => {
    try {
      let { data } = await getSelectedDoctorDetails(doctorId);

      if (data.success) {
        setDoctorData(data.doctor);
        setDoctorSlot(data.doctor?.slots);
      }
    } catch {}
  };

  const dates = [];
  for (let i = 1; i < 11; i++) {
    let date = today.clone().add(i, "days");
    dates.push(date);
  }

  const handleDateSelect = (date) => {
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

  const userSelectTimeHandler = (startTime) => {
    if (userSelectTime.includes(startTime)) {
      setUserSelectTime("");
    } else {
      setUserSelectTime(startTime);
    }
  };

  const getBookedSlot = async () => {
    let { data } = await getUserBookedSlot(doctorId);
    console.log(data, "booked Slots");
    if (data.success) {
      setBookedSlots(data.bookingTimes);
    }
  };

  return (
    <>
      <div className={!show ? "block h-screen bg-emerald-100" : "hidden"}>
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

        {selectedDate && (
          <div className="flex items-start justify-center ">
            <div className="w-7/12 m-16 ">
              {getTimeSlot().map(({ startTime, endTime }) => {
                return (
                  doctorSlot?.includes(
                    startTime.format("MMMM Do YYYY, h:mm:ss a")
                  ) && (
                    <button
                      onClick={() =>
                        userSelectTimeHandler(
                          startTime.format("MMMM Do YYYY, h:mm:ss a")
                        )
                      }
                      className={`${
                        userSelectTime.includes(
                          startTime.format("MMMM Do YYYY, h:mm:ss a")
                        )
                          ? "  text-white "
                          : " bg-slate-400  text-black"
                      }
                    ${
                      bookedSlots.includes(
                        startTime.format("MMMM Do YYYY, h:mm:ss a")
                      )
                        ? " bg-indigo-900 text-white rounded focus:outline-none opacity-100 cursor-not-allowed"
                        : " bg-slate-400  text-black"
                    }
                    
                     btn bg-slate-400 text-black border-none m-5`}
                      disabled={bookedSlots.includes(
                        startTime.format("MMMM Do YYYY, h:mm:ss a")
                      )}
                    >
                      <b className="p-3 ">{`${startTime.format(
                        "hh:mm A"
                      )} - ${endTime.format("hh:mm A")}`}</b>
                    </button>
                  )
                );
              })}
            </div>
          </div>
        )}

        {userSelectTime.length != 0 && (
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={() => setShow(true)}
              className="m-5 btn btn-primary"
            >
              Update
            </button>
          </div>
        )}
      </div>
      <div className={show ? "block" : "hidden"}>
        <SlotBookingAddress
          doctorData={doctorData}
          userSelectTime={userSelectTime}
        />
      </div>
    </>
  );
}

export default UserSlots;
