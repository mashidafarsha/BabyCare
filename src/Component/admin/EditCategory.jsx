import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { editDepartment } from "../../sevices/adminApi";
import { BaseUrl } from "../../constants/constants";
import { X, Upload, CheckCircle, RefreshCw, Terminal, Save, ArrowRight, Microscope, Type, MessageSquare } from "lucide-react";

function EditCategory({ category, handleLoad }) {
  const [depname, setDepname] = useState("");
  const [depdescr, setDepdescr] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setUploadedImage(category.image);
      setDepname(category.categoryName);
      setDepdescr(category.description);
      setId(category._id);
      setImage(null);
      setMessage("");
    }
  }, [category]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setImage(selectedFile);
      setUploadedImage(null);
      setMessage(null);
    } else {
      setImage(null);
      setMessage("Invalid format. institutional standards require JPEG, PNG or WebP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!depname || !depdescr) {
      return Swal.fire({
        icon: "warning",
        title: "Protocol Violation",
        text: "Both a name and clinical description are required for synchronization.",
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
      let { data } = await editDepartment(id, depname, depdescr, image);
      if (data.success || data) {
        Swal.fire({
          icon: "success",
          title: "Node Synchronized",
          text: "The clinical department configuration has been successfully propagated.",
          background: "#0f172a",
          color: "#f8fafc",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-[2.5rem] border border-white/5 shadow-2xl',
            title: 'font-black uppercase tracking-tighter italic text-2xl'
          }
        });
        document.getElementById("editCategory").checked = false;
        handleLoad();
      }
    } catch (error) {
      console.error("Clinical synchronization failure:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="editCategory" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle backdrop-blur-xl">
        <div className="modal-box p-0 overflow-hidden rounded-[4rem] border border-white/10 shadow-2xl bg-slate-900 text-white max-w-2xl mb-10 sm:mb-0">
          
          {/* Cinematic Modal Header */}
          <div className="bg-slate-800 px-10 py-10 flex justify-between items-center text-white relative h-48 border-b border-white/5">
            <div className="absolute inset-0 opacity-20">
               <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Clinical Workspace" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="bg-blue-600/20 p-5 rounded-[1.8rem] backdrop-blur-md border border-blue-500/20 shadow-2xl">
                <RefreshCw size={32} className="text-blue-500 animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Refine Node</h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-4 italic flex items-center gap-2">
                   <Terminal size={12} /> Speciality Sequence: {category?.categoryName}
                </p>
              </div>
            </div>
            <label htmlFor="editCategory" className="p-4 bg-white/5 hover:bg-white text-white hover:text-slate-900 rounded-[1.5rem] transition-all cursor-pointer relative z-10 active:scale-95">
              <X size={24} />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="p-12 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 italic block">Sequence Identifier</label>
                  <div className="relative group/input">
                    <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                    <input
                      value={depname}
                      onChange={(e) => setDepname(e.target.value)}
                      className="w-full bg-slate-800/50 border border-white/5 rounded-[2rem] pl-16 pr-8 py-5 text-sm font-black text-white focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-500/50 transition-all italic uppercase tracking-widest"
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 italic block">Clinical Protocol</label>
                  <div className="relative group/input">
                    <MessageSquare className="absolute left-6 top-6 text-slate-600 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                    <textarea
                      value={depdescr}
                      onChange={(e) => setDepdescr(e.target.value)}
                      className="w-full bg-slate-800/50 border border-white/5 rounded-[2rem] pl-16 pr-8 py-5 text-sm font-black text-white focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-500/50 transition-all h-36 resize-none italic tracking-wide"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 flex flex-col h-full">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 italic block text-center">Visual Matrix Calibration</label>
                <div className="relative group flex-1">
                  <input
                    id="edit-file-input"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label 
                    htmlFor="edit-file-input"
                    className="flex flex-col items-center justify-center gap-6 w-full h-full border-2 border-dashed border-white/5 bg-slate-800/20 rounded-[3rem] py-8 transition-all cursor-pointer relative overflow-hidden group/label hover:border-blue-500/30 hover:bg-slate-800/50"
                  >
                    <div className="w-full h-full relative p-6">
                       <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-2xl relative group/img">
                          <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover/img:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-sm">
                             <div className="bg-slate-900/80 px-6 py-3 rounded-full flex items-center gap-2">
                                <Microscope size={14} className="text-blue-500" />
                                <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Update Artifact</span>
                             </div>
                          </div>
                          <img
                            className="w-full h-full object-cover transition-transform group-hover/img:scale-110 duration-1000"
                            src={
                              image
                                ? URL.createObjectURL(image)
                                : (uploadedImage.startsWith('http') ? uploadedImage : `${BaseUrl}/${uploadedImage}`)
                            }
                            alt="preview"
                          />
                       </div>
                    </div>
                  </label>
                  {image && <div className="absolute top-4 right-4 bg-blue-600 text-white p-3 rounded-[1.2rem] shadow-2xl border-4 border-slate-900 animate-in zoom-in z-20"><CheckCircle size={16} /></div>}
                </div>
                {message && <p className="text-[10px] text-red-500 font-black text-center uppercase tracking-widest italic animate-pulse mt-2">{message}</p>}
              </div>
            </div>

            <div className="flex gap-6">
               <label htmlFor="editCategory" className="flex-1 text-center py-6 rounded-[2.2rem] font-black text-[10px] uppercase tracking-[0.4em] text-slate-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer italic border border-transparent hover:border-white/5">
                  Retain Configuration
               </label>
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-[2] bg-white text-slate-900 py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 disabled:opacity-50 hover:bg-blue-600 hover:text-white italic flex items-center justify-center gap-4 group/save relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/save:translate-y-0 transition-transform duration-500"></div>
                 <div className="relative z-10 flex items-center gap-4">
                    <Save size={18} className="text-blue-500 group-hover/save:text-white" />
                    {isSubmitting ? "COMMITING..." : "COMMIT CHANGES"}
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

export default EditCategory;
