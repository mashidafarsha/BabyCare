import React, { useEffect, useState } from "react";
import AddPlans from "./AddPlans";
import EditPlan from "./EditPlan";
import { getPlans } from "../../sevices/adminApi";
function Plans() {
const [plansData,setPlansData]=useState([])
  const [editPlan,setEditPlan]=useState("")
  useEffect(() => {
  getAllPlans()
  }, [])

 const getAllPlans=async()=>{
    try{
     let {data}= await getPlans()
     console.log(data);
     if(data.success){
      setPlansData(data.plans)
     }
    }catch{
      
    }
  }
  return (
    <>
      <div className="">
        <AddPlans  />
        <label htmlFor="add-plan" className="float-right ml-10 btn">
          Add Plans
        </label>

        <div className="m-12 overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th className="pl-8">NO</th>
                <th>PLAN NAME</th>
                <th>DESCRIPTION</th>
                <th>IMAGE</th>
                <th>AMOUNT</th>
                <th>OFFER AMOUNT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
            {plansData &&
                plansData.map((plan, index) => {
                  return (
                    <tr>
                      <th className="pl-8">{index+1}</th>
                      <td>{plan.planname}</td>
                      <td>{plan.description}</td>
                      <td><img className="w-24 h-20" src={`http://localhost:4000/${plan.image}`} alt="" /></td>
                      <td>{plan.amount}</td>
                      <td>{plan.offerAmount}</td>
                    
                      <div>
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
                            // onClick={() => deleteCategory(dep._id)}
                            className="btn btn-outline btn-secondary"
                          >
                            DELETE
                          </button>
                        </td>
                      </div>
                    </tr>
                  )})}
            </tbody>
          </table>
          <EditPlan plan={editPlan} />
        </div>
      </div>
    </>
  );
}

export default Plans;
