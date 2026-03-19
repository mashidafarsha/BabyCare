import React, { useState, useEffect } from "react";
import { getPlans } from "../../sevices/userApi";
import { BaseUrl } from "../../constants/constants";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Shield } from "lucide-react";

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
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Simple Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 text-slate-900">
            Choose Your Healthcare Plan
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Select a plan that best fits your needs and gain access to premium medical services and specialized care.
          </p>
        </div>

        {/* Clean Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plansData.slice(0, 3).map((plan, index) => (
            <div 
              key={plan._id || index}
              className={`group bg-white p-10 rounded-3xl border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col ${index === 1 ? 'border-blue-200 ring-4 ring-blue-50 relative' : ''}`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${index === 1 ? 'bg-blue-600 text-white' : 'bg-slate-50 text-blue-600 border-slate-100'}`}>
                  <Shield size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  {plan.planname}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900 tracking-tight">₹{plan.price || "999"}</span>
                  <span className="text-slate-500 text-sm font-medium">/ year</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {[
                  "Unlimited Consultations",
                  "Priority Scheduling",
                  "Digital Health Records",
                  "Family Coverage Support"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <Link 
                to={"/plans"} 
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${index === 1 ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                Choose Plan <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlanBanner;