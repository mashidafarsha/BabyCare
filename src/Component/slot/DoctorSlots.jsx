import React, { useEffect } from "react";
import { useState } from "react";

import moment from "moment";
import { doctorSelectSlot,displayScheduledTime } from "../../sevices/doctorApi";
import Swal from "sweetalert";
function DoctorSlots() {
  const [load, setLoad] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  const [bookedSlots,setBookedSlots]=useState([])
  const today = moment().startOf("day");
  const dates = [];

  useEffect(() => {
  

    getScheduledTimes()
  }, [load])
  const handleLoad = () => {
    setLoad(!load);
  };
  
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

  const getScheduledTimes=async()=>{
    let {data}=await  displayScheduledTime()
    if(data.success){
      setBookedSlots(data.slots)
    
    }
   
  }
 




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
        handleLoad()
      }else{
        Swal("Not Added your Slot");
      }
    }
  }


  return (
    <div className="h-screen bg-emerald-100">
      <div className="flex items-start justify-center ">
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
      <div className="w-full text-center">
      {selectedDate && (
           <h1 className="text-lg font-bold mt-7">Choose multiple slots on {selectedDate.format("MMMM Do YYYY, dddd")}</h1> 
      )}
           </div>
      
      {selectedDate && (
        
        <div className="flex items-start justify-center ">
          
          <div className="w-7/12 m-16 ">
            {getTimeSlot().map(({startTime,endTime}) => {
              return (
              
                <button
                  onClick={() => handleTimeSelect(startTime.format("MMMM Do YYYY, h:mm:ss a"))}
                 
                  className={`${
                    selectedTime.includes(
                      startTime.format("MMMM Do YYYY, h:mm:ss a")
                    )
                      ? " bg-blue-500 text-black "
                      : " bg-teal-500"
                  }${
                    bookedSlots.includes(
                      startTime.format("MMMM Do YYYY, h:mm:ss a")
                    )
                      ? " bg-indigo-900 text-white rounded focus:outline-none opacity-100 cursor-not-allowed"
                      : " bg-teal-500"
                  } btn border-none w-44  bg-teal-500 m-5 `}
                  disabled={bookedSlots.includes(startTime.format("MMMM Do YYYY, h:mm:ss a"))}
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
