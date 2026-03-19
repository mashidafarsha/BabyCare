import React, { useEffect, useState } from "react";
import { userBookingData, cancelUserSlot, getQueueStatus } from "../../sevices/userApi";
import { Users, Clock, Calendar, CheckCircle, XCircle, RefreshCw, Star, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ReviewModal from "./ReviewModal";

function AppointmentDetails() {
  const [bookingDatas, setBookingDatas] = useState([]);
  const [load, setLoad] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  // Track locally which bookings have been reviewed this session
  const [reviewedBookings, setReviewedBookings] = useState(new Set());

  useEffect(() => {
    getBookingDetails();
    const interval = setInterval(getBookingDetails, 60000); 
    return () => clearInterval(interval);
  }, [load]);

  const handleLoad = () => {
    setLoad(!load);
  };

  const getBookingDetails = async () => {
    setIsSyncing(true);
    try {
      let { data } = await userBookingData();
      if (data.success) {
        const sortedData = data.bookingData.sort((a, b) => new Date(b.bookingTime) - new Date(a.bookingTime));
        setBookingDatas(sortedData);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setTimeout(() => setIsSyncing(false), 500);
    }
  };

  const cancelBooking = async (bookingId) => {
    Swal.fire({
      title: "Cancel Appointment?",
      text: "Are you sure you want to cancel this appointment? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, Keep it",
      customClass: {
         popup: 'rounded-2xl',
         confirmButton: 'rounded-xl font-bold px-6 py-3',
         cancelButton: 'rounded-xl font-bold px-6 py-3'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        let { data } = await cancelUserSlot(bookingId);
        if (data.success) {
          Swal.fire({
             title: "Cancelled",
             text: "Your appointment has been cancelled successfully.",
             icon: "success",
             timer: 2000,
             showConfirmButton: false,
             customClass: { popup: 'rounded-2xl' }
          });
          handleLoad();
        }
      }
    });
  };

  const QueueStatus = ({ bookingId, status }) => {
    const [queuePosition, setQueuePosition] = useState(null);

    useEffect(() => {
      const normalizedStatus = status?.toLowerCase();
      if (["active", "confirmed", "paid", "pending"].includes(normalizedStatus)) {
        const fetchStatus = async () => {
          try {
            const { data } = await getQueueStatus(bookingId);
            if (data.success) {
              setQueuePosition(data.position);
            }
          } catch (err) {}
        };
        fetchStatus();
        const interval = setInterval(fetchStatus, 30000);
        return () => clearInterval(interval);
      }
    }, [bookingId, status]);

    if (!queuePosition || ["completed", "cancel", "consulted"].includes(status?.toLowerCase())) return null;

    return (
      <div className="mt-6 bg-blue-50/50 border border-blue-100 p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-blue-100">
              #{queuePosition}
           </div>
           <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-0.5">Queue Status</p>
              <p className="text-sm font-medium text-slate-600">Approx. {queuePosition * 10} mins wait</p>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Updates</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-slate-100 pb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Appointment History</h1>
            <p className="text-slate-500 text-lg max-w-xl">Keep track of your healthcare journey and manage your upcoming consultations.</p>
          </div>
          <button 
            onClick={getBookingDetails}
            className={`p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all ${isSyncing ? "opacity-50" : ""}`}
          >
            <RefreshCw size={24} className={`text-slate-600 ${isSyncing ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* List */}
        <div className="space-y-8">
          {bookingDatas && bookingDatas.length > 0 ? (
            bookingDatas.map((booking, index) => {
              const status = booking.status?.toLowerCase();
              const isCompleted = ["completed", "consulted"].includes(status);
              const isCancelled = ["cancel", "revoked"].includes(status);
              // Check if this booking has already been reviewed
              const hasReviewed = reviewedBookings.has(booking._id) || booking.isReviewed;

              return (
                <div key={index} className="bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 border border-slate-100">
                        <Users size={32} />
                      </div>
                      <div className="space-y-2">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isCancelled ? 'bg-red-50 text-red-600' : isCompleted ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {status}
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Dr. {booking.DoctorName}</h2>
                        <p className="text-sm font-medium text-slate-500">{booking.DoctorDepartment}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 lg:border-l lg:border-slate-100 lg:pl-10">
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-blue-600" />
                        <span className="text-sm font-bold text-slate-700">{booking.bookingTime}</span>
                      </div>
                      
                      <div className="w-full sm:w-auto flex gap-3">
                        {isCompleted ? (
                          hasReviewed ? (
                            // Already reviewed — show a green badge, no button
                            <div className="flex items-center gap-2 px-5 py-3 bg-green-50 text-green-600 rounded-xl border border-green-100">
                              <CheckCircle size={16} />
                              <span className="text-sm font-bold">Reviewed</span>
                            </div>
                          ) : (
                            // Not yet reviewed — show Leave Review button
                            <button 
                              onClick={() => {
                                setSelectedBooking(booking);
                                setIsReviewOpen(true);
                              }}
                              className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95"
                            >
                              <Star size={16} /> Leave Review
                            </button>
                          )
                        ) : !isCancelled && (
                          <button
                            onClick={() => cancelBooking(booking._id)}
                            className="flex-1 sm:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                          >
                            <XCircle size={16} /> Cancel
                          </button>
                        )}
                      </div>
                    </div>

                  </div>

                  <QueueStatus bookingId={booking._id} status={booking.status} />
                </div>
              );
            })
          ) : (
            <div className="py-32 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
               <Calendar size={48} className="text-slate-200 mx-auto mb-6" />
               <h3 className="text-xl font-bold text-slate-900 mb-2">No appointments yet</h3>
               <p className="text-slate-500 mb-8">Ready to book your first consultation?</p>
               <Link to="/department" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all inline-flex items-center gap-2">
                 Browse Specialties <ArrowRight size={18} />
               </Link>
            </div>
          )}
        </div>
      </div>

      {selectedBooking && (
        <ReviewModal 
          isOpen={isReviewOpen}
          onClose={() => {
            setIsReviewOpen(false);
            setSelectedBooking(null);
          }}
          booking={selectedBooking}
          onReviewSubmit={() => {
            // Mark this booking as reviewed immediately in local state
            setReviewedBookings(prev => new Set([...prev, selectedBooking._id]));
            handleLoad();
          }}
        />
      )}
    </div>
  );
}

export default AppointmentDetails;