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
      console.log("Checkout started...");
      
      // API call - await cheyyan marakkalle
      const response = await SlotBookingRazorpay(totalAmount); 
      console.log("Backend Response:", response.data);
  
      if (response.data.success && response.data.datas) {
        paymentPage(response.data.datas);
      } else {
        Swal.fire("Error", "Could not initiate payment. Try again.", "error");
      }
    } catch (error) {
      console.error("Axios Error:", error);
      Swal.fire("Error", "Server connection failed", "error");
    }
  };

  const paymentPage = (data) => {
    let options = {
      key: `rzp_test_SBnlzMmVLtySb7`,
      amount: data.amount,
      currency: data.currency,
      name: "MediCare Slot Booking",
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
              title: "Booking Successful!",
              text: "Your appointment has been confirmed.",
              confirmButtonColor: "#2563eb",
            }).then(() => navigate("/userProfile"));
          }
        } catch (error) {
          Swal.fire({ icon: "error", title: "Payment Failed" });
        }
      },
      theme: { color: "#2563eb" },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 uppercase italic">Checkout</h1>
        <div className="h-1.5 w-16 bg-blue-600 rounded-full mt-2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Doctor & Appointment Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-lg border-4 border-slate-50 mb-4">
              <img
                src={doctorData.image ? `${BaseUrl}/${doctorData.image}` : ""}
                className="w-full h-full object-cover"
                alt="Doctor"
              />
            </div>
            <h2 className="text-xl font-bold text-slate-800 uppercase">Dr. {doctorData.name}</h2>
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">{doctorData.department}</p>
            
            <div className="w-full mt-6 pt-6 border-t border-slate-50">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Appointment Slot</p>
              <div className="bg-blue-50 p-4 rounded-2xl">
                 <p className="text-sm font-bold text-blue-700">{userSelectTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Patient & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Patient Section */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-black text-slate-800 uppercase italic">Patient Details</h2>
              <button className="text-xs bg-blue-600 text-white px-4 py-2 rounded-full font-bold hover:bg-slate-900 transition-all">
                + Add Patient
              </button>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Make sure to add valid patient details. These will reflect on your prescription and invoice.
            </p>
          </div>

          {/* Plans Section */}
       {/* Plans Section */}
<div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
  <h2 className="text-lg font-black text-slate-800 uppercase italic mb-6">
    {discount > 0 ? "Your Active Plan" : "Available Health Plans"}
  </h2>
  
  <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
    {discount > 0 ? (
   
      <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl w-full">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-200 p-1 bg-white">
        
          <img 
            src={planData[0]?.image ? `${BaseUrl}/${planData[0].image}` : ""} 
            className="w-full h-full object-cover rounded-full" 
          />
        </div>
        <div>
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Active Plan Applied</p>
          <h3 className="text-sm font-bold text-slate-800 uppercase">You saved ₹{discount} on this booking!</h3>
        </div>
      </div>
    ) : (

      planData.map((plan, idx) => (
        <div key={idx} onClick={() => navigate('/plans')} className="flex-shrink-0 cursor-pointer group text-center w-24">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-slate-100 group-hover:border-blue-500 transition-all p-1">
            <img src={plan.image ? `${BaseUrl}/${plan.image}` : ""} className="w-full h-full object-cover rounded-full" />
          </div>
          <p className="text-[10px] font-bold text-slate-600 mt-2 truncate uppercase">{plan.planname}</p>
        </div>
      ))
    )}
  </div>
</div>

          {/* Bill Summary */}
          <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
            <h2 className="text-lg font-black uppercase italic mb-6">Charge Breakdown</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Consultation Fee</span>
                <span className="text-white">₹{consultationFee}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Plan Discount</span>
                <span className="text-green-400">- ₹{discount || 0}</span>
              </div>
              <div className="h-px bg-slate-800 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold uppercase italic">Total Amount</span>
                <span className="text-3xl font-black text-blue-400">₹{totalAmount}</span>
              </div>
            </div>
            <button 
              onClick={checkoutHandler} 
              className="w-full mt-8 bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black uppercase tracking-widest transition-all transform active:scale-95 shadow-lg shadow-blue-900/20"
            >
              Confirm & Pay Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SlotBookingAddress;