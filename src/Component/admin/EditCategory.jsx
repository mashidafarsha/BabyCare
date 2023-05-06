import React, { useEffect } from "react";
import Swal from "sweetalert";
import { editDepartment } from "../../sevices/adminApi";
import { useState } from "react";

function EditCategory({ category, handleLoad }) {
  const [depname, setDepname] = useState("");
  const [depdescr, setDepdescr] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    setDepname(category?.categoryName);
    setDepdescr(category?.description);
    setId(category?._id);
  }, [category]);

  const generatesuccess = (err) => {
    Swal(err);
  };
  const editCategory = async (e) => {
    e.preventDefault();
    try {
      if (depname === "" || depdescr === "") {
        Swal("Please enter all details");
      } else {
        let { data } = await editDepartment(id, depname, depdescr);
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
        <label className="relative modal-box" htmlFor="">
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
                  className="w-60 outline-slate-400 outline"
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
                  className="w-60 outline-slate-400 outline"
                  id="description"
                  type="text"
                  // required={true}
                  value={depdescr}
                  onChange={(e) => setDepdescr(e.target.value)}
                />
              </div>
              <div className="modal-action">
                <button
                  type="submit"
                  className="btn btn-outline btn-secondary"
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
