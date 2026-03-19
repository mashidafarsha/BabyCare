import React, { useState } from "react";
import { ShieldAlert, X } from "lucide-react";
import { triggerSOS } from "../sevices/userApi";
import Swal from "sweetalert2";

const SOSButton = ({ socket, doctorId, bookingId, userName, userId }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSOS = async () => {
    try {
      const { data } = await triggerSOS({ doctorId, bookingId, userName });

      if (data.success) {
        if (socket) {
          socket.emit("sos-alert", {
            toDoctorId: doctorId,
            fromUserId: userId,
            fromName: userName,
            bookingId: bookingId,
          });
        }

        Swal.fire({
          title: "Emergency Alert Sent",
          text: "Help is on the way. The doctor has been notified immediately.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          customClass: { popup: "rounded-2xl" },
        });
        setIsConfirming(false);
      }
    } catch (error) {
      console.error("SOS Error:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to send alert. Please call emergency services directly.",
        icon: "error",
        customClass: { popup: "rounded-2xl" },
      });
    }
  };

  return (
    <div className="flex flex-col items-start gap-3">
      {/* Confirmation card — opens above the button */}
      {isConfirming && (
        <div className="bg-white p-5 rounded-2xl shadow-2xl border border-red-100 w-56 text-center">
          <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <ShieldAlert size={20} />
          </div>
          <p className="text-sm font-bold text-slate-800 mb-1">Emergency Alert</p>
          <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
            This will immediately notify your doctor.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsConfirming(false)}
              className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold transition-all hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSOS}
              className="flex-1 py-2 bg-red-600 text-white rounded-lg text-xs font-bold shadow-md shadow-red-200 hover:bg-red-700 transition-all"
            >
              Send SOS
            </button>
          </div>
        </div>
      )}

      {/* SOS trigger button */}
      <button
        onClick={() => setIsConfirming(!isConfirming)}
        title="Emergency SOS"
        className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm shadow-lg transition-all active:scale-95 ${
          isConfirming
            ? "bg-slate-800 text-white shadow-slate-300"
            : "bg-red-600 hover:bg-red-700 text-white shadow-red-200"
        }`}
      >
        {isConfirming ? (
          <>
            <X size={18} />
            <span>Cancel</span>
          </>
        ) : (
          <>
            <ShieldAlert size={18} />
            <span>SOS</span>
            {/* Pulse dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white/70"></span>
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default SOSButton;
