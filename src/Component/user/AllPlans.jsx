import React, { useEffect, useState } from "react";
import { getPlans } from "../../sevices/userApi";
import { BaseUrl } from "../../constants/constants";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Shield } from "lucide-react";

function AllPlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getAllPlans();
  }, []);

  const getAllPlans = async () => {
    try {
      let { data } = await getPlans();
      if (data.success) {
        setPlans(data.plans);
      }
    } catch (error) {
      console.error("Error fetching plans", error);
    }
  };

  return (
    <div className="min-h-screen bg-white py-32">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Simple Header */}
        <div className="mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Healthcare Coverage Plans
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Choose a plan that fits your life. Our comprehensive medical coverage ensures you and your family are protected with priority access to top specialists.
          </p>
        </div>

        {/* Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`group bg-white rounded-3xl border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col overflow-hidden animate-slide-up delay-${(index + 1) * 100} ${index === 1 ? 'ring-4 ring-blue-50 border-blue-200 relative' : ''}`}
            >
              {index === 1 && (
                <div className="absolute top-4 right-6 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full z-10">
                  Recommended
                </div>
              )}

              {/* Plan Header / Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={plan.image ? `${BaseUrl}/${plan.image}` : "https://via.placeholder.com/600"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={plan.planname}
                />
                <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/10 transition-colors"></div>
              </div>

              <div className="p-10 flex flex-col flex-grow">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={20} className="text-blue-600" />
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{plan.planname} Tier</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">
                    {plan.planname}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-slate-900">₹{plan.price || "999"}</span>
                    <span className="text-slate-500 text-sm">/ year</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 italic">
                    "{plan.description}"
                  </p>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {[
                    "Unlimited Online Consultations",
                    "Priority Appointment Booking",
                    "Digital Prescription Access",
                    "Comprehensive Health Reports",
                    "24/7 Dedicated Support"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm text-slate-600">{feat}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  to={"/plans"} 
                  className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${index === 1 ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                >
                  Enroll Now <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllPlans;