import React, { useEffect } from "react";
import Swal from "sweetalert";
import { editDepartment } from "../../sevices/adminApi";
import { useState } from "react";

function EditCategory({ category, handleLoad }) {
  const [depname, setDepname] = useState("");
  const [depdescr, setDepdescr] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [image, setImage] = useState("");
  const [message,setMessage]=useState("")
  const [id, setId] = useState("");
  useEffect(() => {
    setUploadedImage(category?.image)
    setDepname(category?.categoryName);
    setDepdescr(category?.description);
    setId(category?._id);
  }, [category]);

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

  const generatesuccess = (err) => {
    Swal(err);
  };
  const editCategory = async (e) => {
    e.preventDefault();
    try {
      if (depname === "" || depdescr === "") {
        Swal("Please enter all details");
      } else {
        let { data } = await editDepartment(id, depname, depdescr,image);
        if (data) {
          generatesuccess(data.message);
          handleLoad();
        }
      }
    } catch {}

    
  };

  return (
    <>
      <input type="checkbox" id="editCategory" className="modal-toggle" />
      <label htmlFor="editCategory" className="cursor-pointer modal">
        <label className="relative modal-box  text-sky-900 " htmlFor="">
          <div className="h-full w-96">
            <h1 className="mb-10 font-bold">
              EDIT DEPARTMENT OF {category?.categoryName.toUpperCase()}
            </h1>
            <form
              onSubmit={editCategory}
              className="flex flex-col gap-4 form-control "
            >
              <div>
                <div className="block mb-2">
                  <label htmlFor="category">CategoryName</label>
                </div>
                <input
                  className="input input-bordered text-black"
                  id="categoryName"
                  type="text"
                  // required={true}
                  value={depname}
                  onChange={(e) => setDepname(e.target.value)}
                />
              </div>
              <div>
                <div className="block mb-2">
                  <label htmlFor="description">Description</label>
                </div>
                <input
                className="input input-bordered text-black"
                  id="description"
                  type="text"
                  // required={true}
                  value={depdescr}
                  onChange={(e) => setDepdescr(e.target.value)}
                />
              </div>
              <div>
                <label>Upload Image</label>
                <img
                  className="w-16"
                  src={
                    uploadedImage
                      ? `http://localhost:4000/${uploadedImage}`
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
                  className="btn btn-outline text-white bg-sky-900"
                  htmlFor="editCategory"
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

export default EditCategory;
