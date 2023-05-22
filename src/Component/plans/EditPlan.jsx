import React, { useEffect, useState } from "react";
import { editOurPlan } from "../../sevices/adminApi";
import Swal from "sweetalert2";
import { BaseUrl } from "../../constants/constants";
function EditPlan({ plan,handleLoad }) {
    const [id,setId]=useState("")
  const [planname, setPlanname] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [offerAmount, setOffferAmount] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");

  useEffect(() => {
 
    setId(plan?._id)
    setPlanname(plan?.planname);
    setDescription(plan?.description);
    setAmount(plan?.amount);
    setOffferAmount(plan?.offerAmount);
    setUploadedImage(plan?.image);
  }, [plan]);

  const handleFileChange = (event) => {
    setUploadedImage(null);
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
    Swal.fire(err);
  };
  
  const generateSuccess = (err) => {
    Swal.fire(err);
  };


  
  const handleSubmit=async(e)=>{
    e.preventDefault()

        const formData = new FormData();
        formData.append("id",id);
        formData.append("image", image);
        formData.append("planname", planname);
        formData.append("description", description);
        formData.append("amount", amount);
        formData.append("offerAmount", offerAmount);
        
        try{
            if (planname === "" || description === ""||amount===""||image==="") {
                Swal("Please enter all details");
            }else{
                let {data}=await editOurPlan(formData)
                if (data) {
                  generatesuccess(data.message);
                  handleLoad();
                }else{
                  generateError(data.message);
                 
                }
            }
        }catch{
            
        }
      
  
}

  return (
    <>
      <input type="checkbox" id="edit-plan" className="modal-toggle" />
      <label htmlFor="edit-plan" className="cursor-pointer modal">
        <label className="relative overflow-y-auto modal-box scrollbar-none scrollbar-thumb-gray-400 scrollbar-track-transparent" htmlFor="">
          <div className="h-full w-96">
            <h1 className="mb-10 font-bold uppercase">
              EDIT PLAN OF {plan?.planname}
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 form-control ">
              <div>
                <div  className="form-control">
                  <label htmlFor="category">   <span className="label-text">Planname</span></label>
                </div>
                <input
                  className="input input-bordered"
                  id="Plane Name"
                  type="text"
                  value={planname}
                  onChange={(e) => setPlanname(e.target.value)}
                />
              </div>
              <div>
                <div  className="form-control">
                  <label htmlFor="description">   <span className="label-text">Description</span></label>
                </div>
                <input
                    type="text"
                    placeholder="description"
                    className="input input-bordered"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
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
                  value={offerAmount}
                  onChange={(e) => setOffferAmount(e.target.value)}
                />
              </div>
              <div>
                <label>Upload Image</label>
                <img
                  className="w-16"
                  src={
                    uploadedImage
                      ? `${BaseUrl}/${uploadedImage}`
                      : image && URL.createObjectURL(image)
                  }
                  alt=""
                />

                <input
                  type="file"
                  className="w-full max-w-xs ml-4 file-input"
                  name="file"
                  onChange={handleFileChange}
                />
                {message && <p>{message}</p>}
              </div>
              <div className="modal-action">
                <button
                  type="submit"
                  className="text-white btn btn-outline bg-sky-900"
                  htmlFor="edit-plan"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </label>
      </label>
    </>
  );
}

export default EditPlan;
