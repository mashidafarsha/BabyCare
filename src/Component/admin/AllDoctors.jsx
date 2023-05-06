import React from 'react'
import { useState,useEffect } from 'react';
import { getApprovedDoctor } from '../../sevices/adminApi';
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
                       
                       
                        <button onClick={()=>setDocDetail(doc)} className="btn btn-error">Block</button>
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