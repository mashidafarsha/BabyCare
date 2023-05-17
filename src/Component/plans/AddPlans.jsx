import React, { useState } from 'react'
import Swal from 'sweetalert'
import { addOurPlan } from '../../sevices/adminApi'
function AddPlans({handleLoad}) {
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

  
  const generateError = (err) => {
    Swal(err);
  };
  
  const generateSuccess = (err) => {
    Swal(err);
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
                console.log(data);
                if (data.success) {
                  generateSuccess(data.message);
                  setPlanname("")
                  setDescription("")
                  setAmount("")
                  setOffferAmount("")
                  setImage('')
                  document.getElementById("file-input").value = "";
                  handleLoad()  
                }else if(data.errors) {
                  console.log(data.errors,"oooo");
                  if (data.errors.message) generateError(data.errors.message);
                
                }
            }
        }catch{
            
        }
      
  
}
  return (
    <div>
    <input type="checkbox" id="add-plan" className="modal-toggle" />
    <label htmlFor="add-plan" className="cursor-pointer modal">
      <label className="relative overflow-y-auto w-96 modal-box scrollbar-none scrollbar-thumb-gray-400 scrollbar-track-transparent" htmlFor="">
        <div className="h-auto ">
          <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="card-body">
                <div className="avatar">
                  <div className="w-24 rounded-xl">
                    <img src={ image &&
                              URL.createObjectURL(image)} 
                    
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
                  value={planname}
                    type="text"
                    id='file-input'
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
                  value={description}
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
                  value={amount}
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
                  value={offerAmount}
                    type="text"
                    placeholder="OfferAmount"
                    className="input input-bordered"
                    onChange={(e)=>setOffferAmount(e.target.value)}
                  />
                </div>

                <div className="mt-6 form-control modal-action">
                  <button
                    type="submit"
                    className="text-white btn btn-outline bg-sky-900"
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