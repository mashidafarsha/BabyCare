import React, { useState, useEffect } from "react";
import { getPlans } from "../../sevices/userApi";
import { BaseUrl } from "../../constants/constants"; // BaseUrl import cheyyunnu
import { Link } from "react-router-dom";

function PlanBanner() {
  const [plansData, setPlansData] = useState([]);

  useEffect(() => {
    getAllPlans();
  }, []);

  const getAllPlans = async () => {
    try {
      let { data } = await getPlans();
      if (data.success) {
        setPlansData(data.plans);
      }
    } catch (error) {
      console.error("Error fetching plans", error);
    }
  };

  if (plansData.length === 0) return null;

  return (
    <div className="py-12 bg-slate-50">
      <div className="container mx-auto px-4 md:px-10">
        
        {/* Section Title */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-black text-slate-800 italic uppercase tracking-tight">
            Our Care Plans
          </h2>
          <div className="h-1 w-20 bg-blue-600 mt-2 mx-auto md:mx-0 rounded-full"></div>
        </div>

        <div className="carousel w-full rounded-3xl shadow-xl overflow-hidden border border-white">
          {plansData.map((plan, index) => (
            <div
              key={plan.id || index}
              id={`plan${index + 1}`}
              className="carousel-item relative w-full bg-white"
            >
              <div className="flex flex-col lg:flex-row w-full items-center">
                
                {/* Image Section - Left (Desktop) */}
                <div className="w-full lg:w-1/2 h-[300px] lg:h-[450px] relative overflow-hidden">
                  <img
                    src={plan.image ? `${BaseUrl}/${plan.image}` : "https://via.placeholder.com/600"}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    alt={plan.planname}
                  />
                  <div className="absolute inset-0 bg-blue-900/10"></div>
                </div>

                {/* Content Section - Right (Desktop) */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-20 bg-gradient-to-br from-white to-blue-50">
                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Exclusive Plan
                  </span>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-800 mt-4 leading-tight">
                    {plan.planname}
                  </h1>
                  <p className="py-6 text-slate-600 text-lg leading-relaxed font-medium">
                    {plan.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <Link 
                      to={"/plans"} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center gap-2 group"
                    >
                      Get All Details
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 pointer-events-none">
                <a href={`#plan${index === 0 ? plansData.length : index}`} className="btn btn-circle btn-sm md:btn-md bg-white/80 border-none shadow-lg pointer-events-auto hover:bg-blue-600 hover:text-white transition-colors">
                  ❮
                </a>
                <a href={`#plan${index + 2 > plansData.length ? 1 : index + 2}`} className="btn btn-circle btn-sm md:btn-md bg-white/80 border-none shadow-lg pointer-events-auto hover:bg-blue-600 hover:text-white transition-colors">
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlanBanner;