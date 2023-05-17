import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert';
import { addBannerData } from '../../sevices/adminApi';

function AddBanner({handleLoad}) {
    const [bannerName,setBannerName]=useState("")
    const [description,setDescription]=useState("")
    const [image, setImage] = useState(null);
    const [message,setMessage]=useState("")

    const generateError = (err) => {
      Swal(err);
    };
    
    const generateSuccess = (err) => {
      Swal(err);
    };
    
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
           
            generateSuccess(data.message)
            setBannerName("")
            setDescription("")
            setImage('')
            document.getElementById("file-input").value = "";
            handleLoad()  
            // navigate("/admin/banner",{state:{data}});
          } else if(data.errors) {
            console.log(data.errors,"oooo");
            if (data.errors.message) generateError(data.errors.message);
          
          }
      }

    

      
      
  return (
    <>
    <input type="checkbox" id="add-banner" className="modal-toggle" />
    <label htmlFor="add-banner" className="cursor-pointer modal ">
      <label className="relative modal-box text-sky-900 " htmlFor="">
        <div className="h-full w-96">
          <h1 className="mb-10 font-bold">ADD BANNER</h1>
          <form onSubmit={handleSubmit}   className="flex flex-col gap-4"encType='multipart/form-data'>
          <div>
              <div className="block mb-2">
                <label htmlFor="category">BnnerName</label>
              </div>
              <input
               className="input input-bordered"
                id="categoryName"
                type="text"
                value={bannerName}
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
                className="input input-bordered"
                id="description"
                type="text"
                value={description}
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
              type='submit'
              className="text-white btn btn-outline bg-sky-900"
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