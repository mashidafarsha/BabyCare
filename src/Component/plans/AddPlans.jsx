import React, { useState } from 'react'
import Swal from 'sweetalert'
import { addOurPlan } from '../../sevices/adminApi'
function AddPlans() {
const [planname,setPlanname]=useState("")
const [description,setDescription]=useState("")
const [amount,setAmount]=useState("")
const [offerAmount,setOffferAmount]=useState("")
const [image,setImage]=useState("")
 const[message,setMessage]=useState("")  

const handleFileChange = (event) => {
   
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    const allowedTypes = ["image/jpeg", "image/png"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setImage(selectedFile);
      setMessage(null);
    } else {
      setImage(null);
      setMessage("Please select a JPEG or PNG image.");
    }
  };

const handleSubmit=async(e)=>{
    e.preventDefault()

        const formData = new FormData();
        formData.append("image", image);
        formData.append("planname", planname);
        formData.append("description", description);
        formData.append("amount", amount);
        formData.append("offerAmount", offerAmount);
        
        try{
            if (planname === "" || description === ""||amount===""||image==="") {
                Swal("Please enter all details");
            }else{
                let {data}=await addOurPlan(formData)
            }
        }catch{
            
        }
      
  
}
  return (
    <div>
    <input type="checkbox" id="add-plan" className="modal-toggle" />
    <label htmlFor="add-plan" className="cursor-pointer modal">
      <label className="relative modal-box" htmlFor="">
        <div className="h-64 w-96">
          <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="card-body">
                <div className="avatar">
                  <div className="w-24 rounded-xl">
                    <img src=''
                    
                    />
                  </div>
                </div>
                <input
                  type="file"
                  className="w-full max-w-xs file-input file-input-bordered file-input-success"
                  onChange={handleFileChange}
                />
               {message && <p>{message}</p>}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Plan Name</span>
                  </label>
                  <input
                    type="text"
                    id="Name"
                    placeholder="Plan Name"
                    className="input input-bordered"
                    onChange={(e)=>setPlanname(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Description"
                    className="input input-bordered"
                    onChange={(e)=>setDescription(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Amount</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="input input-bordered"
                    onChange={(e)=>setAmount(e.target.value)}
                  />
                </div>
               
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Offer Amount</span>
                  </label>
                  <input
                    type="text"
                    placeholder="OfferAmount"
                    className="input input-bordered"
                    onChange={(e)=>setOffferAmount(e.target.value)}
                  />
                </div>

                <div className="mt-6 form-control modal-action">
                  <button
                    type="submit"
                    className="btn btn-outline btn-secondary"
                    htmlFor="add-plan"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </label>
    </label>
  </div>
  )
}

export default AddPlans