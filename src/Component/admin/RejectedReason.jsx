import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { rejectDoctor } from "../../sevices/adminApi";
import { X, AlertCircle, ShieldAlert, Send, ArrowRight } from "lucide-react";

function RejectedReason({ docDetail, handleLoad }) {
  const [reason, setReason] = useState("");
  const [id, setId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (docDetail) {
      setId(docDetail._id);
      setReason("");
    }
  }, [docDetail]);

  const rejectHandler = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      return Swal.fire({
        icon: 'warning',
        title: 'Reason Required',
        text: 'Administrative protocol requires a documented reason for application decline.',
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: '#EF4444',
        customClass: {
          popup: 'rounded-[2.5rem] border border-white/5 shadow-2xl',
          title: 'font-black uppercase tracking-tighter italic text-2xl',
          confirmButton: 'rounded-2xl font-black uppercase tracking-widest text-[10px] px-8 py-4'
        }
      });
    }

    setIsSubmitting(true);
    try {
      let { data } = await rejectDoctor(id, reason);
      if (data.success || data) {
        Swal.fire({
          icon: 'success',
          title: 'Practitioner Declined',
          text: 'The decline sequence has been finalized and the practitioner notified.',
          background: "#0f172a",
          color: "#f8fafc",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-[2.5rem] border border-white/5 shadow-2xl',
            title: 'font-black uppercase tracking-tighter italic text-2xl'
          }
        });
        document.getElementById("reject_modal").checked = false;
        if (handleLoad) handleLoad();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Action Failed',
        text: 'The institutional cloud could not process the decline sequence at this time.',
        background: "#0f172a",
        color: "#f8fafc",
        customClass: {
          popup: 'rounded-[2.5rem] border border-white/5 shadow-2xl',
          title: 'font-black uppercase tracking-tighter italic text-2xl'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="reject_modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle backdrop-blur-xl">
        <div className="modal-box p-0 overflow-hidden rounded-[4rem] border border-white/10 shadow-2xl bg-slate-900 text-white max-w-lg mb-10 sm:mb-0">
          {/* Cinematic Modal Header */}
          <div className="bg-red-600 px-10 py-10 flex justify-between items-center text-white relative h-40">
            <div className="absolute inset-0 opacity-20">
               <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Clinical Safety" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-600/80 to-transparent"></div>
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="bg-white/20 p-4 rounded-[1.5rem] backdrop-blur-md border border-white/10">
                <ShieldAlert size={32} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-none">Decline Application</h3>
                <p className="text-[10px] font-black text-red-100 uppercase tracking-[0.3em] mt-3 italic flex items-center gap-2">
                   <ArrowRight size={10} /> Practitioner: {docDetail?.name}
                </p>
              </div>
            </div>
            <label htmlFor="reject_modal" className="p-3 bg-white/10 hover:bg-white text-white hover:text-red-600 rounded-[1.2rem] transition-all cursor-pointer relative z-10 active:scale-95">
              <X size={24} />
            </label>
          </div>

          <form onSubmit={rejectHandler} className="p-12 space-y-10 relative">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 italic block">Institutional Feedback Ledger</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Document specific credentialing deficiencies or compliance failures..."
                  className="w-full bg-slate-800/50 border border-white/5 rounded-[2rem] px-8 py-6 text-sm font-bold text-white focus:outline-none focus:ring-8 focus:ring-red-600/10 focus:border-red-500/50 transition-all h-48 resize-none placeholder:text-slate-600 italic tracking-wide"
                />
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/40 rounded-full w-fit">
                   <AlertCircle size={10} className="text-red-500" />
                   <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic">Feedback will be transmitted to the practitioner entity</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
               <label htmlFor="reject_modal" className="flex-1 text-center py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] text-slate-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer italic border border-transparent hover:border-white/5">
                  Abort Sequence
               </label>
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-[1.5] bg-white text-slate-900 py-6 rounded-[2.2rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 disabled:opacity-50 hover:bg-red-600 hover:text-white italic flex items-center justify-center gap-3 group"
               >
                 <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 {isSubmitting ? "Transmitting..." : "Confirm Decline"}
               </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RejectedReason;
