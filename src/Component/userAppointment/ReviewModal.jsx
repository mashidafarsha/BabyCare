import React, { useState } from "react";
import { Star, X, MessageSquare, Send, CheckCircle, Heart } from "lucide-react";
import { submitReview } from "../../sevices/userApi";
import Swal from "sweetalert2";

const ReviewModal = ({ isOpen, onClose, booking, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Rating Required",
        text: "Please provide a star rating to help us improve our service.",
        confirmButtonColor: "#3b82f6",
        customClass: { popup: 'rounded-2xl' }
      });
      return;
    }
    if (!comment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Feedback Required",
        text: "Please share a few words about your experience.",
        confirmButtonColor: "#3b82f6",
        customClass: { popup: 'rounded-2xl' }
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const reviewData = {
        doctorId: booking.DoctorId,
        bookingId: booking._id,
        rating,
        comment,
        userName: "Patient",
      };

      const { data } = await submitReview(reviewData);
      if (data.success) {
        Swal.fire({
          title: "Review Submitted",
          text: "Thank you for your valuable feedback!",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
          customClass: { popup: 'rounded-2xl' }
        });
        onReviewSubmit();
        onClose();
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 relative bg-white">
        
        {/* Header */}
        <div className="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
           <div>
              <h2 className="text-xl font-bold text-slate-900">Share Your Experience</h2>
              <p className="text-sm text-slate-500 font-medium">Your feedback helps us provide better care.</p>
           </div>
           <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
           >
              <X size={20} />
           </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Doctor Info */}
          <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-50">
                <CheckCircle size={24} />
             </div>
             <div>
                <p className="text-sm font-bold text-slate-900">Dr. {booking.DoctorName}</p>
                <div className="flex items-center gap-2 text-blue-600">
                   <Heart size={10} className="fill-current" />
                   <span className="text-[10px] font-bold uppercase tracking-wider">{booking.DoctorDepartment}</span>
                </div>
             </div>
          </div>

          {/* Star Rating */}
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Rate your consultation</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-all transform active:scale-90"
                >
                  <Star
                    size={40}
                    className={`transition-all duration-200 ${
                      (hover || rating) >= star 
                        ? "text-orange-400 fill-orange-400" 
                        : "text-slate-100"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div className="space-y-3">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                <MessageSquare size={14} className="text-blue-600" />
                <span>Your Comments</span>
             </div>
             <textarea
               value={comment}
               onChange={(e) => setComment(e.target.value)}
               className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm font-medium text-slate-700 placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none transition-all resize-none shadow-sm"
               placeholder="How was your visit? Any suggestions for improvement?"
             />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
