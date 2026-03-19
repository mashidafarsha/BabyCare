import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { addOurPlan } from '../../sevices/adminApi';
import { X, Upload, CheckCircle, Package, DollarSign, Tag, Info } from "lucide-react";

function AddPlans({ handleLoad }) {
  const [planname, setPlanname] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [offerAmount, setOffferAmount] = useState("");
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
      setMessage("Please select a JPEG, PNG or WebP image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!planname || !description || !amount || !image) {
      return Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please provide all required plan details and an image.",
        confirmButtonColor: "#2563EB",
        borderRadius: "2rem"
      });
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("planname", planname);
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("offerAmount", offerAmount || "0");

    try {
      let { data } = await addOurPlan(formData);
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Plan Architecture Created",
          text: data.message,
          timer: 2000,
          showConfirmButton: false,
          borderRadius: "2rem"
        });
        setPlanname("");
        setDescription("");
        setAmount("");
        setOffferAmount("");
        setImage(null);
        document.getElementById("plan-file-input").value = "";
        document.getElementById("add-plan").checked = false;
        handleLoad();
      } else {
        Swal.fire({
          icon: "error",
          title: "Creation Failed",
          text: data.errors?.message || "Could not save the new plan.",
          borderRadius: "2rem"
        });
      }
    } catch (error) {
       console.error(error);
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="add-plan" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div className="modal-box p-0 overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-2xl bg-white max-w-xl">
          {/* Modal Header */}
          <div className="bg-slate-900 px-8 py-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-xl">
                <Package size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter">New Service Plan</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Expanding Premium Offerings</p>
              </div>
            </div>
            <label htmlFor="add-plan" className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer">
              <X size={20} />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Visual Preview */}
            <div className="flex justify-center">
              <div className="relative group">
                <input id="plan-file-input" type="file" className="hidden" onChange={handleFileChange} />
                <label 
                  htmlFor="plan-file-input"
                  className={`w-32 h-32 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all cursor-pointer overflow-hidden ${
                    image ? "bg-blue-50 border-blue-200" : "bg-slate-50 border-slate-100 hover:border-slate-200"
                  }`}
                >
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Upload size={24} className="text-slate-300" />
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Add Image</span>
                    </>
                  )}
                </label>
                {image && <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white"><CheckCircle size={12} /></div>}
              </div>
            </div>
            {message && <p className="text-[10px] text-red-500 font-bold text-center mt-2 uppercase tracking-widest">{message}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Visibility Name</label>
                <div className="relative">
                   <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                   <input
                     value={planname}
                     onChange={(e) => setPlanname(e.target.value)}
                     placeholder="e.g. Platinum Plus"
                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                     type="text"
                   />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base Price (USD)</label>
                <div className="relative">
                   <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                   <input
                     value={amount}
                     onChange={(e) => setAmount(e.target.value)}
                     placeholder="0.00"
                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                     type="number"
                   />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Strategic Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the core benefits of this tier..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all h-24 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-blue-600">Promotion (%)</label>
                <div className="relative">
                   <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200" size={16} />
                   <input
                     value={offerAmount}
                     onChange={(e) => setOffferAmount(e.target.value)}
                     placeholder="Discount percentage"
                     className="w-full bg-blue-50/30 border border-blue-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                     type="text"
                   />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
               <label htmlFor="add-plan" className="flex-1 text-center py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer border border-transparent">
                  Abort
               </label>
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 transition-all active:scale-95 disabled:opacity-50"
               >
                 {isSubmitting ? "Syncing..." : "Finalize Plan"}
               </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPlans