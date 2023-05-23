import React, { useEffect, useState } from "react";
import { RazorPayPayment, verifyPayment } from "../../sevices/userApi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import moment from "moment";
function PlanDetails({ plan }) {
  const [id, setId] = useState("");
  const [planname, setPlanname] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [offerAmount, setOffferAmount] = useState("");
  const [image, setImage] = useState("");
  const [userPlan, setUserPlan] = useState([]);
  const [userExpPlan, setUserExpPlan] = useState();
  let { user } = useSelector((state) => state.user);
  useEffect(() => {
    setId(plan?._id);
    setPlanname(plan?.planname);
    setDescription(plan?.description);
    setAmount(plan?.amount);
    setOffferAmount(plan?.offerAmount);
    setImage(plan?.image);

    setUserPlan(user.plans);
    setUserExpPlan(moment(user.planExpDate));
  }, [plan,user]);
  console.log(user,"user");
  const today = moment();
  const handleSumit = async () => {
    try {
      // if(userPlan.length>0){
      //   Swal.fire("This User have already one plan")

      // }else{
      let { data } = await RazorPayPayment(id, amount);
      console.log(data.datas);
      if (data.datas) {
        paymentPage(data.datas);
      }
      // }
    } catch {}
  };

  const paymentPage = (data) => {
    console.log(data, "wwwwwwwwwww");
    console.log(planname, "hhhh");
    let options = {
      key: `rzp_test_LSJeDQEzbT9qcg`,
      amount: data.amount,
      currency: data.currency,
      name: planname,
      description: description,
      // image: image,
      order_id: data.id,
      handler: async (response) => {
        console.log("dddddddddddd");
        try {
          const { data } = await verifyPayment(response, id);
          console.log(data);
          if (data.success) {
            Swal.fire({
              title: `${data.message}`,

              focusConfirm: false,
            });
          } else {
            Swal.fire({
              title: "Payment Failed",
              text: "Payment submission failed.",
              icon: "error", // Set the icon to display as an error
              focusConfirm: false,
            });
            return;
          }
        } catch (error) {
       
          Swal.fire({
            title: "Payment Failed",
            text: "Payment submission failed.",
            icon: "error", // Set the icon to display as an error
            focusConfirm: false,
          });
          return ;
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.open();
  
  };

  const alreadyPlanMessage = () => {
    Swal.fire("This User Have  Plan");
  };
  return (
    <div>
      <input type="checkbox" id="plan-modal" className="modal-toggle" />
      <div className="modal">
        <div className="w-11/12 h-screen max-w-5xl modal-box">
          <label
            htmlFor="plan-modal"
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            ✕
          </label>

          <div className=" hero bg-base-200">
            <div className="flex-col hero-content lg:flex-row-reverse">
              <img
                src={plan.image ? `http://localhost:4000/${image}` : ""}
                className="w-56 rounded-lg shadow-2xl "
              />
              <div>
                <h1 className="font-bold bg-red-400 border-none btn cursor-text">
                  {planname}
                </h1>
                <h1 className="text-2xl font-bold ">
                  Reduces Your Medical Expenses And Chat With Your Doctor
                </h1>
                <p className="py-3 font-normal">
                  Save for the things that make you Happy
                </p>
                {userPlan && userPlan.length == 1 && moment(userExpPlan).isAfter(today) ?   (
                  <button
                    type="submit"
                    onClick={alreadyPlanMessage}
                    className="mt-3 btn btn-primary rounded-3xl"
                  >
                    Buy Plans
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={handleSumit}
                    className="mt-3 btn btn-primary rounded-3xl"
                  >
                    Buy Plans
                  </button>
                )}

                <h1 className="mt-3 ml-2 text-base font-semibold">
                  Pay Only Rs{amount}
                </h1>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-3 text-center">
              <h1 className="text-3xl font-semibold">Benifits</h1>
            </div>
          </div>
          <div className="inline-flex">
            <div className="w-4/6 h-auto bg-slate-300 m-14 ">
              <img src="" alt="" />
              <div>
                <h1 className="font-bold">Get Extra {description}</h1>

                <h1>
                  Guaranteed savings over &amp; above promotional offers.
                  <br /> Extra {description}.
                </h1>
              </div>
            </div>
            <div className="w-4/6 h-auto bg-slate-300 m-14 ">
              <img src="" alt="" />
              <div>
                <h1 className="font-bold">Get Extra {description}</h1>

                <h1>
                  Guaranteed savings over &amp; above promotional offers.
                  <br /> Extra {description}.
                </h1>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <label htmlFor="plan-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanDetails;
