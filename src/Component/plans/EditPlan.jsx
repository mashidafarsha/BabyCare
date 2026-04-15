import React, { useEffect, useState } from "react";
import { editOurPlan } from "../../sevices/adminApi";
import Swal from "sweetalert2";
import { BaseUrl } from "../../constants/constants";
import { X, Upload, Save, Package, DollarSign, Tag, CheckCircle } from "lucide-react";

function EditPlan({ plan, handleLoad }) {
  const [id, setId] = useState("");
  const [planname, setPlanname] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [offerAmount, setOffferAmount] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (plan) {
      setId(plan._id);
      setPlanname(plan.planname);
      setDescription(plan.description);
      setAmount(plan.amount);
      setOffferAmount(plan.offerAmount);
      setUploadedImage(plan.image);
      setImage(null);
      setMessage("");
    }
  }, [plan]);

  const handleFileChange = (event) => {
    setUploadedImage(null);
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
    if (!planname || !description || !amount) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please ensure all essential plan fields are populated.",
        confirmButtonColor: "#2563EB",
        borderRadius: "2rem"
      });
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("id", id);
    if (image) formData.append("image", image);
    formData.append("planname", planname);
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("offerAmount", offerAmount || "0");

    try {
      let { data } = await editOurPlan(formData);
      if (data.success || data) {
        Swal.fire({
          icon: "success",
          title: "Plan Synchronized",
          text: data.message || "Changes have been successfully propagated.",
          timer: 2000,
          showConfirmButton: false,
          borderRadius: "2rem"
        });
        document.getElementById("edit-plan").checked = false;
        handleLoad();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "The system could not synchronize changes at this time.",
        borderRadius: "2rem"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="edit-plan" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div className="modal-box p-0 overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-2xl bg-white max-w-xl">
          {/* Modal Header */}
          <div className="bg-slate-900 px-8 py-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/20">
                <Package size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter italic">Modify Configuration</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Tier: {plan?.planname}</p>
              </div>
            </div>
            <label htmlFor="edit-plan" className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer">
              <X size={20} />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Image Section */}
            <div className="flex justify-center">
              <div className="relative group">
                <input id="edit-plan-file" type="file" className="hidden" onChange={handleFileChange} />
                <label 
                  htmlFor="edit-plan-file"
                  className="w-40 h-28 rounded-[2rem] border-2 border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-200 transition-all shadow-inner group"
                >
                  <img
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : (uploadedImage || "https://cdn-icons-png.flaticon.com/512/2373/2373446.png")
                    }
                    alt=""
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-[2rem]">
                     <Upload size={20} className="text-white" />
                  </div>
                </label>
                {image && <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white animate-bounce"><CheckCircle size={10} /></div>}
              </div>
            </div>
            {message && <p className="text-[9px] text-red-500 font-bold text-center uppercase tracking-widest">{message}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Identifier</label>
                <div className="relative">
                   <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                   <input
                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                     type="text"
                     value={planname}
                     onChange={(e) => setPlanname(e.target.value)}
                   />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit Valuation</label>
                <div className="relative">
                   <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                   <input
                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                     type="number"
                     value={amount}
                     onChange={(e) => setAmount(e.target.value)}
                   />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operational Description</label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all h-24 resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Offer Margin (%)</label>
                <div className="relative">
                   <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={16} />
                   <input
                     className="w-full bg-blue-50/30 border border-blue-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                     type="text"
                     value={offerAmount}
                     onChange={(e) => setOffferAmount(e.target.value)}
                   />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
               <label htmlFor="edit-plan" className="flex-1 text-center py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer border border-transparent">
                  Keep Original
               </label>
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
               >
                 {isSubmitting ? "Syncing..." : <><Save size={16} /> Update Artifact</>}
               </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPlan;
