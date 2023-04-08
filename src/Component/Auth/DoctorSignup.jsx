import React from 'react'
import { useState } from 'react'

import axios from "axios";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function DoctorSignup() {
    const [values, setValues] = useState({
        name:"",
        email: "",
        phone:"",
        password: "",
      });

      const navigate=useNavigate()

      const generateError = (err) => {
        Swal(err);
      };

      const generateSuccess = (err) => {
        Swal(err);
      };

      const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            console.log(values);    
            let {data}=await axios.post(
                "http://localhost:4000/doctor/doctorSignup",
                { ...values }
              );
              console.log(data,"oooo");
              if(data.otpSend){
                
                generateSuccess(data.message)
                navigate('/Doctorotp')   
              }else{
                generateError(data.error)
              }

        }catch{

        }
       
      }
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-blue-300 overflow-hidden'>
            <div className='flex md:flex-row flex-col h-  '>
                <div className='w-auto '>
                    <img className='w-80 h-96' src="https://i.pinimg.com/736x/9f/10/ed/9f10ed99b7a0f94dc59c4fb00d0873f3.jpg" alt="" />
                </div>
                <div className='w-80 h-96   bg-blue-400 '  >
                    <h1 className="mt-5 text-2xl font-semibold text-center text-gray-700">
                       BABY CARE DOCTOR
                    </h1>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="mb-2">
                            
                            <input
                            placeholder='Name'
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                onChange={(e)=>setValues({
                                    ...values,name:e.target.value
                                })}
                            />
                        </div>
                        <div className="mb-2">
                            
                            <input
                            placeholder='Phone'
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                onChange={(e)=>setValues
                                ({
                                    ...values,phone:e.target.value
                                })}
                            />
                        </div>
                        <div className="mb-2">
                           
                            <input
                            placeholder='Email'
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                onChange={(e)=>setValues
                                    ({
                                        ...values,email:e.target.value
                                    })}
                            />
                        </div>
                        <div className="mb-2">
                            
                            <input
                            placeholder='Password'
                                type="password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                onChange={(e)=>setValues
                                    ({
                                        ...values,password:e.target.value
                                    })}
                            />
                        </div>
                       
                        <div className="mt-6">
                            <button className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600">
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
  )
}

export default DoctorSignup