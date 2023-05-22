import React, { useEffect, useState } from "react";
import axios from "../../axios/adminAxios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import RejectedReason from "./RejectedReason";
import { getRegisterDoctor,acceptDoctor } from "../../sevices/adminApi";

function DoctorApprovel() {
  const [load, setLoad] = useState(false);
  const [docDetail,setDocDetail]=useState('')
  const [doctor, setDoctor] = useState([]);
    useEffect(() => {
      getDoctorDetails();
    }, [load]);

    const handleLoad = () => {
      setLoad(!load);
    };

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
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept it!'
      }).then(async(result) => {
       
        if (result.isConfirmed) {
          let {data}=await acceptDoctor(id)
          if(data.success){
            Swal.fire(
              'Accepted!',
              'The Doctor has been Accepted.',
              'success'
            )
            handleLoad()
          }
          
        }
      })

    }catch{
      Swal.fire(
        'not Accepted',
        'The Doctor has been not Accepted.',
        'fail'
      )
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
                        Certificate
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
