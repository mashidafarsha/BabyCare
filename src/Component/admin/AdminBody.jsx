import React, { useState } from "react";
import { useEffect } from "react";
import {
  getApprovedDoctor,
  getAllUserData,
  getPlans,
  AllBookingDataForChart,
} from "../../sevices/adminApi";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

function AdminBody() {
  const [doctorCount, setDoctorCount] = useState("");
  const [userCount, setUserCount] = useState("");
  const [cancelBooking, setCancelBooking] = useState("");
  const [activeBooking, setActiveBooking] = useState("");
  const [plansData, setPlansData] = useState([]);
  useEffect(() => {
    getAllDoctor();
    getAllUser();
    getAllPlans();
    getAllBooking();
  }, []);
  const getAllDoctor = async () => {
    try {
      let { data } = await getApprovedDoctor();

      if (data.success) {
        setDoctorCount(data.doctors.length);
      }
      console.log(doctorCount);
    } catch {}
  };

  const getAllUser = async () => {
    try {
      let { data } = await getAllUserData();

      if (data.success) {
        setUserCount(data.user.length);
      }
      console.log(userCount);
    } catch {}
  };

  const getAllPlans = async () => {
    try {
      let { data } = await getPlans();
      console.log(data);
      if (data.success) {
        setPlansData(data.plans);
      }
    } catch {}
  };

  const getAllBooking = async () => {
    try {
      let { data } = await AllBookingDataForChart();
      console.log(data);
      if (data.success) {
        setCancelBooking(data.cancelBooking);
        setActiveBooking(data.activeBooking);
      }
    } catch {}
  };

  const bookingCount = {
    labels: ["Active Booking", "Cancel Booking"],
    datasets: [
      {
        label: "# of Votes",
        data: [activeBooking, cancelBooking],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartData = {
    labels: plansData?.map((ele) => ele?.planname.toUpperCase()),
    datasets: [
      {
        label: "plan using user count",
        data: plansData?.map((ele) => ele?.user?.length || 0),

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            weight: "bold",
            color: "black",
          },
        },
      },
    },
  };

  return (
    <>
      <div className="flex min-h-screen mx-auto overflow-x-hidden bg-sky-900 max-w-screen-2xl">
        <div className="w-full overflow-clip">
          <p className="w-full p-3 my-5 font-bold text-center uppercase bg-white">
            WELCOME ADMIN
          </p>
          <div className="">
            <div className="flex flex-col items-center justify-center pt-5 uppercase md:flex-row md:justify-around">
              <div className="flex flex-col justify-center p-5 my-3 text-center text-white bg-dark-purple w-72 h-28 md:w-72 md:h-32 rounded-xl">
                <div className="text-xl font-bold">total patients</div>
                <div className="font-semibold">{userCount}</div>
              </div>
              <div className="flex flex-col justify-center p-5 my-3 text-center text-white bg-dark-purple w-72 h-28 md:w-72 md:h-32 rounded-xl">
                <div className="text-xl font-bold">total doctors</div>
                <div className="font-semibold">{doctorCount}</div>
              </div>
            </div>

            <div className="flex flex-col min-h-full pb-10 bg-white md:flex-row">
              <div className="mx-auto mt-5 w-72 h-72">
                <p className="text-lg font-bold text-center uppercase">
                  Month Booking Status
                </p>
                <div className="mx-auto w-60 h-60">
                  <Pie data={bookingCount} options={options} />
                </div>
              </div>
              <div className="mx-auto mt-5 w-72 h-72">
                <p className="text-lg font-bold text-center uppercase">
                  Total Plan
                </p>
                <div className="mx-auto w-60 h-60">
                  <Doughnut data={chartData} options={options} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminBody;
