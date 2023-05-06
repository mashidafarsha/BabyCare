import React, { useEffect, useState } from 'react'

import { addBannerData } from '../../sevices/adminApi';

function AddBanner() {
    const [bannerName,setBannerName]=useState("")
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

      

      const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("Image",image);
        formData.append("bannerName", bannerName);
        formData.append("description",description);
        console.log(image);

        let { data } = await addBannerData(formData)
      
          if (data.success) {
            generateSuccess(data.message);
            navigate("/admin/banner",{state:{data}});
          } else {
            generateError(data.message);
          }
      }

    

      
      
  return (
    <>
    <input type="checkbox" id="add-banner" className="modal-toggle" />
    <label htmlFor="add-banner" className="cursor-pointer modal">
      <label className="relative modal-box" htmlFor="">
        <div className="h-full w-96">
          <h1 className="mb-10 font-bold">ADD BANNER</h1>
          <form onSubmit={handleSubmit}   className="flex flex-col gap-4"encType='multipart/form-data'>
          <div>
              <div className="block mb-2">
                <label htmlFor="category">BnnerName</label>
              </div>
              <input
                className="w-60 outline-slate-400 outline"
                id="categoryName"
                type="text"
                required={true}
                onChange={(e) =>
                  setBannerName(e.target.value )
                }
              />
            </div>
           
            <div>
              <div className="block mb-2">
                <label htmlFor="description">Description</label>
              </div>
              <input
                className="w-60 outline-slate-400 outline"
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
                type="file"
                className="w-full max-w-xs ml-4 file-input"
                name="file"
                onChange={handleFileChange}
              />
              {message && <p>{message}</p>}
            </div>
            <div className="modal-action">
              <button
              type='submit'
                className="btn btn-outline btn-secondary"
                htmlFor="add-banner"
                
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </label>
    </label>
  </>
  )
}

export default AddBanner