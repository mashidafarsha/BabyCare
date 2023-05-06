import React , { useState, useEffect }  from 'react'
import { getPlans } from "../../sevices/userApi";
function AllPlans() {
    const [plansData, setPlansData] = useState([]);
    
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
      <h1 className="text-xl font-bold">SPECIAL PLANS</h1>
      <div className="grid w-9/12 grid-cols-3 gap-6 bg-slate-500 h-6/6">
      {plansData.map((plan,index) => {
          return (
            <div className="shadow-xl m-7 card bg-base-100">
              <figure className="px-10 pt-10">
                <img
                  src={
                plan.image ? `http://localhost:4000/${plan.image}` : ""
                  }
                  alt="Shoes"
                  className="w-40 h-40 rounded-xl"
                />
              </figure>
              <div className="items-center text-center card-body">
                <h1 className="text-xl font-extrabold card-title">{plan.planname}</h1>
                  <h2 className='font-bold'>{plan.amount}</h2>
                  <p>{plan.description}</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
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