import React, { useEffect, useState } from "react";
import { getAllBookingData } from "../../sevices/adminApi";
function AllBookingschedules() {
    const [bookingData,setBookingData]=useState([])
    useEffect(() => {
        getAllBookingDetails()
    }, [])

    const getAllBookingDetails=async()=>{
     let {data}=await getAllBookingData()  
     if(data.success){
        setBookingData(data.bookingData)
     } 
    }
  return (
    
    <div>
        
        {bookingData&& bookingData.map((bookingData,index)=>{
            return(
                <div className="h-4/6">
        <div className="flex justify-center p-2 ">
          <div className="bg-[#fffffe] hover:shadow-xl flex flex-col justify-evenly md:flex-row hover:opacity-90  text-[#232946]  w-3/4 rounded-xl mt-5 p-5 h-fit text-center">
          
            <div className="flex flex-col justify-center uppercase md:w-8/12 md:items-start">
              <div className="mb-4 font-bold">
                <p className="text-center">Time: {bookingData.bookingTime}</p>
              </div>
              <div>
                {" "}
                <p className="text-start">Dr. {bookingData.DoctorName}</p>
              </div>
              <div>
                {" "}
                <p className="text-start">{bookingData.DoctorDepartment}</p>
              </div>
              <div>
                <p className="text-center">Rs:{bookingData.totalAmount}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center m-2 md:w-1/12">
            {bookingData.status=="Cancel"?  <span>
             
             <a className="p-2 text-[#fffffe] rounded-lg  uppercase font-bold mt-5 w-full bg-red-500 hover:text-white mx-auto">
             {bookingData.status}
             </a>{" "}
           </span>: <span>
             
             <a className=" p-2 text-[#fffffe] rounded-lg  uppercase font-bold mt-5 w-full bg-green-500 hover:text-white mx-auto">
             {bookingData.status}
             </a>{" "}
           </span>}
             
            </div>
          </div>
        </div>
      </div>
            )
        })}
      
    </div>
  );
}

export default AllBookingschedules;
