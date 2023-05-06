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
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleInput123"
                aria-describedby="emailHelp123"
                placeholder="First name"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
              <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200">
                First name
              </label>
            </div>

            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="email"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleInput124"
                aria-describedby="emailHelp124"
                placeholder="Last name"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
              <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200">
                Email
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleInput123"
                aria-describedby="emailHelp123"
                placeholder="First name"
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
              />
              <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200">
                Phone
              </label>
            </div>

            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleInput124"
                aria-describedby="emailHelp124"
                placeholder="Last name"
                onChange={(e) =>
                  setValues({ ...values, qualification: e.target.value })
                }
              />
              <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200">
                Qualification
              </label>
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
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleInput123"
                aria-describedby="emailHelp123"
                placeholder="First name"
                onChange={(e) =>
                  setValues({ ...values, experience: e.target.value })
                }
              />
              <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200">
                Experience
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleInput123"
                aria-describedby="emailHelp123"
                placeholder="Consultation Fee"
                onChange={(e) =>
                  setValues({ ...values, consultationFee: e.target.value })
                }
              />
              <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200">
                consultation Fee
              </label>
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
            className="inline-block w-80 bg-blue-400  rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-slate-950 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
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
