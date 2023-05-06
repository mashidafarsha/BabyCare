import React, { useEffect, useState } from "react";
import axios from "../../axios/adminAxios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import RejectedReason from "./RejectedReason";
import { getRegisterDoctor,acceptDoctor } from "../../sevices/adminApi";

function DoctorApprovel() {
  const [docDetail,setDocDetail]=useState('')
  const [doctor, setDoctor] = useState([]);
    useEffect(() => {
      getDoctorDetails();
    }, []);

 

  const getDoctorDetails =async () => {
    try{
      let {data}=await getRegisterDoctor()
      console.log(data);
      if(data.success){
        setDoctor(data.doctors);
      }
     
    }catch{
      
    }
    
  };

  const acceptHandler = (id) => {
    try{
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to accept this doctor?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async(willdelete) => {
        if (willdelete) {
          let {data}=await acceptDoctor(id)
          console.log(data);
          
        }else{
          Swal.fire("The item was not deleted.");
        }
      });
    }catch{
      
    }
   
  };



  

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Doctor Name</th>
              <th>Email</th>
              <th>Qualification</th>
          
              <th>Document</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {doctor &&
              doctor.map((doc, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{doc.name}</td>
                    <td>{doc.email}</td>
                    <td>{doc.qualification}</td>
                  

                    <td>
                      <Link to={`http://localhost:4000/${doc.document}`}>
                        link
                      </Link>
                    </td>
                    <div>
                      <td>
                        <button
                          onClick={() => acceptHandler(doc._id)}
                          className="btn btn-success"
                        >
                          ACCEPTED
                        </button>
                      </td>
                      <td>
                       
                        <label htmlFor="reject_modal" className="btn" onClick={()=>setDocDetail(doc)}>REJECTED</label>
                        
                      </td>
                    </div>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <RejectedReason docDetail={docDetail}/>
    </div>
  );
}

export default DoctorApprovel;
