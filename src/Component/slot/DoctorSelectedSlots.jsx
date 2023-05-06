import React, { useEffect, useState } from "react";
import { scheduledDoctorSlot } from "../../sevices/doctorApi";
import moment from "moment";
function DoctorSelectedSlots() {
  const today = moment().startOf("day");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  const [slots, setSlots] = useState([]);
  const [slo, setSlo] = useState([]);

  useEffect(() => {
    getSheduledSlot();
  }, []);

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


  const getSheduledSlot = async () => {
    let { data } = await scheduledDoctorSlot();
    
    setSlots(data.slots);
   
  };
  return (
    <div className=" h-screen bg-emerald-100 ">
      <div className="flex items-start justify-center  ">
        <div className="mt-5 w-8/12 p-4 shadow-xl max-w- carousel carousel-center bg-[#7493a863] rounded-box bg-[#7493a863] rounded-box bg-gradient-to-r from-teal-400">
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
                slots.includes(startTime.format("MMMM Do YYYY, h:mm:ss a")) && (
                  <button className="m-5 btn btn-success">
                    <b className="p-3">{`${startTime.format(
                      "hh:mm A"
                    )} - ${endTime.format("hh:mm A")}`}</b>
                  </button>
                )
              )
            })}
          </div>
        </div>
      )}

      
    </div>
  );
}

export default DoctorSelectedSlots;
