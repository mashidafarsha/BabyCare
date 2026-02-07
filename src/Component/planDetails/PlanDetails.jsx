import React, { useEffect, useState } from "react";
import { RazorPayPayment, verifyPayment } from "../../sevices/userApi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import moment from "moment";
import { BaseUrl } from "../../constants/constants";

function PlanDetails({ plan }) {
  const [userPlan, setUserPlan] = useState([]);
  const [userExpPlan, setUserExpPlan] = useState();
  let { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setUserPlan(user.plans || []);
      setUserExpPlan(moment(user.planExpDate));
    }
  }, [plan, user]);

  const today = moment();

  const handleSumit = async () => {
    try {
      let { data } = await RazorPayPayment(plan._id, plan.amount);
      if (data.datas) {
        paymentPage(data.datas);
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  const paymentPage = (data) => {
    let options = {
      key: "rzp_test_SBnlzMmVLtySb7", // നിങ്ങളുടെ പുതിയ കീ ഇവിടെ നൽകുക
      amount: data.amount,
      currency: data.currency,
      name: "TrueCare Premium",
      description: plan.planname,
      order_id: data.id,
      handler: async (response) => {
        try {
          const { data: verifyData } = await verifyPayment(response, plan._id);
          if (verifyData.success) {
            Swal.fire({
              icon: 'success',
              title: 'Welcome to Premium!',
              text: verifyData.message,
              confirmButtonColor: '#2563eb'
            }).then(() => window.location.reload());
          }
        } catch (error) {
          Swal.fire("Error", "Verification failed", "error");
        }
      },
      theme: { color: "#2563eb" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <input type="checkbox" id="plan-modal" className="modal-toggle" />
      <div className="modal backdrop-blur-md bg-slate-900/60">
        <div className="modal-box w-11/12 max-w-4xl p-0 overflow-hidden rounded-[2.5rem] bg-white border-none shadow-2xl">
          
          {/* Header Section */}
          <div className="relative bg-blue-600 p-8 md:p-12 text-white">
            <label htmlFor="plan-modal" className="absolute btn btn-sm btn-circle right-4 top-4 bg-white/20 border-none text-white hover:bg-white/40">✕</label>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 bg-white rounded-[2rem] overflow-hidden shadow-2xl shrink-0">
                <img 
                  src={plan.image ? `${BaseUrl}/${plan.image}` : ""} 
                  className="w-full h-full object-cover" 
                  alt="Plan"
                />
              </div>
              <div className="text-center md:text-left">
                <span className="bg-blue-400/30 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Premium Membership</span>
                <h1 className="text-4xl font-black mt-2 italic uppercase tracking-tighter leading-none">{plan.planname}</h1>
                <p className="mt-4 text-blue-100 font-medium max-w-md">
                  Reduces your medical expenses and get unlimited chat access with our expert doctors.
                </p>
                <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
                   <h2 className="text-3xl font-black">₹{plan.amount}</h2>
                   <span className="text-blue-200 line-through text-sm">₹{plan.offerAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="p-8 md:p-12 bg-slate-50">
            <h3 className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Exclusive Benefits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Benefit 1 */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 font-bold italic">%</div>
                <div>
                  <h4 className="font-bold text-slate-800">Extra Savings</h4>
                  <p className="text-xs text-slate-500 mt-1">Get an extra {plan.description} discount on all medical consultations.</p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shrink-0 italic font-bold">Chat</div>
                <div>
                  <h4 className="font-bold text-slate-800">Doctor Chat</h4>
                  <p className="text-xs text-slate-500 mt-1">Unlimited real-time chat support with our specialized doctors.</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-10 flex flex-col items-center">
              {userPlan && userPlan.length === 1 && moment(userExpPlan).isAfter(today) ? (
                <button className="w-full md:w-64 py-4 bg-slate-200 text-slate-500 font-black text-xs uppercase tracking-widest rounded-2xl cursor-not-allowed">
                  Plan Already Active
                </button>
              ) : (
                <button 
                  onClick={handleSumit}
                  className="w-full md:w-64 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-xl"
                >
                  Activate Now
                </button>
              )}
              <p className="mt-4 text-[9px] text-slate-400 font-bold uppercase tracking-widest">Secure Payment Powered by Razorpay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanDetails;