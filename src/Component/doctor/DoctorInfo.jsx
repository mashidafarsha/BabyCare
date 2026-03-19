import React, { useEffect, useState } from "react";
import { getCategory, doctorInfo } from "../../sevices/doctorApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, GraduationCap, Briefcase, DollarSign, Upload, ShieldCheck, Activity, ArrowRight, Zap, FileText } from "lucide-react";

function DoctorInfo() {
  const [allDepartment, setAllDepartment] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    department: "",
    experience: "",
    consultationFee: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("doctorWaitingToken")) {
      navigate("/doctor/waiting");
    }
    getAllDepartment();
  }, [navigate]);

  const generateError = (err) => {
    Swal.fire({
      icon: "error",
      title: "Credential Error",
      text: err,
      borderRadius: "2rem",
      confirmButtonColor: "#1e293b"
    });
  };

  const generateSuccess = (msg) => {
    Swal.fire({
      icon: "success",
      title: "Protocol Success",
      text: msg,
      showConfirmButton: false,
      timer: 2500,
      borderRadius: "2.5rem"
    });
  };

  const checkFileExtension = (filename) => {
    const allowedExtensions = /(\.doc|\.docx|\.pdf|\.txt)$/i;
    return allowedExtensions.test(filename);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && checkFileExtension(selectedFile.name)) {
      setFile(selectedFile);
      setMessage(null);
    } else {
      setFile(null);
      setMessage("Restricted Format: Please utilize .doc, .docx, or .pdf institutional files.");
    }
  };

  const getAllDepartment = async () => {
    try {
      let { data } = await getCategory();
      if (data) setAllDepartment(data.departmentData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return generateError("Institutional Verification Documents are mandatory.");
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", file);
    Object.keys(values).forEach(key => formData.append(key, values[key]));

    try {
      let { data } = await doctorInfo(formData);
      if (data.success) {
        generateSuccess(data.message);
        localStorage.setItem("doctorWaitingToken", data.token);
        navigate("/doctor/waiting");
      } else {
        generateError(data.message);
      }
    } catch (err) {
      console.error(err);
      generateError("Service connection failure during credential transmission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-12 font-sans animate-in fade-in duration-1000">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-blue-50/50 rounded-full blur-[140px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[45rem] h-[45rem] bg-indigo-50/50 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-slate-100 overflow-hidden relative z-10 transition-all duration-700 hover:shadow-blue-900/5">
        
        {/* Cinematic Clinical Header */}
        <div className="bg-slate-900 p-12 lg:p-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4">
                 <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
                    <Activity size={14} className="text-blue-400 animate-pulse" />
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] italic leading-none">Institutional Protocol Active</span>
                 </div>
                 <h1 className="text-4xl lg:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Practitioner <span className="text-blue-500 underline-offset-8 decoration-slate-800">Credentialing</span></h1>
                 <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] italic max-w-lg">Enter your professional telemetry and upload institutional verification documents to complete your onboarding cycle.</p>
              </div>
              <div className="hidden lg:block">
                 <ShieldCheck size={100} className="text-slate-800 opacity-50" />
              </div>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="p-12 lg:p-20 space-y-16">
          {/* Identity Vault Section */}
          <div className="space-y-12">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
               <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <User size={20} />
               </div>
               <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] italic">Clinical Identity Vault</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="group space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-focus-within:text-blue-600 transition-colors italic">Full Practitioner Name</label>
                <div className="relative">
                   <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                   <input
                     type="text"
                     placeholder="Dr. Alexander Wright"
                     className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.8rem] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300"
                     onChange={(e) => setValues({ ...values, name: e.target.value })}
                     required
                   />
                </div>
              </div>

              <div className="group space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-focus-within:text-blue-600 transition-colors italic">Registry Email Address</label>
                <div className="relative">
                   <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                   <input
                     type="email"
                     placeholder="practitioner@truecare.app"
                     className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300"
                     onChange={(e) => setValues({ ...values, email: e.target.value })}
                     required
                   />
                </div>
              </div>

              <div className="group space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-focus-within:text-blue-600 transition-colors italic">Contact Telemetry</label>
                <div className="relative">
                   <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                   <input
                     type="text"
                     placeholder="+1 (800) TRUE-CARE"
                     className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.8rem] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300"
                     onChange={(e) => setValues({ ...values, phone: e.target.value })}
                     required
                   />
                </div>
              </div>

              <div className="group space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-focus-within:text-blue-600 transition-colors italic">Academic Qualification</label>
                <div className="relative">
                   <GraduationCap className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                   <input
                     type="text"
                     placeholder="MBBS, MD Pediatric Medicine"
                     className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.8rem] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300"
                     onChange={(e) => setValues({ ...values, qualification: e.target.value })}
                     required
                   />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Architecture Section */}
          <div className="space-y-12">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
               <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Briefcase size={20} />
               </div>
               <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] italic">Professional Architecture</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="group space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-focus-within:text-blue-600 transition-colors italic">Clinical Department</label>
                <div className="relative">
                   <Zap className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                   <select
                     onChange={(e) => setValues({ ...values, department: e.target.value })}
                     className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.8rem] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-black text-slate-700 appearance-none cursor-pointer"
                     required
                   >
                     <option value="" disabled selected>Select Specialized Unit</option>
                     {allDepartment.map((dept, idx) => (
                       <option key={idx} value={dept.categoryName}>{dept.categoryName}</option>
                     ))}
                   </select>
                </div>
              </div>

              <div className="group space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-focus-within:text-blue-600 transition-colors italic">Clinical Experience (Years)</label>
                <div className="relative">
                   <Activity className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                   <input
                     type="number"
                     placeholder="Duration of Expertise..."
                     className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.8rem] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-bold text-slate-700"
                     onChange={(e) => setValues({ ...values, experience: e.target.value })}
                     required
                   />
                </div>
              </div>

              <div className="group space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-focus-within:text-blue-600 transition-colors italic">Consultation Fee Architecture</label>
                <div className="relative">
                   <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                   <input
                     type="number"
                     placeholder="Establish Standard Rate..."
                     className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.8rem] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm font-bold text-slate-700"
                     onChange={(e) => setValues({ ...values, consultationFee: e.target.value })}
                     required
                   />
                </div>
              </div>

              <div className="group space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-focus-within:text-blue-600 transition-colors italic">Institutional Verification Documents</label>
                <label className={`relative block group/file cursor-pointer ${file ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'} border-2 border-dashed rounded-[1.8rem] p-5 transition-all hover:bg-slate-100`}>
                   <input
                     type="file"
                     className="hidden"
                     name="file"
                     onChange={handleFileChange}
                     required
                   />
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${file ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-300 shadow-sm'}`}>
                         {file ? <FileText size={20} /> : <Upload size={20} />}
                      </div>
                      <div className="min-w-0">
                         <p className={`text-[10px] font-black uppercase tracking-widest truncate ${file ? 'text-blue-600' : 'text-slate-400'}`}>
                           {file ? file.name : "Transmit Artifact (.PDF preferred)"}
                         </p>
                         {message && <p className="text-[8px] font-bold text-red-500 mt-1">{message}</p>}
                      </div>
                   </div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-12">
             <button
               type="submit"
               disabled={isSubmitting}
               className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[12px] hover:bg-blue-600 transition-all transform active:scale-[0.98] shadow-2xl shadow-slate-200 relative overflow-hidden group/submit flex items-center justify-center gap-4 italic"
             >
                <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover/submit:translate-y-0 transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center gap-4">
                   {isSubmitting ? "Transmitting Credentials..." : "Finalize Credential Submission"}
                   {!isSubmitting && <ArrowRight size={20} className="group-hover/submit:translate-x-2 transition-transform duration-500" />}
                </span>
             </button>
             <p className="text-center mt-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] italic">
                By submitting, you agree to institutional peer-review and identity verification protocols.
             </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorInfo;
