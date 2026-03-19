import React, { useState } from "react";
import Swal from "sweetalert2";
import { addCategory } from "../../sevices/adminApi";
import { X, Upload, CheckCircle, Terminal, ShieldPlus, ArrowRight, Zap, Microscope, MessageSquare, Type } from "lucide-react";

function AddCategory({ handleLoad }) {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setImage(selectedFile);
      setMessage(null);
    } else {
      setImage(null);
      setMessage("Invalid format. institutional standards require JPEG, PNG or WebP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName || !description || !image) {
      return Swal.fire({
        icon: "warning",
        title: "Provisioning Error",
        text: "Please provide complete metadata and medical iconography for deployment.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#2563EB",
        customClass: {
          popup: 'rounded-[2.5rem] border border-white/5 shadow-2xl',
          title: 'font-black uppercase tracking-tighter italic text-2xl',
          confirmButton: 'rounded-2xl font-black uppercase tracking-widest text-[10px] px-8 py-4'
        }
      });
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("Image", image);
      formData.append("categoryName", categoryName);
      formData.append("description", description);

      let { data } = await addCategory(formData);
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Speciality Provisioned",
          text: "The clinical department has been successfully integrated into the architecture.",
          background: "#0f172a",
          color: "#f8fafc",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-[2.5rem] border border-white/5 shadow-2xl',
            title: 'font-black uppercase tracking-tighter italic text-2xl'
          }
        });
        setCategoryName("");
        setDescription("");
        setImage(null);
        document.getElementById("file-input").value = "";
        document.getElementById("add-category").checked = false;
        handleLoad();
      }
    } catch (error) {
       console.error("Clinical provisioning failure:", error);
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="add-category" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle backdrop-blur-xl">
        <div className="modal-box p-0 overflow-hidden rounded-[4rem] border border-white/10 shadow-2xl bg-slate-900 text-white max-w-2xl mb-10 sm:mb-0">
          
          {/* Cinematic Modal Header */}
          <div className="bg-blue-600 px-10 py-10 flex justify-between items-center text-white relative h-48">
            <div className="absolute inset-0 opacity-20">
               <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Clinical Tech" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600/80 to-transparent"></div>
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="bg-white/20 p-5 rounded-[1.8rem] backdrop-blur-md border border-white/10 shadow-2xl">
                <ShieldPlus size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter italic leading-none">New Node</h3>
                <p className="text-[10px] font-black text-blue-100 uppercase tracking-[0.4em] mt-4 italic flex items-center gap-2">
                   <Terminal size={12} /> Clinical Architecture Protocol
                </p>
              </div>
            </div>
            <label htmlFor="add-category" className="p-4 bg-white/10 hover:bg-white text-white hover:text-blue-600 rounded-[1.5rem] transition-all cursor-pointer relative z-10 active:scale-95">
              <X size={24} />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="p-12 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 italic block">Speciality Sequence ID</label>
                  <div className="relative group/input">
                    <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                    <input
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="e.g. NEUROLOGY_OPS"
                      className="w-full bg-slate-800/50 border border-white/5 rounded-[2rem] pl-16 pr-8 py-5 text-sm font-black text-white focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-500/50 transition-all placeholder:text-slate-700 italic uppercase tracking-widest"
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 italic block">Clinical Copy Script</label>
                  <div className="relative group/input">
                    <MessageSquare className="absolute left-6 top-6 text-slate-600 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="TRANSCRIP_DATA_STREAM"
                      className="w-full bg-slate-800/50 border border-white/5 rounded-[2rem] pl-16 pr-8 py-5 text-sm font-black text-white focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-500/50 transition-all h-40 resize-none placeholder:text-slate-700 italic tracking-wide"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 flex flex-col h-full">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 italic block text-center">Medical Iconography Matrix</label>
                <div className="relative group flex-1">
                  <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label 
                    htmlFor="file-input"
                    className={`flex flex-col items-center justify-center gap-6 w-full h-full border-2 border-dashed rounded-[3rem] py-8 transition-all cursor-pointer relative overflow-hidden ${
                      image ? "bg-slate-800 border-blue-500/50" : "bg-slate-800/20 border-white/5 hover:border-blue-500/30 hover:bg-slate-800/50"
                    }`}
                  >
                    {image ? (
                       <div className="w-full h-full relative p-6">
                          <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-2xl relative group/img">
                             <div className="absolute inset-0 bg-blue-600/0 group-hover/img:bg-blue-600/20 transition-colors z-10 flex items-center justify-center opacity-0 group-hover/img:opacity-100 backdrop-blur-sm">
                                <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] bg-slate-900/80 px-6 py-3 rounded-full">Recalibrate Node</p>
                             </div>
                             <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000" />
                          </div>
                       </div>
                    ) : (
                      <>
                        <div className="p-6 bg-slate-900 rounded-[2rem] shadow-2xl text-blue-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                          <Microscope size={32} />
                        </div>
                        <div className="text-center">
                          <span className="text-[11px] font-black text-white uppercase tracking-[0.3em] block italic">Inject Clinical Icon</span>
                          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-3 block italic text-center px-6">Institutional Standard: 512x512 PNG (Transparent)</span>
                        </div>
                      </>
                    )}
                  </label>
                  {image && <div className="absolute top-4 right-4 bg-blue-500 text-white p-3 rounded-[1.2rem] shadow-2xl border-4 border-slate-900 animate-in zoom-in z-20"><CheckCircle size={16} /></div>}
                </div>
                {message && <p className="text-[10px] text-red-500 font-black text-center uppercase tracking-widest italic animate-pulse mt-2">{message}</p>}
              </div>
            </div>

            <div className="flex gap-6 pt-4">
               <label htmlFor="add-category" className="flex-1 text-center py-6 rounded-[2.2rem] font-black text-[10px] uppercase tracking-[0.4em] text-slate-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer italic border border-transparent hover:border-white/5">
                  Discard Protocol
               </label>
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-[2] bg-white text-slate-900 py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 disabled:opacity-50 hover:bg-blue-600 hover:text-white italic flex items-center justify-center gap-4 group/publish relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/publish:translate-y-0 transition-transform duration-500"></div>
                 <div className="relative z-10 flex items-center gap-4">
                    <Zap size={18} className="text-blue-500 group-hover/publish:text-white animate-pulse" />
                    {isSubmitting ? "PROVISIONING..." : "INTEGRATE SPECIALITY"}
                    <ArrowRight size={18} className="group-hover/publish:translate-x-2 transition-transform" />
                 </div>
               </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCategory;
