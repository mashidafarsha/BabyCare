import React, { useEffect, useState } from "react";
import {
  getPlans,
  getUserPlanDetails,
  SlotBookingRazorpay,
  verifySlotPayment,
} from "../../sevices/userApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../constants/constants";
import { ShieldCheck, CreditCard, Receipt, UserPlus, Zap, ArrowRight, Activity, Calendar, Lock, Sparkles, Fingerprint } from "lucide-react";

function SlotBookingAddress({ doctorData, userSelectTime }) {
  const [doctorId, setDoctorId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorDep, setDoctorDep] = useState("");
  const [planData, setPlanData] = useState([]);
  const [consultationFee, setConsultationFee] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [discount, setDiscount] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setDoctorName(doctorData?.name);
    setDoctorDep(doctorData?.department);
    setDoctorId(doctorData?._id);
    setConsultationFee(doctorData?.consultationFee);
    getAllPlans();
  }, [doctorData]);

  useEffect(() => {
    getPlanDetails();
  }, [consultationFee]);

  const getAllPlans = async () => {
    try {
      let { data } = await getPlans();
      if (data.success) setPlanData(data.plans);
    } catch (err) {}
  };

  const getPlanDetails = async () => {
    if (consultationFee) {
      let { data } = await getUserPlanDetails(consultationFee);
      if (data.success) {
        setTotalAmount(data.totalDiscount);
        setDiscount(data.discount);
      } else {
        setTotalAmount(consultationFee);
        setDiscount(0);
      }
    }
  };

  const checkoutHandler = async () => {
    try {
      const response = await SlotBookingRazorpay(totalAmount); 
      if (response.data.success && response.data.datas) {
        paymentPage(response.data.datas);
      } else {
        Swal.fire({
           title: "Initialization Error",
           text: "Could not establish a secure payment tunnel. Please retry.",
           icon: "error",
           background: "#0f172a",
           color: "#f8fafc",
           customClass: { popup: 'rounded-[2rem]' }
        });
      }
    } catch (error) {
      Swal.fire({
         title: "Connection Timed Out",
         text: "Institutional payment matrix is temporarily unreachable.",
         icon: "error",
         background: "#0f172a",
         color: "#f8fafc",
         customClass: { popup: 'rounded-[2rem]' }
      });
    }
  };

  const paymentPage = (data) => {
    let options = {
      key: `rzp_test_SBnlzMmVLtySb7`,
      amount: data.amount,
      currency: data.currency,
      name: "TRUE CARE SYSTEMS",
      description: "Clinical Allocation Protocol Fee",
      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await verifySlotPayment(
            response,
            userSelectTime,
            totalAmount,
            doctorId,
            doctorName,
            doctorDep
          );
          if (data.success) {
            Swal.fire({
              icon: "success",
              title: "Protocol Confirmed!",
              text: "Clinical slot has been successfully allocated in the global registry.",
              background: "#0f172a",
              color: "#f8fafc",
              confirmButtonColor: "#2563eb",
              customClass: { popup: 'rounded-[2rem]' }
            }).then(() => navigate("/myAppointment"));
          }
        } catch (error) {
          Swal.fire({ 
             icon: "error", 
             title: "Transaction Revoked",
             background: "#0f172a",
             color: "#f8fafc",
             customClass: { popup: 'rounded-[2rem]' }
          });
        }
      },
      theme: { color: "#0f172a" },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      
      {/* Cinematic Stepper/Breadcrumb */}
      <div className="flex items-center gap-6 mb-12">
         <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white font-black text-[9px] uppercase tracking-widest italic border border-white/5">
            <span className="text-blue-500">Node 01:</span> Allocation
         </div>
         <div className="h-px flex-1 bg-slate-100"></div>
         <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white font-black text-[9px] uppercase tracking-widest italic shadow-2xl shadow-blue-500/20">
            <span className="text-white/60">Node 02:</span> Authentication
         </div>
         <div className="h-px w-12 bg-slate-100"></div>
         <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic opacity-50">Node 03: Finalization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* Left Column: Clinical Dossier Extract */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden group">
             {/* Abstract Grid Backdrop */}
             <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,0,0.06),rgba(0,0,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
             
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-40 h-40 rounded-[2.8rem] overflow-hidden border-4 border-white/10 shadow-2xl relative mb-10 group-hover:scale-105 transition-all duration-700">
                  <img
                    src={doctorData?.image || doctorData?.imageUrl || "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    alt={`Dr. ${doctorData?.name || "Specialist"}`}
                  />
                  <div className="absolute inset-0 bg-blue-600/10"></div>
                </div>

                <div className="w-full text-center space-y-3">
                   <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] italic leading-none">Practitioner Credentials</p>
                   <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">Dr. {doctorData.name}</h2>
                   <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest underline decoration-blue-600 underline-offset-4 decoration-2">{doctorData.department} Specialization</p>
                </div>

                <div className="w-full mt-12 pt-8 border-t border-white/5 space-y-6">
                   <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2 text-blue-500">
                         <Calendar size={14} />
                         <span className="text-[9px] font-black uppercase tracking-widest italic">Temporal Allocation</span>
                      </div>
                      <p className="text-sm font-black text-slate-200 text-center uppercase italic tracking-tight">{userSelectTime}</p>
                   </div>
                   
                   <div className="flex items-center justify-center gap-3 opacity-40">
                      <ShieldCheck size={14} className="text-blue-500" />
                      <span className="text-[8px] font-black uppercase tracking-widest">Cross-Verified Registry</span>
                   </div>
                </div>
             </div>
             
             {/* Background Bio detail */}
             <div className="absolute bottom-[-5%] left-[-5%] text-[140px] font-black text-white/5 italic leading-none select-none">DOC</div>
          </div>
        </div>

        {/* Right Column: Authentication & Financial Terminal */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Patient Specification Hub */}
          <div className="bg-white rounded-[3.5rem] p-10 lg:p-14 border border-slate-100 shadow-sm relative overflow-hidden group/patient">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-slate-900 group-hover/patient:scale-110 transition-transform duration-1000">
               <Fingerprint size={120} />
            </div>
            
            <div className="relative z-10">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Subject <span className="text-blue-600">Registry</span></h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">Verified identity for clinical interaction</p>
                 </div>
                 <button className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200 italic">
                   <UserPlus size={14} /> Add Peripheral Subject
                 </button>
               </div>
               
               <p className="text-slate-500 text-xs font-bold leading-relaxed border-l-4 border-slate-100 pl-8 italic max-w-lg">
                 Ensure provided data corresponds with institutional identity records. Clinical prescriptions and financial documentation will synchronize with this subject profile.
               </p>
            </div>
          </div>

          {/* Health Tier Deployment */}
          <div className="bg-slate-50 border border-slate-100 rounded-[3.5rem] p-10 lg:p-14 relative overflow-hidden group/plans">
             <div className="absolute top-0 right-[-10%] w-64 h-64 bg-blue-600/5 rounded-full blur-[100px]"></div>
             
             <div className="relative z-10">
                <h2 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter mb-10 flex items-center gap-3">
                  <Sparkles size={20} className="text-blue-600" />
                  {discount > 0 ? "Institutional Subsidy Active" : "Diagnostic Benefit Tiers"}
                </h2>
                
                <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                  {discount > 0 ? (
                    <div className="flex items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-blue-100 w-full shadow-inner hover:shadow-2xl transition-all group/active">
                      <div className="w-20 h-20 rounded-[1.8rem] overflow-hidden border-2 border-blue-200 p-1.5 bg-blue-50 shrink-0 group-hover/active:rotate-12 transition-transform">
                        <img 
                          src={planData[0]?.image || "https://cdn-icons-png.flaticon.com/512/2966/2966427.png"} 
                          alt="Applied Institutional Plan"
                          className="w-full h-full object-cover rounded-[1.2rem] grayscale group-hover/active:grayscale-0 transition-all" 
                        />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest mb-2 italic">Applied Protocol</div>
                        <h3 className="text-lg font-black text-slate-800 uppercase italic tracking-tighter leading-tight">Subsidy of ₹{discount} successfully synchronized for this encounter.</h3>
                      </div>
                    </div>
                  ) : (
                    planData.map((plan, idx) => (
                      <div key={idx} onClick={() => navigate('/plans')} className="flex-shrink-0 cursor-pointer group/node text-center w-28 space-y-4">
                        <div className="w-24 h-24 mx-auto rounded-[2.2rem] overflow-hidden border-2 border-slate-200 bg-white group-hover/node:border-blue-600 transition-all p-1.5 transform group-hover/node:scale-105 shadow-sm">
                          <img src={plan.image || "https://cdn-icons-png.flaticon.com/512/2966/2966427.png"} alt={`${plan.planname} Diagnostic Plan`} className="w-full h-full object-cover rounded-[1.8rem] grayscale group-hover/node:grayscale-0 transition-all duration-700" />
                        </div>
                        <p className="text-[9px] font-black text-slate-400 group-hover/node:text-blue-600 transition-colors truncate uppercase tracking-widest">{plan.planname}</p>
                      </div>
                    ))
                  )}
                </div>
             </div>
          </div>

          {/* Financial Ledger Module */}
          <div className="bg-slate-900 text-white p-12 lg:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden group/pay">
            <div className="absolute top-0 right-0 p-16 opacity-10 text-white group-hover/pay:rotate-12 transition-transform duration-1000">
               <Receipt size={160} />
            </div>
            
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-10">
                  <Receipt size={24} className="text-blue-600" />
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter">Charge <span className="text-blue-600">Ledger</span></h2>
               </div>
               
               <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <Activity size={14} className="text-slate-600" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Service Allocation</span>
                    </div>
                    <span className="text-lg font-black tracking-tighter italic">₹{consultationFee}</span>
                 </div>
                 
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <Zap size={14} className="text-green-600" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Institutional Subsidy</span>
                    </div>
                    <span className="text-lg font-black tracking-tighter italic text-green-400">- ₹{discount || 0}</span>
                 </div>
                 
                 <div className="h-px bg-white/5 my-8"></div>
                 
                 <div className="flex justify-between items-end">
                    <div className="space-y-1">
                       <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] italic">Consolidated Total</p>
                       <span className="text-sm font-black text-blue-600 uppercase italic">Institutional Level III</span>
                    </div>
                    <span className="text-5xl font-black text-white italic tracking-tighter leading-none">₹{totalAmount}</span>
                 </div>
               </div>

               <button 
                 onClick={checkoutHandler} 
                 className="group/btn relative overflow-hidden w-full mt-12 bg-blue-600 text-white py-6 rounded-[2.2rem] font-black text-[11px] uppercase tracking-[0.4em] italic shadow-2xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-4"
               >
                 <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                 <span className="relative z-10 group-hover/btn:text-slate-900">Authorize Payment Protocol</span>
                 <CreditCard size={18} className="relative z-10 group-hover/btn:text-slate-900 group-hover/btn:rotate-12 transition-all" />
               </button>
               
               <div className="mt-8 flex items-center justify-center gap-4 opacity-30">
                  <Lock size={12} />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">PCI-DSS Level 1 Compliant Encryption</span>
               </div>
            </div>
            
            {/* Tactical grid overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,0,0.06),rgba(0,0,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SlotBookingAddress;