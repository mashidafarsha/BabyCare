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
  const [values, setValues] = useState({
    categoryName: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await addCategory(values);
console.log(data);
      if (data.success) {
        generatesuccess(data.message);
        handleLoad();
      }else{
        
        if(data.error){
          generatesuccess(data.errors.name);
        }
      }
    } catch {}
  };

  return (
    <>
      <input type="checkbox" id="add-category" className="modal-toggle" />
      <label htmlFor="add-category" className="cursor-pointer modal">
        <label className="relative modal-box" htmlFor="">
          <div className="h-full w-96">
            <h1 className="mb-10 font-bold">ADD DEPARTMENT</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
              <div>
                <div className="block mb-2">
                  <label htmlFor="category">CategoryName</label>
                </div>
                <input
                  className="w-60 outline-slate-400 outline"
                  id="categoryName"
                  type="text"
                  required={true}
                  onChange={(e) =>
                    setValues({ ...values, categoryName: e.target.value })
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
                    setValues({ ...values, description: e.target.value })
                  }
                />
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-outline btn-secondary"
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
