import React from 'react';
import { X, Printer, ShieldPlus, Fingerprint } from 'lucide-react';
import moment from 'moment';

function PrescriptionModal({ isOpen, onClose, selectedPrescription }) {
  if (!isOpen || !selectedPrescription) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 print:p-0">
      {/* Backdrop (hidden during print) */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm print:hidden"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-full animate-in zoom-in-95 duration-300 print:rounded-none print:shadow-none print:animate-none print:block print:w-full print:max-w-none print:h-full">
        
        {/* Action Bar (hidden during print) */}
        <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50/50 print:hidden shrink-0">
          <div className="flex gap-3 px-2">
             <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95"
             >
                <Printer size={16} /> Print / Save PDF
             </button>
          </div>
          <button 
            onClick={onClose}
            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Printable Prescription Body */}
        <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar flex-grow bg-white print:overflow-visible">
           {/* Hospital Header */}
           <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-8">
              <div className="flex items-center gap-4">
                 <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                    <ShieldPlus size={36} />
                 </div>
                 <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">TrueCare</h1>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Medical Center & Diagnostics</p>
                 </div>
              </div>
              <div className="text-right space-y-1 hidden sm:block">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact</p>
                 <p className="text-xs font-bold text-slate-700">+1 800 TRUE-CARE</p>
                 <p className="text-xs font-bold text-slate-700">support@truecare.com</p>
              </div>
           </div>

           {/* Provider & Patient Info Grid */}
           <div className="grid grid-cols-2 gap-8 mb-12 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 print:bg-white print:border-slate-300 print:rounded-none">
              <div className="space-y-4">
                 <div>
                    <h3 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-1">Prescribing Doctor</h3>
                    <p className="text-xl font-black text-slate-900 uppercase">Dr. {selectedPrescription.doctorId?.name}</p>
                    <p className="text-sm font-bold text-slate-500">{selectedPrescription.doctorId?.department}</p>
                 </div>
                 <div>
                    <h3 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-1">Encounter Date</h3>
                    <p className="text-sm font-bold text-slate-900">{moment(selectedPrescription.date).format("DD MMM YYYY, hh:mm A")}</p>
                 </div>
              </div>
              <div className="space-y-4 border-l border-slate-200 pl-8">
                 <div>
                    <h3 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-1">Patient Details</h3>
                    <p className="text-xl font-black text-slate-900 uppercase">Patient Record</p>
                    <div className="flex items-center gap-2 mt-1 hidden print:flex sm:flex">
                        <Fingerprint size={12} className="text-slate-400" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: TRU-{selectedPrescription.userId?.slice(-6) || "XXX"}</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* The Prescription Body */}
           <div className="mb-12 relative min-h-[300px]">
              <div className="absolute top-0 left-0 text-slate-100/50 print:text-slate-100/30 -z-10">
                 <ShieldPlus size={300} />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                 <div className="text-4xl font-black italic text-slate-900 pr-4">Rx</div>
                 <div className="flex-grow h-px bg-slate-200"></div>
              </div>

              <div className="space-y-6">
                 {selectedPrescription.medicines?.map((m, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-[10px] shrink-0">
                           {idx + 1}
                        </div>
                        <div>
                           <p className="font-black text-slate-800 text-sm uppercase tracking-tight">{m.name} <span className="text-[10px] text-slate-400 ml-1">/ {m.dosage}</span></p>
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{m.frequency} • {m.duration}</p>
                        </div>
                    </div>
                 ))}
                 
                 {selectedPrescription.notes && (
                    <p className="whitespace-pre-wrap text-sm font-medium text-slate-600 leading-relaxed italic mt-6 border-l-4 border-blue-200 pl-4 py-1">
                       {selectedPrescription.notes}
                    </p>
                 )}
              </div>
           </div>

           {/* Footer / Sign off */}
           <div className="flex justify-between items-end pt-12 border-t border-slate-200">
              <div className="space-y-2">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valid until</p>
                 <p className="text-xs font-bold text-slate-700">{moment().add(6, 'months').format("DD MMM YYYY")}</p>
              </div>
              <div className="text-center">
                 <div className="text-2xl font-signature text-slate-800 italic mb-2 tracking-widest border-b border-slate-300 pb-2 inline-block px-8">
                    Dr. {selectedPrescription.doctorId?.name}
                 </div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Authorized Signature</p>
              </div>
           </div>

        </div>
      </div>

    </div>
  );
}

export default PrescriptionModal;
