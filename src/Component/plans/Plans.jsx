import React, { useEffect, useState } from "react";
import AddPlans from "./AddPlans";
import EditPlan from "./EditPlan";
import { getPlans, deletePlans } from "../../sevices/adminApi";
import Swal from "sweetalert2";
function Plans() {
  const [load, setLoad] = useState(false);
  const [plansData, setPlansData] = useState([]);
  const [editPlan, setEditPlan] = useState("");
  const handleLoad = () => {
    setLoad(!load);
  };

  useEffect(() => {
    getAllPlans();
  }, [load]);



  const getAllPlans = async () => {
    try {
      let { data } = await getPlans();
      console.log(data);
      if (data.success) {
        setPlansData(data.plans);
      }
    } catch {}
  };
  const deletePlan = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this department?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willdelete) => {
        if (willdelete) {
          let { data } = await deletePlans(id);
          console.log(data);
          if (data.success) {
            getAllPlans();
          } else {
            Swal.fire("The department was not deleted.");
          }
        } else {
          Swal.fire("The plan not deleted.");
        }
      });
    } catch {}
  };

  return (
    <>
      <div className="">
        <div className="inline-block w-full ">
          <label htmlFor="add-plan" className="float-right ml-10 btn">
            Add Plans
          </label>
        </div>
        <div className="m-12 overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th className="pl-8">NO</th>
                <th>PLAN NAME</th>
               
                <th>IMAGE</th>
                <th>AMOUNT</th>
                <th>OFFER AMOUNT (%)</th>
                <th>number of users</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {plansData &&
                plansData.map((plan, index) => {
                  return (
                    <tr>
                      <th className="pl-8">{index + 1}</th>
                      <td>{plan.planname}</td>
                     
                      <td>
                        <img
                          className="w-24 h-20"
                          src={`http://localhost:4000/${plan.image}`}
                          alt=""
                        />
                      </td>
                      <td>{plan.amount}</td>
                      <td>{plan.offerAmount}</td>
                      <td>{plan.user.length}</td>
                      <td>
                        <label
                          htmlFor="edit-plan"
                          onClick={() => setEditPlan(plan)}
                          className="btn btn-outline btn-primary"
                        >
                          Edit
                        </label>
                      </td>
                      <td>
                        <button
                          onClick={() => deletePlan(plan._id)}
                          className="btn btn-outline btn-secondary"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <EditPlan plan={editPlan} handleLoad={handleLoad} />
        </div>
      </div>
      <AddPlans handleLoad={handleLoad} load={load} />
    </>
  );
}

export default Plans;
