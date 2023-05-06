import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { rejectDoctor } from "../../sevices/adminApi";
function RejectedReason({ docDetail }) {
  const [reason, setReason] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setId(docDetail?._id);
  }, [docDetail]);

  const generatesuccess = (err) => {
    Swal.fire(err);
  };

  const rejectHandler =async (e) => {
    e.preventDefault();
    try {
      if (reason === "") {
        return Swal.fire("Please enter the reason");
      } else {

        let {data}=await rejectDoctor(id,reason)
        console.log(data);
        if(data){
          generatesuccess(data.message);
        }else{
          
        }
        
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <input type="checkbox" id="reject_modal" className="modal-toggle" />
      <label htmlFor="reject_modal" className="cursor-pointer modal">
        <label className="relative modal-box" htmlFor="">
          <div className="h-64 w-96">
            <h1 className="mb-10 font-bold">Rejected Reason</h1>
            <form
              className="flex flex-col gap-4 form-control "
              onSubmit={rejectHandler}
            >
              <div>
                <div className="block mb-2">
                  <label htmlFor="category">Add Reason</label>
                </div>
                <textarea
                  className="w-80 textarea textarea-success"
                  placeholder="please type the reason........."
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              
              </div>

              <div className="modal-action">
                <button
                  type="submit"
                  className="btn btn-outline btn-secondary"
                  htmlFor="reject_modal"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </label>
      </label>
    </div>
  );
}

export default RejectedReason;
