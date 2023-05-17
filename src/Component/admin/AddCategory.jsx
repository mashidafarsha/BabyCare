import React, { useState } from "react";
import Swal from "sweetalert";
import { addCategory } from "../../sevices/adminApi";


function AddCategory({ handleLoad }) {
  

  const generateError = (err) => {
    Swal(err);
  };

  const generatesuccess = (err) => {
    Swal(err);
  };
  // const [values, setValues] = useState({
  //   categoryName: "",
  //   description: "",
  // });
  const [categoryName, setCategoryName] = useState("");
  const [description,setDescription]=useState("")
  const [image, setImage] = useState(null);
  const [message,setMessage]=useState("")

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setImage(selectedFile);
      setMessage(null);
    } else {
      setImage(null);
      setMessage(
        'Please select a JPEG or PNG image.'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append("Image",image)
      formData.append("categoryName",categoryName)
      formData.append("description",description)
      let { data } = await addCategory(formData);
console.log(data);
      if (data.success) {
        generatesuccess(data.message);
        setCategoryName("")
        setDescription("")
        setImage('')
        document.getElementById("file-input").value = "";
        handleLoad();
      }else if(data.errors) {
        console.log(data.errors,"oooo");
        if (data.errors.message) generateError(data.errors.message);
      
      }
    } catch {}
  };

  return (
    <>
      <input type="checkbox" id="add-category" className="modal-toggle" />
      <label htmlFor="add-category" className="cursor-pointer modal">
        <label className="relative modal-box text-sky-900 " htmlFor="" >
          <div className="h-full w-96">
            <h1 className="mb-10 font-bold">ADD NEW DEPARTMENT</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
              <div>
                <div className="block mb-2">
                  <label htmlFor="category">CategoryName</label>
                </div>
                <input
                value={categoryName}
                 className="input input-bordered"
                  id="categoryName"
                  type="text"
                  required={true}
                  onChange={(e) =>
                    setCategoryName( e.target.value)
                  }
                />
              </div>
              <div>
                <div className="block mb-2">
                  <label htmlFor="description">Description</label>
                </div>
                <input
                value={description}
                 className="input input-bordered"
                  id="description"
                  type="text"
                  required={true}
                  onChange={(e) =>
                    setDescription( e.target.value )
                  }
                />
              </div>
              <div>
              <label>Upload Image</label>

              <input
                id='file-input'
                type="file"
                className="w-full max-w-xs ml-4 file-input"
                name="file"
                onChange={handleFileChange}
              />
              {message && <p>{message}</p>}
            </div>
              <div className="modal-action">
                <button
                  className="text-white btn btn-outline bg-sky-900"
                  htmlFor="add-category"
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

export default AddCategory;
