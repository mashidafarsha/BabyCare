import React from 'react'
import { useState,useEffect } from 'react';
import { getApprovedDoctor,deleteDoctor} from '../../sevices/adminApi';
import Swal from 'sweetalert2';
function AllDoctors() {
    const [docDetail,setDocDetail]=useState('')
    const [doctor, setDoctor] = useState([]);

    useEffect(() => {
        getAllDoctor();
      }, []);
    const getAllDoctor =async () => {
        try{
          let {data}=await getApprovedDoctor()
          console.log(data);
          if(data.success){
            setDoctor(data.doctors);
          }
        
        }catch{
          
        }
        
      }
      const blockDoctor=(doctorId)=>{
        console.log("kkk");
        try {
          Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to Block this department?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then(async(willdelete) => {
            if (willdelete) {
    
              let{data}=await deleteDoctor(doctorId) 
              console.log(data)
              if (data.success) {
                getAllDoctor();
                  } else {
                    Swal.fire("The doctor  not deleted.");
                  }
             
            } else {
              Swal.fire("The doctor not deleted.");
            }
          });
        } catch {}
      }
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
              <th>consultation fee</th>
             
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
                    <td>{doc.consultationFee}</td>

                 
                    <div>
                     
                      <td>
                       
                       
                        <button onClick={()=>blockDoctor(doc._id)} className="btn btn-error">Block</button>
                      </td>
                    </div>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllDoctors