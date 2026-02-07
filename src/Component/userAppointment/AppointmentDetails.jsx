import React, { useEffect, useState } from "react";
import { userBookingData, cancelUserSlot } from "../../sevices/userApi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function AppointmentDetails() {
  const [bookingDatas, setBookingDatas] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getBookingDetails();
  }, [load]);

  const handleLoad = () => {
    setLoad(!load);
  };

  const getBookingDetails = async () => {
    let { data } = await userBookingData();
    if (data.success) {
      setBookingDatas(data.bookingData);
    }
  };

  const cancelBooking = async (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let { data } = await cancelUserSlot(bookingId);
        if (data.success) {
          Swal.fire("Cancelled!", "Your appointment has been cancelled.", "success");
          handleLoad();
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 mt-10">
          <h1 className="text-2xl font-black text-slate-800 uppercase italic tracking-wide">
            My Appointments
          </h1>
          <div className="h-1 w-20 bg-blue-600 rounded-full mt-1"></div>
        </div>

        <div className="space-y-6">
          {bookingDatas && bookingDatas.length > 0 ? (
            bookingDatas.map((booking, index) => (
              <div 
                key={index} 
                className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Status Bar */}
                <div className={`px-6 py-2 flex justify-between items-center ${booking.status === 'Cancel' ? 'bg-red-50' : 'bg-blue-50'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${booking.status === 'Cancel' ? 'text-red-600' : 'text-blue-600'}`}>
                    {booking.status}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Slot: {booking.bookingTime}
                  </span>
                </div>

                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Doctor Info */}
                  <div className="space-y-2">
                    <p className="text-blue-600 font-black text-[10px] uppercase tracking-tighter italic">Hospital Consultation</p>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                      Dr. {booking.DoctorName}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-widest text-[10px]">
                      {booking.DoctorDepartment}
                    </p>
                  </div>

                  {/* Patient Info */}
                  <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Patient Name</p>
                    <p className="text-sm font-bold text-slate-700 uppercase tracking-tighter">
                      Mashida Farsha
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center">
                    {booking.status === "Cancel" ? (
                      <Link 
                        to={'/department'}
                        className="w-full md:w-auto text-center bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95"
                      >
                        Book Again
                      </Link>
                    ) : (
                      <button
                        onClick={() => cancelBooking(booking._id)}
                        className="w-full md:w-auto bg-white border-2 border-red-100 text-red-500 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-95"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No appointments found</p>
              <Link to="/department" className="text-blue-600 font-black uppercase text-xs mt-4 inline-block underline italic">Book your first slot</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;