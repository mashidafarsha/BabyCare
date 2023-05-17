import React , { useState, useEffect }  from 'react'
import { getPlans } from "../../sevices/userApi";
import PlanDetails from '../planDetails/PlanDetails';
function AllPlans() {

    const [plansData, setPlansData] = useState([]);
    const [viewPlan, setViewPlan] = useState("");
    
    useEffect(() => {
        getAllPlans();
      }, []);

     
    
    const getAllPlans = async () => {
      
        try {
          let { data } = await getPlans();
          console.log(data, "ttttttttteeeeeeeeeeeet");
          if (data.success) {
            setPlansData(data.plans);
          }
        } catch {}
      };
  return (
    <div>
        <PlanDetails plan={viewPlan}  />
      <h1 className="text-xl font-bold">SPECIAL PLANS</h1>
      <div className="w-9/12 h-auto">
      {plansData.map((plan,index) => {
          return (
            <div className="float-left shadow-xl m-7 card bg-base-100 w-52 ">
              <figure className="px-10 pt-10">
                <img
                  src={
                plan.image ? `http://localhost:4000/${plan.image}` : ""
                  }
                  alt="Shoes"
                  className="w-32 h-32 rounded-xl"
                />
              </figure>
              
              <div className="items-center text-center card-body h-28">
              <h1 className="text-xl font-extrabold uppercase card-title">{plan.planname}</h1>
              </div>
              <div className="justify-center mb-7 card-actions">
                  <h2 className='font-bold'>{plan.amount}</h2>
                  <p>{plan.description}</p>
                <div className="card-actions">
                <label htmlFor="plan-modal" onClick={()=>setViewPlan(plan)} className="btn">view Details</label>
                </div>
              </div>
             </div>
          );
        })}
        
      </div>
    
    </div>
  )
}

export default AllPlans