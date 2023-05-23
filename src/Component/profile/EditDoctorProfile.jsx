import React from "react";
import { useState, useEffect } from "react";
import { editDoctor, getCategory } from "../../sevices/doctorApi";
import { BaseUrl } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


import Swal from "sweetalert2";

function EditDoctorProfile({ doctorData,handleLoad }) {
  const [allDepartment, setAllDepartment] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [message, setMessage] = useState("");




  useEffect(() => {
    setId(doctorData?.id);
    setName(doctorData?.name);
    // setEmail(doctorData?.email);
    setPhone(doctorData?.phone);
    setQualification(doctorData?.qualification);
    setDepartment(doctorData?.department);
    setImage(doctorData?.image);

    getAllDepartment();
  }, [doctorData]);

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
  const getAllDepartment = async () => {
    try {
      let { data } = await getCategory();
      console.log(data);
      if (data) {
        setAllDepartment(data.departmentData);
      }
    } catch {}
  };
console.log(department,"iiiiii");
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Id", id);
      formData.append("Image", uploadedImage);
      formData.append("name", name);
      // formData.append("email", email);
      formData.append("phone", phone);
      formData.append("qualification", qualification);
      formData.append("department", department);

      let { data } = await editDoctor(formData);
      console.log(data)
      if (data.success) {
        console.log("suuuccc");
        Swal.fire("Successfuly Updated User Profile")
        handleLoad()
       
       
      }else{
        Swal("Not Updated Your Profile")
      }
    } catch {}
  };
  return (
    <div>
      <input type="checkbox" id="doctor_profile" className="modal-toggle" />
      <label htmlFor="doctor_profile" className="cursor-pointer modal ">
        <label className="relative overflow-y-auto modal-box w-96 scrollbar-none scrollbar-thumb-gray-400 scrollbar-track-transparent " htmlFor="doctor_profile">
        <div className="w-full">
            <div className="flex-shrink-0 w-full card bg-base-100 ">
             
              <h1 className="font-bold text-center uppercase ">
              EDIT {doctorData?.name} 
              
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
                  {/* <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="email"
                      className="input input-bordered"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div> */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Phone"
                      className="input input-bordered"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                  <label className="label">
                      <span className="label-text">Department</span>
                    </label>
                    <select
                      value={department
                      }
                        onChange={(e) => setDepartment(e.target.value)}
                  
                      className="w-full max-w-xs select"
                    >
                     
                      {allDepartment.map((department, index) => {
                        return (
                          <option>
                            {department.categoryName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Qualification</span>
                    </label>
                    <input
                      type="text"
                      placeholder="password"
                      className="input input-bordered"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                    />
                  </div>

                  <div className="bg-black form-control modal-action">
                    <button
                      type="submit"
                      className="btn btn-outline btn-secondary "
                      htmlFor="doctor_profile"
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

export default EditDoctorProfile;
