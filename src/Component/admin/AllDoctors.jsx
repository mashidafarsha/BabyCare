import React from "react";
import { useState, useEffect } from "react";
import { getApprovedDoctor, deleteDoctor } from "../../sevices/adminApi";
import Swal from "sweetalert2";
function AllDoctors() {
  const [docDetail, setDocDetail] = useState("");
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    getAllDoctor();
  }, []);
  const getAllDoctor = async () => {
    try {
      let { data } = await getApprovedDoctor();
      console.log(data);
      if (data.success) {
        setDoctor(data.doctors);
      }
    } catch {}
  };
  const blockDoctor = (doctorId, status) => {
    console.log("kkk");
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accept it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let { data } = await deleteDoctor(doctorId);

          if (data.success) {
            Swal.fire("Accepted!", "The Doctor has been Blocked.", "success");
            getAllDoctor();
          } else {
            Swal.fire("Something went wrong");
          }
        }
      });
    } catch {}
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Doctor Name</th>
              <th>Email</th>
              <th>Qualification</th>
              <th>consultation fee</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {doctor &&
              doctor.map((doc, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{doc.name}</td>
                    <td>{doc.email}</td>
                    <td>{doc.qualification}</td>
                    <td>{doc.consultationFee}</td>

                    <div>
                      <td>
                        {doc.status == "Active" ? (
                          <button
                            onClick={() => blockDoctor(doc._id, doc.status)}
                            className="btn btn-error"
                          >
                            Block
                          </button>
                        ) : (
                          <button
                            onClick={() => blockDoctor(doc._id, doc.status)}
                            className="btn btn-success"
                          >
                            Active
                          </button>
                        )}
                      </td>
                    </div>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllDoctors;
