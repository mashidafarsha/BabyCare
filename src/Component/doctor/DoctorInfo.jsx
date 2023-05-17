import React, { useEffect } from "react";
import { getCategory } from "../../sevices/doctorApi";
import { useState } from "react";
import { doctorInfo } from "../../sevices/doctorApi";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function DoctorInfo() {
  const [allDepartment, setAllDepartment] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    department: "",
    experience: "",
    consultationFee: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("doctorWaitingToken")) {
      navigate("/doctor/waiting");
    }
    getAllDepartment();
  }, []);

  const generateError = (err) => {
    Swal(err);
  };

  const generateSuccess = (err) => {
    Swal(err);
  };

  const checkFileExtension = (filename) => {
    const allowedExtensions = /(\.doc|\.docx|\.pdf|\.txt)$/i;
    return allowedExtensions.test(filename);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && checkFileExtension(selectedFile.name)) {
      setFile(selectedFile);
      setMessage(null);
    } else {
      setFile(null);
      setMessage(
        "Invalid file type. Please select a .doc, .docx, .pdf, or .txt file."
      );
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
  console.log(values, "jjjjj");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("qualification", values.qualification);
    formData.append("department", values.department);
    formData.append("experience", values.experience);
    formData.append("consultationFee", values.consultationFee);

    let { data } = await doctorInfo(formData);

    if (data.success) {
      generateSuccess(data.message);
      localStorage.setItem("doctorWaitingToken", data.token);
      navigate("/doctor/waiting");
    } else {
      generateError(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden bg-white">
      <div className="block w-full h-auto p-6 bg-red-200 rounded-lg shadow-lg dark:bg-neutral-900 ">
        <form encType="multipart/form-data">
          <div className="h-12 text-center bg-pink-400">
            <h1 className="pt-3 font-bold">PERSONAL INFO</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative mb-6" data-te-input-wrapper-init>
            <label className="label">
                      <span className="label-text">First name</span>
                    </label>
              <input
                type="text"
                className="input input-bordered"
                id="exampleInput123"
                aria-describedby="emailHelp123"
                placeholder="First name"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
           
            </div>

            <div className="relative mb-6" data-te-input-wrapper-init>
            <label className="label">
                      <span className="label-text"> Email</span>
                    </label>
              <input
                type="email"
                className="input input-bordered"
                id="exampleInput124"
                aria-describedby="emailHelp124"
                placeholder="Email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
             
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative mb-6" data-te-input-wrapper-init>
            <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
              <input
                type="text"
                className="input input-bordered"
                id="exampleInput123"
                aria-describedby="emailHelp123"
                placeholder="Phone"
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
              />
            
            </div>

            <div className="relative mb-6" data-te-input-wrapper-init>
            <label className="label">
                      <span className="label-text">Qualification</span>
                    </label>
              <input
                type="text"
                className="input input-bordered"
                id=""
                aria-describedby="emailHelp124"
                placeholder="Qualification"
                onChange={(e) =>
                  setValues({ ...values, qualification: e.target.value })
                }
              />
             
            </div>
          </div>

          <div className="h-12 text-center bg-pink-400">
            <h1 className="pt-3 font-bold">PROFESSIONAL INFO</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select
              onChange={(e) =>
                setValues({ ...values, department: e.target.value })
              }
              className="w-full max-w-xs select"
            >
              <option disabled selected>
                Pick your Department
              </option>
              {allDepartment.map((department, index) => {
                return (
                  <option value={department.categoryName}>
                    {department.categoryName}
                  </option>
                );
              })}
            </select>
           
            <div className="relative mb-6" data-te-input-wrapper-init>
            <label className="label">
                      <span className="label-text"> Experience</span>
                    </label>
              <input
                type="text"
                className="input input-bordered"
                id="exampleInput123"
                aria-describedby="emailHelp123"
                placeholder="Experience"
                onChange={(e) =>
                  setValues({ ...values, experience: e.target.value })
                }
              />
             
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative mb-6" data-te-input-wrapper-init>
            <label className="label">
                      <span className="label-text">consultation Fee</span>
                    </label>
              <input
                type="text"
                className="input input-bordered"
                id="exampleInput123"
                aria-describedby="emailHelp123"
                placeholder="Consultation Fee"
                onChange={(e) =>
                  setValues({ ...values, consultationFee: e.target.value })
                }
              />
            
            </div>

            <div>
              <label>Upload Documents</label>

              <input
                type="file"
                className="w-full max-w-xs ml-4 file-input"
                name="file"
                onChange={handleFileChange}
              />
              {message && <p>{message}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 w-52 input input-bordered"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

export default DoctorInfo;
