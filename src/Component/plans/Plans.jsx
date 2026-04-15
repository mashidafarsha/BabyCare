import React, { useEffect, useState } from "react";
import AddPlans from "./AddPlans";
import EditPlan from "./EditPlan";
import { getPlans, deletePlans } from "../../sevices/adminApi";
import Swal from "sweetalert2";
import { BaseUrl } from "../../constants/constants";
import { Plus, Edit3, Trash2, CreditCard, Search, Tag, Users, DollarSign } from "lucide-react";

function Plans() {
  const [load, setLoad] = useState(false);
  const [plansData, setPlansData] = useState([]);
  const [editPlan, setEditPlan] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const handleLoad = () => {
    setLoad(!load);
  };

  useEffect(() => {
    getAllPlans();
  }, [load]);



  const getAllPlans = async () => {
    setLoading(true);
    try {
      let { data } = await getPlans();
      if (data.success) {
        setPlansData(data.plans);
      }
    } catch (error) {
      console.error("Fetch plans failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const deletePlan = (id) => {
    try {
      Swal.fire({
        title: "Delete Subscription Plan?",
        text: "This action cannot be undone. Active users on this plan may be affected.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EF4444",
        cancelButtonColor: "#64748B",
        confirmButtonText: "Yes, Delete Plan",
        background: "#ffffff",
        borderRadius: "2rem",
        customClass: {
          title: "font-black uppercase tracking-tighter text-slate-800",
          content: "font-medium text-slate-500 text-sm",
          confirmButton: "rounded-2xl font-black uppercase text-[10px] tracking-widest px-8 py-4",
          cancelButton: "rounded-2xl font-black uppercase text-[10px] tracking-widest px-8 py-4"
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          let { data } = await deletePlans(id);
          if (data.success) {
            Swal.fire({
              icon: "success",
              title: "Plan Removed",
              text: "The subscription model has been deleted.",
              timer: 1500,
              showConfirmButton: false,
              borderRadius: "2rem"
            });
            getAllPlans();
          } else {
            Swal.fire({
              icon: "error",
              title: "Deletion Failed",
              text: "Could not remove the plan at this time.",
              borderRadius: "2rem"
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPlans = plansData?.filter(plan => 
    plan.planname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-0">
        <div>
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Subscription Plans</h1>
          <p className="text-slate-500 font-medium text-[10px] uppercase tracking-[0.3em] mt-1">Management of Hospital Premium Tiers</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search plans..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-slate-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all w-64 shadow-sm"
            />
          </div>
          <label
            htmlFor="add-plan"
            className="btn-primary flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Plus size={20} />
            Create New Plan
          </label>
        </div>
      </div>

      <div className="premium-card overflow-hidden">
        {loading ? (
          <div className="p-10 space-y-4">
             {[1,2,3,4].map(i => <div key={i} className="h-20 bg-slate-50 animate-pulse rounded-2xl w-full"></div>)}
          </div>
        ) : filteredPlans?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan Identity</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Financials</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tier Utilization</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Administrative</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPlans.map((plan, index) => (
                  <tr key={plan._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-xl border-2 border-white shadow-md overflow-hidden bg-slate-100 flex-shrink-0">
                           <img
                             className="w-full h-full object-cover"
                             src={plan.image || plan.imageUrl || "https://cdn-icons-png.flaticon.com/512/2373/2373446.png"}
                             alt={plan.planname}
                           />
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-base uppercase tracking-tight">{plan.planname}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Premium Service Model</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="space-y-1">
                          <p className="font-black text-slate-800 flex items-center text-lg tracking-tighter leading-none">
                             <DollarSign size={16} className="text-blue-600" />
                             {plan.amount}
                          </p>
                          <div className="flex items-center gap-2">
                             <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                                <Tag size={10} />
                                {plan.offerAmount}% OFF
                             </span>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3">
                          <div className="bg-slate-100 p-2.5 rounded-xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                             <Users size={18} />
                          </div>
                          <div>
                             <p className="font-black text-slate-800 text-lg leading-none">{plan.user.length}</p>
                             <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Active Subscribers</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <label
                          htmlFor="edit-plan"
                          onClick={() => setEditPlan(plan)}
                          className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all cursor-pointer shadow-sm"
                        >
                          <Edit3 size={18} />
                        </label>
                        <button
                          onClick={() => deletePlan(plan._id)}
                          className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-24 flex flex-col items-center justify-center text-center">
             <div className="bg-slate-50 p-10 rounded-[3rem] text-slate-200 mb-8 border border-white shadow-inner">
                <CreditCard size={64} />
             </div>
             <h3 className="font-black text-slate-800 uppercase tracking-tighter text-2xl">No Revenue Models</h3>
             <p className="text-slate-400 font-bold text-sm tracking-wide mt-3 max-w-xs mx-auto italic">Configure your hospital subscription tiers to start scaling.</p>
          </div>
        )}
      </div>

      <EditPlan plan={editPlan} handleLoad={handleLoad} />
      <AddPlans handleLoad={handleLoad} load={load} />
    </div>
  );
}

export default Plans;
