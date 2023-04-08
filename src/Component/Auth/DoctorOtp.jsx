import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { useState } from 'react'
import axios from 'axios'


function DoctorOtp() {
  const [otp, setOtp] = useState('')

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(otp,"otp");
    const {data}=await axios.post("http://localhost:4000/doctor/doctorOtp",{otp})
    console.log(data,"ppppp");
  }
  return (
    <div className='w-full h-screen bg-white flex items-center justify-center'>
      <div className='w-96 h-56 bg-cyan-400'>
        <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
          <div>
            <div className="mb-5 mt-5 block text-center ">
              <Label
                htmlFor="number"
                value="YOUR OTP"
              />
            </div>
            <TextInput
              id="otp"
              type="number"
              placeholder="please enter your otp"
              required={true}
              shadow={true}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>



          <Button type="submit">
            Submit Otp
          </Button>
        </form>
      </div>

    </div>
  )
}

export default DoctorOtp