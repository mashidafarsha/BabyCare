import React from 'react'
import { sendOtp } from '../../sevices/doctorApi';
import { useState } from 'react'
import axios from '../../axios/doctorAxios'
import Swal from "sweetalert";
import { useNavigate } from 'react-router-dom';



function DoctorOtp() {
  
  const [otp, setOtp] = useState('')
 const navigate=useNavigate()
  const generateError = (err) => {
    Swal(err);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(otp,"otp");
    const {data}=await sendOtp(otp)
   console.log(data,"nnnnnnnn");
    if(data.created){
     
      navigate('/doctor/info')
    }else{
      generateError(data.message)
    }
  }
  return (
    <>
      <input type="checkbox" id="sent_otp" className="modal-toggle" />
      <label htmlFor="sent_otp" className="cursor-pointer modal">
        <label className="relative modal-box bg-gradient-to-r from-pink-50 to-indigo-600" htmlFor="sent_otp">
          <div className="h-64 w-96 ">
            <h1 className="mb-10 font-bold">Enter Your OTP</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
              <div className=''>
                <div className="block mb-2">
                  <label htmlFor="category">OTP</label>
                </div>
                <input
                   className="input input-bordered"
                  id="otp"
                            type="number"
                            placeholder="please enter your otp"
                            required={true}
                            shadow={true}
                            onChange={(e) => setOtp(e.target.value)}
                 
                />
              </div>
             
              <div className="modal-action">
                <button
                  className="btn btn-outline bg-gradient-to-r from-violet-900 to-indigo-600 text-white"
                  htmlFor="sent_otp"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </label>
      </label>
    </>




    




    
    // <div className='flex items-center justify-center w-full h-screen bg-white'>
    //   <div className='h-56 w-96 bg-cyan-400'>
    //     <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
    //       <div>
    //         <div className="block mt-5 mb-5 text-center ">
    //           <Label
    //             htmlFor="number"
    //             value="YOUR OTP"
    //           />
    //         </div>
    //         <TextInput
    //           id="otp"
    //           type="number"
    //           placeholder="please enter your otp"
    //           required={true}
    //           shadow={true}
    //           onChange={(e) => setOtp(e.target.value)}
    //         />
    //       </div>



    //       <Button type="submit">
    //         Submit Otp
    //       </Button>
          
         
    //     </form>
    //   </div>

    // </div>
  )
}

export default DoctorOtp