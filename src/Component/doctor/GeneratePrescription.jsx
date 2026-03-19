import React, { useState } from "react";
import { generatePrescription } from "../../sevices/doctorApi";
import { toast } from "react-toastify";
import { FileText, Plus, Trash2, Send, Activity, Info, Zap, Clock, ClipboardList, CheckCircle } from "lucide-react";

function GeneratePrescription({ userId, onClose }) {
  const [medicines, setMedicines] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Form states for new medicine
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");

  const addMedicine = (e) => {
    e.preventDefault();
    if (!medName || !dosage || !frequency || !duration) {
      toast.error("Protocol Incomplete: All pharmaceutical fields are mandatory.");
      return;
    }
    setMedicines([...medicines, { name: medName, dosage, frequency, duration }]);
    setMedName("");
    setDosage("");
    setFrequency("");
    setDuration("");
  };

  const removeMedicine = (index) => {
    const updated = [...medicines];
    updated.splice(index, 1);
    setMedicines(updated);
  };

  const handleSubmit = async () => {
    if (medicines.length === 0) {
      toast.error("Clinical Error: At least one medicinal record is required.");
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await generatePrescription(userId, medicines, notes);
      toast.success(data.message || "Prescription Transmitted Successfully.");
      if (onClose) onClose();
    } catch (error) {
      toast.error("Transmission Failure: Error generating clinical prescription.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden w-full max-w-2xl font-sans animate-in zoom-in duration-300">
      {/* Header: Institutional Branding */}
      <div className="bg-slate-900 p-8 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <FileText size={24} />
           </div>
           <div>
              <h2 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">Rx Terminal <span className="text-blue-500">Protocol</span></h2>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1 italic">Institutional Clinical Outbound</p>
           </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 active:scale-90"
          >
            <Plus className="rotate-45" size={20} />
          </button>
        )}
      </div>

      <div className="p-8 space-y-8">
        {/* Entry Module: Pharmaceutical Submission */}
        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-6 relative group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100">
          <div className="flex items-center gap-2 mb-2">
             <Zap size={14} className="text-blue-500" />
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Medicinal Entry Logic</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Pharmaceutical Unit</label>
                <input 
                  type="text" 
                  placeholder="e.g. Paracetamol" 
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-400 transition-all text-xs font-bold text-slate-700"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Dosage Intensity</label>
                <input 
                  type="text" 
                  placeholder="e.g. 500 MG" 
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-400 transition-all text-xs font-bold text-slate-700"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Frequency Cycle</label>
                <input 
                  type="text" 
                  placeholder="e.g. 1-0-1 (POST)" 
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-400 transition-all text-xs font-bold text-slate-700"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Treatment Duration</label>
                <input 
                  type="text" 
                  placeholder="e.g. 7 DAYS" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-400 transition-all text-xs font-bold text-slate-700"
                />
             </div>
          </div>
          
          <button 
            onClick={addMedicine} 
            className="w-full py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-lg shadow-slate-200 transition-all hover:bg-blue-600 flex items-center justify-center gap-2 active:scale-95 italic"
          >
            <Plus size={14} /> Add to Prescription Batch
          </button>
        </div>

        {/* Ledger: Prescribed Items */}
        {medicines.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2">
               <ClipboardList size={14} className="text-blue-500" />
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Rx Batch Inventory</h3>
            </div>
            <div className="space-y-3">
              {medicines.map((med, idx) => (
                 <div key={idx} className="flex justify-between items-center bg-white border border-slate-100 p-5 rounded-[1.5rem] shadow-sm group hover:shadow-md transition-all">
                   <div className="flex gap-4 items-center">
                     <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-[10px]">
                        {idx + 1}
                     </div>
                     <div>
                       <p className="font-black text-slate-800 text-sm uppercase italic tracking-tight">{med.name} <span className="text-[10px] text-slate-400 font-bold ml-1">/ {med.dosage}</span></p>
                       <div className="flex items-center gap-2 mt-1">
                          <Clock size={10} className="text-blue-500" />
                          <p className="text-[9px] text-blue-600 font-black uppercase tracking-widest">{med.frequency} • {med.duration}</p>
                       </div>
                     </div>
                   </div>
                   <button 
                     onClick={() => removeMedicine(idx)} 
                     className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                   >
                     <Trash2 size={18} />
                   </button>
                 </div>
              ))}
            </div>
          </div>
        )}

        {/* Intelligence Overlay: Advice */}
        <div className="space-y-4">
           <div className="flex items-center gap-2">
              <Info size={14} className="text-blue-500" />
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Clinical Observations</h3>
           </div>
           <textarea 
             rows="3"
             value={notes}
             onChange={(e) => setNotes(e.target.value)}
             placeholder="Enter clinical advice, dietary constraints, or follow-up protocols..."
             className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-400 transition-all text-xs font-bold text-slate-700 resize-none h-32 italic"
           ></textarea>
        </div>

        {/* Validation: Finalization */}
        <div className="pt-4 border-t border-slate-50">
           <button 
             onClick={handleSubmit} 
             disabled={loading || medicines.length === 0}
             className="w-full py-6 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2.2rem] shadow-2xl shadow-blue-100 hover:bg-slate-900 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden flex items-center justify-center gap-4 italic"
           >
             <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
             <span className="relative z-10 flex items-center gap-3">
               {loading ? "Transmitting Protocol..." : <><Send size={18} /> Generate Rx Artifact</>}
             </span>
           </button>
           <div className="mt-6 flex items-center justify-center gap-2 opacity-30 grayscale grayscale">
              <CheckCircle size={14} className="text-blue-500" />
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Institutional Security Artifact Verified</p>
           </div>
        </div>
      </div>
    </div>
  );
}

export default GeneratePrescription;
