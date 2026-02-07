import React , { useState, useEffect }  from 'react'
import { getPlans } from "../../sevices/userApi";
import PlanDetails from '../planDetails/PlanDetails';
import { BaseUrl } from "../../constants/constants";

function AllPlans() {
    const [plansData, setPlansData] = useState([]);
    const [viewPlan, setViewPlan] = useState("");
    
    useEffect(() => {
        getAllPlans();
    }, []);

    const getAllPlans = async () => {
        try {
          let { data } = await getPlans();
          if (data.success) {
            setPlansData(data.plans);
          }
        } catch (error) { console.log(error); }
    };

  return (
    <div className="container mx-auto px-4 py-10">
      <PlanDetails plan={viewPlan} />
      
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Special Health Plans</h1>
        <div className="h-1.5 w-20 bg-blue-600 rounded-full mt-2"></div>
      </div>

      {/* Grid Layout: 1 col on mobile, 2 on tablet, 3-4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {plansData.map((plan, index) => (
          <div key={index} className="flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group">
            
            {/* Plan Image */}
            <div className="h-48 overflow-hidden relative">
              <img
                src={plan.image ? `${BaseUrl}/${plan.image}` : "https://via.placeholder.com/400x300"}
                alt={plan.planname}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full shadow-sm">
                 <span className="text-blue-600 font-black text-sm">₹{plan.amount}</span>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow text-center">
              <h2 className="text-xl font-black text-slate-800 uppercase mb-3">{plan.planname}</h2>
              <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow">
                {plan.description}
              </p>
              
              <div className="mt-auto">
                <label 
                  htmlFor="plan-modal" 
                  onClick={() => setViewPlan(plan)} 
                  className="inline-block w-full py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-colors cursor-pointer shadow-lg shadow-slate-200"
                >
                  View Details
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllPlans;