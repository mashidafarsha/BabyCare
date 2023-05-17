import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { getApprovelreason } from "../../sevices/doctorApi";
import Spinner from "../spinner/Spinner";
function WaitingApprovel() {

  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");

 


  useEffect(() => {
    if(localStorage.getItem("doctorWaitingToken")){
      getReason();
    }else{
      navigate("/doctor")
    } 
    
  },[]);
 const navigate=useNavigate()
  const getReason = async () => {

    let {data} = await getApprovelreason()
   console.log(data);
   if(data.reasonData.status === "Active"){
    localStorage.removeItem('doctorWaitingToken');
    navigate('/doctor')
   }else{
    console.log("rejected");
    setReason(data.reasonData.rejectReason);
    setStatus(data.reasonData.status)
   }
   
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden bg-white">
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h1 className="card-title">PRO PLUS</h1>
          {reason ? null :<Spinner/> }
          
          <p>{reason} :try again after 1 hour</p>
          <div className="justify-end card-actions">
          
              <button className="btn">dd</button>
     
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingApprovel;
