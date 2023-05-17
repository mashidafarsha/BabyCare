import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { editBannerData } from "../../sevices/adminApi";
function EditBanner({ editBanner, handleLoad }) {
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [bannerName, setBannerName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setUploadedImage(editBanner?.image);
    setBannerName(editBanner?.bannerName);
    setDescription(editBanner?.description);
    setId(editBanner?._id);
  }, [editBanner]);

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
  
  const generatesuccess = (err) => {
    Swal.fire(err);
  };


  const editHandleBanner = async (e) => {
    e.preventDefault();
    if (bannerName === "" || description === "") {
      Swal("Please enter all details");
    } else {
      let { data } = await editBannerData(id, bannerName, description, image)
      console.log(data);
      generatesuccess(data.message);
      handleLoad();
      console.log(data);
    }
  };

  return (
    <>
      <input type="checkbox" id="editBanner" className="modal-toggle" />
      <label htmlFor="editBanner" className="cursor-pointer modal">
        <label className="relative overflow-y-auto modal-box text-sky-900 scrollbar-none scrollbar-thumb-gray-400 scrollbar-track-transparent" htmlFor="">
          <div className="h-full w-96">
            <h1 className="mb-10 font-bold uppercase">
              EDIT BANNER OF {editBanner?.bannerName}
              
            </h1>
            <form
              onSubmit={editHandleBanner}
              className="flex flex-col gap-4 form-control "
            >
              <div>
                <div className="block mb-2">
                  <label htmlFor="category">CategoryName</label>
                </div>
                <input
                 className="text-black input input-bordered"
                  id="categoryName"
                  type="text"
                  value={bannerName}
                  onChange={(e) => setBannerName(e.target.value)}
                />
              </div>
              <div>
                <div className="block mb-2">
                  <label htmlFor="description">Description</label>
                </div>
                <input
                  className="text-black input input-bordered"
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  className="text-white btn btn-outline bg-sky-900"
                  htmlFor="editBanner"
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

export default EditBanner;
