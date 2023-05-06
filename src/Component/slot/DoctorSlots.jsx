import React, { useEffect } from "react";
import { useState } from "react";

import moment from "moment";
import { doctorSelectSlot } from "../../sevices/doctorApi";
import Swal from "sweetalert";
function DoctorSlots() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  const today = moment().startOf("day");
  const dates = [];
  let times = [];
  
  for (let i = 1; i < 11; i++) {
    let date = today.clone().add(i, "days");
    dates.push(date);
  }
 

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (startTime) => {
    if (selectedTime.includes(startTime)) {
      setSelectedTime(selectedTime.filter((val) => val !== startTime));
    } else {
      setSelectedTime([...selectedTime, startTime])
    }
   
 
  };
  console.log(selectedTime,"selected");
 




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

  const handleSubmit=async()=>{

    if(selectedTime.length!=0){
      let { data } = await doctorSelectSlot(selectedTime);
      if(data.success){
        Swal("Successfully Added your Slot");
      }else{
        Swal("Not Added your Slot");
      }
    }
  }


  return (
    <div className=" h-screen bg-emerald-100 ">
      <div className="flex items-start justify-center  ">
        <div className="mt-5 w-8/12 p-4 shadow-xl max-w- carousel carousel-center bg-[#7493a863] rounded-box bg-gradient-to-r from-teal-400">
          {dates?.map((date, index) => {
            return (
              <div>
                <button
                  onClick={() => handleSelectDate(date)}
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
            {getTimeSlot().map(({startTime,endTime}) => {
              return (
                <button
                  onClick={() => handleTimeSelect(startTime.format("MMMM Do YYYY, h:mm:ss a"))}
                  className="m-5 btn bg-teal-500"
                >{`${startTime.format("LT")} - ${endTime.format(
                  "LT"
                )}`}</button>
              );
            })}
          </div>

         
        </div>
      )}

      
    
       {(selectedTime.length!=0) && 
       (
          <div className="flex justify-center">
      
          <button onClick={handleSubmit} className="m-5 btn btn-primary">
            Update
          </button>
        </div>
       )
       
          
          }
    </div>
  );
}

export default DoctorSlots;
