import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { editUser } from "../../sevices/userApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BaseUrl } from "../../constants/constants";
function EditUserProfile({ handleLoad}) {
  const [name, setName] = useState("");

  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate()
  let {user}=useSelector((state)=>state.user)
useEffect(() => {
    setName(user?.name)

    setImage(user?.image)
}, [])
  const handleFileChange = (event) => {
    setImage(null);
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    const allowedTypes = ["image/jpeg", "image/png"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setUploadedImage(selectedFile);
      setMessage(null);
    } else {
      setUploadedImage(null);
      setMessage("Please select a JPEG or PNG image.");
    }
  };

  const handleEdit = async (e) => {
    console.log("start");
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Image", uploadedImage);
      formData.append("name", name);
    
     

      let { data } = await editUser(formData);
      console.log(data);
      if(data.success){
        handleLoad();
        Swal.fire("Successfuly Updated User Profile")
       
      }
    }catch{
        
    }
}
  return (
    <div>
      <input type="checkbox" id="user_profile" className="modal-toggle" />
      <label htmlFor="user_profile" className="w-full cursor-pointer modal">
        <label
          className="relative w-full overflow-y-auto modal-box scrollbar-none scrollbar-thumb-gray-400 scrollbar-track-transparent "
          htmlFor="user_profile"
        >
          <div className="w-full">
            <div className="flex-shrink-0 w-full card bg-base-100 ">
              <h1 className="font-bold text-center uppercase ">
                EDIT {name} 
              </h1>

              <form onSubmit={handleEdit} className="">
                <div className="card-body">
                  <div className="avatar">
                    <div className="w-24 rounded-xl">
                      <img
                        src={
                          image
                            ? `${BaseUrl}/${image}`
                            : uploadedImage &&
                              URL.createObjectURL(uploadedImage)
                        }
                      />
                    </div>
                  </div>
                  <input
                    type="file"
                    className="w-full max-w-xs file-input file-input-bordered file-input-success"
                      onChange={handleFileChange}
                  />

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      id="Name"
                      placeholder="Name"
                      className="input input-bordered"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                 

                  <div className="bg-black form-control modal-action">
                    <button
                      type="submit"
                      className="btn btn-outline btn-secondary "
                      htmlFor="user_profile"
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
  );
}

export default EditUserProfile;
