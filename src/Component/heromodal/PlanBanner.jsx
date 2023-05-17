import React, { useState, useEffect } from "react";
import { getPlans } from "../../sevices/userApi";
import { Link } from "react-router-dom";
function PlanBanner() {
  const [plansData, setPlansData] = useState([]);

  useEffect(() => {
    getAllPlans();
  }, []);

  const getAllPlans = async () => {
    console.log("tttttttt");
    try {
      let { data } = await getPlans();
      console.log(data, "ttttttttteeeeeeeeeeeet");
      if (data.success) {
        setPlansData(data.plans);
      }
    } catch {}
  };
  return (
    <div className="m-4 mx-auto shadow-2xl ">
      <div className="carousel rounded-2xl">
        {plansData.map((plan,index) => {
          return (
            <div
            key={plan.id}
            id={`plan${index + 1}`}
            className="relative w-full carousel-item h-fit"
            >
                <div className="min-h-full hero bg-base-200">
                  <div className="flex-col hero-content lg:flex-row-reverse">
                    <img
                      src={
                        plan.image ? `http://localhost:4000/${plan.image}` : ""
                      }
                      className="w-56 rounded-lg shadow-2xl "
                    />
                    <div className="p-28">
                      <h1 className="text-5xl font-bold uppercase ">{plan.planname}</h1>
                      <p className="py-6 font-bold">{plan.description}</p>
                      <button className="btn btn-primary">
                        <Link to={"/plans"}>Get All Details</Link>
                      </button>
                    </div>
                  </div>
                </div>

              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#plan${index}`} className="btn btn-circle">
                  ❮
                </a>
                <a href={`#plan${index + 2}`} className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlanBanner;
