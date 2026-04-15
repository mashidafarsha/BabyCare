import React, { useState, useEffect } from "react";
import { editDoctor, getCategory } from "../../sevices/doctorApi";
import { BaseUrl } from "../../constants/constants";
import Swal from "sweetalert2";
import { X, Upload, User, Phone, Briefcase, GraduationCap, Save, CheckCircle } from "lucide-react";

function EditDoctorProfile({ doctorData, handleLoad }) {
  const [allDepartment, setAllDepartment] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (doctorData) {
      setId(doctorData.id || doctorData._id);
      setName(doctorData.name);
      setPhone(doctorData.phone);
      setQualification(doctorData.qualification);
      setDepartment(doctorData.department);
      setExperience(doctorData.experience || "");
      setAbout(doctorData.about || "");
      setAddress(doctorData.address || "");
      setConsultationFee(doctorData.consultationFee || "");
      setImage(doctorData.image);
    }
    getAllDepartment();
  }, [doctorData]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setUploadedImage(selectedFile);
      setMessage(null);
    } else {
      setUploadedImage(null);
      setMessage("Please select a JPEG, PNG or WebP image.");
    }
  };

  const getAllDepartment = async () => {
    try {
      let { data } = await getCategory();
      if (data?.departmentData) {
        setAllDepartment(data.departmentData);
      }
    } catch (err) {
      console.error("Failed to fetch departments", err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const validationFields = { name, phone, qualification, department, experience, about, address, consultationFee };
    console.log("Validation State:", validationFields);

    const missingFields = Object.entries(validationFields)
      .filter(([_, value]) => !value && value !== 0) // Allow 0 for fee
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.warn("Validation Failed. Missing fields:", missingFields);
      return Swal.fire({
        icon: "warning",
        title: "Incomplete Credentials",
        text: `Please provide all required information. Missing: ${missingFields.join(", ")}`,
        borderRadius: "2rem"
      });
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("Id", id);
      if (uploadedImage) formData.append("image", uploadedImage);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("qualification", qualification);
      formData.append("department", department);
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("address", address);
      formData.append("consultationFee", consultationFee);

      let { data } = await editDoctor(formData);
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Synchronized",
          text: "Your professional registry has been updated.",
          timer: 2000,
          showConfirmButton: false,
          borderRadius: "2rem"
        });
        document.getElementById("doctor_profile").checked = false;
        handleLoad();
      } else {
        Swal.fire({
          icon: "error",
          title: "Sync Failed",
          text: data.message || "Failed to update practitioner profile.",
          borderRadius: "2rem"
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="doctor_profile" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div className="modal-box p-0 overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-2xl bg-white max-w-2xl">
          {/* Header */}
          <div className="bg-slate-900 px-8 py-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/20">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter italic">Refine Identity</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Practitioner Registry Update</p>
              </div>
            </div>
            <label htmlFor="doctor_profile" className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer">
              <X size={20} />
            </label>
          </div>

          <form onSubmit={handleEdit} className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Visual Asset Section */}
              <div className="md:w-1/3 flex flex-col items-center space-y-4">
                 <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-700"></div>
                    <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-white shadow-xl relative z-10 bg-slate-50 flex items-center justify-center">
                       <img 
                         src={uploadedImage ? URL.createObjectURL(uploadedImage) : (image || "https://cdn-icons-png.flaticon.com/512/3774/3774299.png")} 
                         alt="Preview" 
                         className="w-full h-full object-cover"
                       />
                       <label htmlFor="profile-upload" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity cursor-pointer text-white">
                          <Upload size={24} className="mb-1" />
                          <span className="text-[8px] font-black uppercase tracking-widest">Update Photo</span>
                       </label>
                    </div>
                    {uploadedImage && <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-2 border-white z-20 animate-bounce"><CheckCircle size={14} /></div>}
                 </div>
                 <input id="profile-upload" type="file" className="hidden" onChange={handleFileChange} />
                 {message && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest text-center">{message}</p>}
              </div>

              {/* Data Inputs Section */}
              <div className="md:w-2/3 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all"
                        />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all"
                        />
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clinical Specialization</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all appearance-none"
                    >
                      <option value="">Select Department</option>
                      {allDepartment.map((dep) => (
                        <option key={dep._id} value={dep.categoryName}>{dep.categoryName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Education (Qualification)</label>
                     <div className="relative">
                       <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                       <input
                         type="text"
                         value={qualification}
                         onChange={(e) => setQualification(e.target.value)}
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all"
                       />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Experience (Years)</label>
                     <div className="relative">
                       <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                       <input
                         type="text"
                         value={experience}
                         onChange={(e) => setExperience(e.target.value)}
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all"
                         placeholder="e.g. 10+ Years"
                       />
                     </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Consultation Fee (₹)</label>
                      <div className="relative">
                        <Save className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                          type="number"
                          value={consultationFee}
                          onChange={(e) => setConsultationFee(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all"
                          placeholder="e.g. 500"
                        />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clinic Address</label>
                      <div className="relative">
                        <Save className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all"
                          placeholder="e.g. Medical City, Kochi"
                        />
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Bio (About)</label>
                  <div className="relative">
                    <textarea
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 transition-all resize-none"
                      placeholder="Share your expertise, achievements, and professional summary..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
               <label htmlFor="doctor_profile" className="flex-1 text-center py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer">
                  Dismiss
               </label>
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
               >
                 {isSubmitting ? "Sychronizing..." : <><Save size={16} /> Save Credentials</>}
               </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditDoctorProfile;
