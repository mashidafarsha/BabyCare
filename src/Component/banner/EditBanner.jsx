import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { editBannerData } from "../../sevices/adminApi";
import { BaseUrl } from "../../constants/constants";
import { X, Upload, Save, Layout, MessageSquare, Type, CheckCircle, Terminal, RefreshCw, ArrowRight } from "lucide-react";

function EditBanner({ editBanner, handleLoad }) {
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [bannerName, setBannerName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editBanner) {
      setUploadedImage(editBanner.image);
      setBannerName(editBanner.bannerName);
      setDescription(editBanner.description);
      setId(editBanner._id);
      setImage(null);
      setMessage("");
    }
  }, [editBanner]);

  const handleFileChange = (event) => {
    setUploadedImage(null);
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

  const editHandleBanner = async (e) => {
    e.preventDefault();
    if (!bannerName || !description) {
      return Swal.fire({
        icon: "warning",
        title: "Protocol Violation",
        text: "Both a title and description are required for public distribution.",
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
      let { data } = await editBannerData(id, bannerName, description, image);
      if (data.success || data) {
        Swal.fire({
          icon: "success",
          title: "Asset Synchronized",
          text: "The billboard configuration has been successfully propagated.",
          background: "#0f172a",
          color: "#f8fafc",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-[2.5rem] border border-white/5 shadow-2xl',
            title: 'font-black uppercase tracking-tighter italic text-2xl'
          }
        });
        document.getElementById("editBanner").checked = false;
        handleLoad();
      }
    } catch (error) {
      console.error("Synchronization error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="editBanner" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle backdrop-blur-xl">
        <div className="modal-box p-0 overflow-hidden rounded-[4rem] border border-white/10 shadow-2xl bg-slate-900 text-white max-w-2xl mb-10 sm:mb-0">
          
          {/* Cinematic Modal Header */}
          <div className="bg-slate-800 px-10 py-10 flex justify-between items-center text-white relative h-48 border-b border-white/5">
            <div className="absolute inset-0 opacity-20">
               <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Clinical Workspace" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="bg-blue-600/20 p-5 rounded-[1.8rem] backdrop-blur-md border border-blue-500/20 shadow-2xl">
                <RefreshCw size={32} className="text-blue-500 animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Refine Asset</h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-4 italic flex items-center gap-2">
                   <Terminal size={12} /> Configuration Sequence: {editBanner?.bannerName}
                </p>
              </div>
            </div>
            <label htmlFor="editBanner" className="p-4 bg-white/5 hover:bg-white text-white hover:text-slate-900 rounded-[1.5rem] transition-all cursor-pointer relative z-10 active:scale-95">
              <X size={24} />
            </label>
          </div>

          <form onSubmit={editHandleBanner} className="p-12 space-y-10">
            {/* Artifact Recalibration */}
            <div className="space-y-4 text-center">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] block italic">Visual Artifact Protocol</label>
              <div className="relative group mx-auto">
                <input id="edit-banner-file" type="file" className="hidden" onChange={handleFileChange} />
                <label 
                  htmlFor="edit-banner-file"
                  className="w-full h-56 rounded-[3rem] border-2 border-slate-800 bg-slate-800/30 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-500/30 transition-all shadow-inner relative group/asset"
                >
                  <img
                    className="w-full h-full object-cover transition-transform group-hover/asset:scale-110 duration-1000"
                    src={
                      uploadedImage
                        ? `${BaseUrl}/${uploadedImage}`
                        : image && URL.createObjectURL(image)
                    }
                    alt=""
                  />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/asset:opacity-100 flex flex-col items-center justify-center transition-opacity backdrop-blur-sm">
                     <Upload size={32} className="text-blue-500 mb-4 animate-bounce" />
                     <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">Update Visual Matrix</span>
                  </div>
                </label>
                {image && <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-[1.2rem] shadow-2xl border-4 border-slate-900 animate-in zoom-in"><CheckCircle size={16} /></div>}
              </div>
              {message && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest italic">{message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 italic block">Sequence Identifier</label>
                <div className="relative group/input">
                   <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                   <input
                     className="w-full bg-slate-800/50 border border-white/5 rounded-[2rem] pl-16 pr-8 py-5 text-sm font-black text-white focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-500/50 transition-all italic uppercase tracking-widest"
                     type="text"
                     value={bannerName}
                     onChange={(e) => setBannerName(e.target.value)}
                   />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 italic block">Strategic Narrative</label>
                <div className="relative group/input">
                   <MessageSquare className="absolute left-6 top-6 text-slate-600 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                   <textarea
                     className="w-full bg-slate-800/50 border border-white/5 rounded-[2rem] pl-16 pr-8 py-5 text-sm font-black text-white focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-500/50 transition-all h-36 resize-none italic tracking-wide"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                   />
                </div>
              </div>
            </div>

            <div className="flex gap-6">
               <label htmlFor="editBanner" className="flex-1 text-center py-6 rounded-[2.2rem] font-black text-[10px] uppercase tracking-[0.4em] text-slate-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer italic border border-transparent hover:border-white/5">
                  Retain Original
               </label>
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-[2] bg-white text-slate-900 py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 disabled:opacity-50 hover:bg-blue-600 hover:text-white italic flex items-center justify-center gap-4 group/save relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/save:translate-y-0 transition-transform duration-500"></div>
                 <div className="relative z-10 flex items-center gap-4">
                    <Save size={18} className="text-blue-500 group-hover/save:text-white" />
                    {isSubmitting ? "PROPAGATING..." : "COMMIT CHANGES"}
                    <ArrowRight size={18} className="group-hover/save:translate-x-2 transition-transform" />
                 </div>
               </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditBanner;
