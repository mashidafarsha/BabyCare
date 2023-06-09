import React, { useEffect, useState } from "react";
import {
  getPlans,
  getUserPlanDetails,
  SlotBookingRazorpay,
  verifySlotPayment,
} from "../../sevices/userApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function SlotBookingAddress({ doctorData, userSelectTime }) {
  const [doctorId, setDoctorId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorDep, setDoctorDep] = useState("");
  const [planData, setPlanData] = useState([]);
  const [consultationFee, setConsultationFee] = useState("");

  const [totalAmount, setTotalAmount] = useState("");
  const [discount, setDiscount] = useState("");

  const navigate=useNavigate()
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
    
      if (data.success) {
        setPlanData(data.plans);
      }
    } catch {}
  };

  const getPlanDetails = async () => {
  if(consultationFee){
    let { data } = await getUserPlanDetails(consultationFee);
    console.log(data);
    if (data.success) {
      setTotalAmount(data.totalDiscount);
      setDiscount(data.discount);
    } else if(data.success==false){

      setTotalAmount(data.consultationFee)
      setDiscount("");
     
    }
  }
   
  };


  const checkoutHandler = async () => {
    let { data } = await SlotBookingRazorpay(totalAmount);
    if (data.datas) {
      paymentPage(data.datas);
    }
  };

  const paymentPage = (data) => {
   

    let options = {
      key: `rzp_test_LSJeDQEzbT9qcg`,
      amount: data.amount,
      currency: data.currency,
      name: "Buy your Slot",
      // description: description,
      // image: image,
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
              title: `${data.message}`,
              // icon: 'info',
              html:
                "You can use <b>show the booking Details</b>, " +
                '<a href="//sweetalert2.github.io">Click Here</a> ',
              // showCloseButton: true,
              // showCancelButton: true,
              focusConfirm: false,
            });
          }
        } catch (error) {
          Swal.fire({
            title: `${data.message}`,
            // icon: 'info',
            html:
              "You can use <b>show the booking Details</b>, " +
              '<a href="//sweetalert2.github.io">Click Here</a> ',
            // showCloseButton: true,
            // showCancelButton: true,
            focusConfirm: false,
          });
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.open();
  };
  
  return (
    <div>
      <div>
        <h1 className="text-bold font-xl">CHECKOUT</h1>
        <hr className="my-3 border-t-2 border-gray-400 " />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="h-auto text-center sm:w-full bg-slate-300">
          <img
            src={
              doctorData.image
                ? `http://localhost:4000/${doctorData.image}`
                : ""
            }
            className="rounded-lg shadow-2xl w-52 h-52"
          />
          <h1 className="text-2xl font-bold">Dr: {doctorData.name}</h1>
          <hr className="my-3 border-t-2 border-gray-400 " />
          <h1 className="font-medium text-indigo-900">
            {doctorData.department} | {doctorData.experience}
          </h1>

          <div className="m-12">
            <h1>Appointment Details</h1>
            <hr className="my-3 border-t-2 border-gray-400 " />
            <h1>Hospital consultation</h1>
            <h1>{userSelectTime}</h1>
          </div>
        </div>
        <div className="w-full">
          <div className="">
            <h1 className="ml-12">PATIENT DETAILS</h1>
            <hr className="my-3 ml-10 border-t-2 border-gray-400 " />
            <p className="ml-12">Who is the patient?</p>
            <p className="ml-12">
              Make sure to add valid patient details, it will be reflected on
              Prescription and Invoice
            </p>
            <button className="mt-5 ml-12 btn bg-success">
              Add Patient Details
            </button>
          </div>
          <div className="m-7">
            <h1>Do you want any plan?</h1>
            {planData &&
              planData.map((plan, idex) => {
                return (
                 
                  <button className="m-5 w-28" onClick={()=>navigate('/plans')}>
                    <img
                      className="w-24 h-20 rounded-full"
                      src={
                        plan.image ? `http://localhost:4000/${plan.image}` : ""
                      }
                      alt=""
                      
                    />
                    <h1>{plan.planname}</h1>
               
                  </button>
                );
              })}
          </div>
          <div className="h-auto mt-9">
            <h1 className="ml-12">TOTAL CHARGES</h1>
            <hr className="my-3 ml-10 border-t-2 border-gray-400 " />
            <div className="w-full h-10 ">
              <h1 className="float-left ml-12">Consutation Fee</h1>
              <h1 className="float-right mr-9">{doctorData.consultationFee}</h1>
            </div>
          
              <div className="w-full h-10 ">
                <h1 className="float-left ml-12">Plan Discount</h1>
                <h1 className="float-right mr-9">{discount}</h1>
              </div>
     

            <div>
              <h1 className="float-left ml-12">Total Amount</h1>
              {totalAmount !== null ? (
    <h1 className="float-right mr-9">{totalAmount}</h1>
  ) : (
    <h1 className="float-right mr-9">Loading...</h1>
  )}
                
          
                {/* <h1 className="float-right mr-9">{consultationFee}</h1> */}
           
            </div>
          </div>
          <div className="float-right mt-12 ">
            <button type="submit" onClick={checkoutHandler} className="btn">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlotBookingAddress;
