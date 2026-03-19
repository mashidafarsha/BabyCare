import React, { useState } from "react";
import Swal from "sweetalert2";
import { addBannerData } from "../../sevices/adminApi";
import { X, Upload, CheckCircle, Layout, MessageSquare, Type, Terminal, ShieldPlus, ArrowRight, Zap } from "lucide-react";

function AddBanner({ handleLoad }) {
  const [bannerName, setBannerName] = useState("");
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
    if (!bannerName || !description || !image) {
      return Swal.fire({
        icon: "warning",
        title: "Provisioning Error",
        text: "Please provide complete metadata and billboard imagery for deployment.",
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
    const formData = new FormData();
    formData.append("Image", image);
    formData.append("bannerName", bannerName);
    formData.append("description", description);

    try {
      let { data } = await addBannerData(formData);
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Billboard Deployed",
          text: "The visual artifact has been successfully integrated into rotation.",
          background: "#0f172a",
          color: "#f8fafc",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-[2.5rem] border border-white/5 shadow-2xl',
            title: 'font-black uppercase tracking-tighter italic text-2xl'
          }
        });
        setBannerName("");
        setDescription("");
        setImage(null);
        document.getElementById("banner-file-input").value = "";
        document.getElementById("add-banner").checked = false;
        handleLoad();
      }
    } catch (error) {
      console.error("Deployment failure:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="add-banner" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle backdrop-blur-xl">
        <div className="modal-box p-0 overflow-hidden rounded-[4rem] border border-white/10 shadow-2xl bg-slate-900 text-white max-w-2xl mb-10 sm:mb-0">
          
          {/* Cinematic Modal Header */}
          <div className="bg-blue-600 px-10 py-10 flex justify-between items-center text-white relative h-48">
            <div className="absolute inset-0 opacity-20">
               <img src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Clinical Tech" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600/80 to-transparent"></div>
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="bg-white/20 p-5 rounded-[1.8rem] backdrop-blur-md border border-white/10 shadow-2xl">
                <ShieldPlus size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Deploy Asset</h3>
                <p className="text-[10px] font-black text-blue-100 uppercase tracking-[0.4em] mt-4 italic flex items-center gap-2">
                   <Terminal size={12} /> Digital Communications Matrix
                </p>
              </div>
            </div>
            <label htmlFor="add-banner" className="p-4 bg-white/10 hover:bg-white text-white hover:text-blue-600 rounded-[1.5rem] transition-all cursor-pointer relative z-10 active:scale-95">
              <X size={24} />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="p-12 space-y-10">
            {/* Visual Artifact Projection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic block">Billboard Projection (Raw Aspect)</label>
                 {image && <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest italic flex items-center gap-2"><CheckCircle size={10} /> Sync Verified</span>}
              </div>
              <div className="relative group">
                <input id="banner-file-input" type="file" className="hidden" onChange={handleFileChange} />
                <label 
                  htmlFor="banner-file-input"
                  className={`w-full h-64 rounded-[3rem] border-2 border-dashed flex flex-col items-center justify-center gap-6 transition-all cursor-pointer overflow-hidden relative ${
                    image ? "bg-slate-800 border-blue-500/50" : "bg-slate-800/50 border-white/5 hover:border-blue-500/30 hover:bg-slate-800"
                  }`}
                >
                  {image ? (
                    <div className="w-full h-full relative group/img">
                       <div className="absolute inset-0 bg-blue-600/0 group-hover/img:bg-blue-600/20 transition-colors z-10 flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                          <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] bg-slate-900/80 px-6 py-3 rounded-full backdrop-blur-sm">Recalibrate Artifact</p>
                       </div>
                       <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-1000" />
                    </div>
                  ) : (
                    <>
                      <div className="p-6 bg-slate-900 rounded-[2rem] shadow-2xl text-blue-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        <Upload size={32} />
                      </div>
                      <div className="text-center">
                        <span className="text-[11px] font-black text-white uppercase tracking-[0.3em] block italic">Inject High-Res Imagery</span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-3 block italic">Institutional Standard: 3840 x 1200 (21:9)</span>
                      </div>
                    </>
                  )}
                </label>
              </div>
            </div>
            {message && <p className="text-[10px] text-red-500 font-black text-center uppercase tracking-widest italic animate-bounce">{message}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 italic block">Asset Protocol Name</label>
                <div className="relative group/input">
                   <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                   <input
                     value={bannerName}
                     onChange={(e) => setBannerName(e.target.value)}
                     placeholder="INTERNAL_SEQUENCE_ID"
                     className="w-full bg-slate-800/50 border border-white/5 rounded-[2rem] pl-16 pr-8 py-5 text-sm font-black text-white focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-500/50 transition-all placeholder:text-slate-700 italic uppercase tracking-widest"
                     type="text"
                   />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 italic block">Clinical Copy Directive</label>
                <div className="relative group/input">
                   <MessageSquare className="absolute left-6 top-6 text-slate-600 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                   <textarea
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     placeholder="TRANSCRIP_DATA_STREAM"
                     className="w-full bg-slate-800/50 border border-white/5 rounded-[2rem] pl-16 pr-8 py-5 text-sm font-black text-white focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-500/50 transition-all h-36 resize-none placeholder:text-slate-700 italic tracking-wide"
                   />
                </div>
              </div>
            </div>

            <div className="flex gap-6">
               <label htmlFor="add-banner" className="flex-1 text-center py-6 rounded-[2.2rem] font-black text-[10px] uppercase tracking-[0.4em] text-slate-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer italic border border-transparent hover:border-white/5">
                  Cancel Deployment
               </label>
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-[2] bg-white text-slate-900 py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 disabled:opacity-50 hover:bg-blue-600 hover:text-white italic flex items-center justify-center gap-4 group/publish relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/publish:translate-y-0 transition-transform duration-500"></div>
                 <div className="relative z-10 flex items-center gap-4">
                    <Zap size={18} className="text-blue-500 group-hover/publish:text-white animate-pulse" />
                    {isSubmitting ? "TRANSMITTING..." : "PUBLISH TO CLUSTER"}
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

export default AddBanner;
