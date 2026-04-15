import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../constants/constants";
import { getMedicalRecords, getUserPrescriptions, uploadMedicalRecord } from "../../sevices/userApi";
import { toast } from "react-toastify";
import moment from "moment";
import { FileText, ClipboardList, Upload, Download, Calendar, Activity, Database, CheckCircle, FlaskConical, Stethoscope, ChevronRight, File } from "lucide-react";
import PrescriptionModal from "./PrescriptionModal";

function MedicalHistory() {
  const [activeTab, setActiveTab] = useState("prescriptions");
  const [records, setRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: recData } = await getMedicalRecords();
      setRecords(recData);

      const { data: prepData } = await getUserPrescriptions();
      console.log("Raw Prescription DB Fetch:", prepData);
      setPrescriptions(prepData);
    } catch (error) {
      console.error("Fetch Data Error:", error);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      toast.error("Please provide a title and select a file.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const { data } = await uploadMedicalRecord(formData);
      toast.success(data.message);
      setFile(null);
      setTitle("");
      fetchData(); 
    } catch (error) {
      toast.error("Error uploading record.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl overflow-hidden">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-2">
        {[
          { id: "prescriptions", label: "Prescriptions", icon: Stethoscope },
          { id: "records", label: "Medical Records", icon: FileText }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? "bg-white text-blue-600 shadow-sm border border-slate-100" : "text-slate-500 hover:text-slate-700"}`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-8">
        {activeTab === "prescriptions" && (
          <div className="space-y-6">
            {prescriptions.length === 0 ? (
              <div className="py-20 text-center">
                 <ClipboardList size={40} className="mx-auto text-slate-200 mb-4" />
                 <p className="text-sm font-medium text-slate-400">No medical records found yet.</p>
              </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="min-w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Doctor Name</th>
                        <th className="px-6 py-4">Specialization</th>
                        <th className="px-6 py-4 text-right">Prescription</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {prescriptions.map((p) => (
                        <tr key={p._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-slate-400" />
                              <span className="text-xs font-bold text-slate-600">{moment(p.date).format("MMM Do YY, h:mm a")}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                  <Stethoscope size={16} />
                               </div>
                               <span className="text-sm font-bold text-slate-800">Dr. {p.doctorId?.name}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className="text-xs font-medium text-slate-600">{p.doctorId?.department}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button 
                                onClick={() => {
                                  setSelectedPrescription(p);
                                  setIsModalOpen(true);
                                }}
                                className="px-4 py-2 bg-white text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 ml-auto"
                             >
                                <FileText size={14} /> View
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            )}
          </div>
        )}

        {activeTab === "records" && (
          <div>
            {/* Simple Upload */}
            <form onSubmit={handleFileUpload} className="mb-10 p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex flex-col lg:flex-row gap-6 items-end">
                <div className="flex-1 w-full space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Record Title</label>
                   <input 
                     type="text" 
                     placeholder="e.g. Blood Test Results" 
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium text-sm transition-all"
                   />
                </div>

                <div className="flex-1 w-full space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Select File</label>
                   <div className="relative bg-white border border-slate-200 rounded-xl p-2.5 flex items-center shadow-sm">
                      <input 
                        type="file" 
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full text-xs font-bold text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-slate-900 file:text-white file:uppercase file:tracking-widest cursor-pointer"
                      />
                   </div>
                </div>

                <button 
                  type="submit" 
                  disabled={uploading}
                  className="w-full lg:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-100 transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
                >
                  {uploading ? "Uploading..." : "Upload Record"} <Upload size={18} />
                </button>
              </div>
            </form>

            {/* Records Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {records.length === 0 ? (
                 <div className="col-span-2 py-20 text-center">
                    <File size={40} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-sm font-medium text-slate-400">No medical records uploaded.</p>
                 </div>
               ) : (
                  records.map((r) => (
                    <a 
                      key={r._id} 
                      href={`${BaseUrl}${r.fileUrl}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="group flex items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mr-5 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <FileText size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 text-sm mb-1 truncate group-hover:text-blue-600 transition-colors uppercase">{r.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{moment(r.uploadDate).format("DD MMM YYYY")}</p>
                      </div>
                      <div className="ml-4 p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 transition-colors">
                         <ChevronRight size={18} />
                      </div>
                    </a>
                  ))
               )}
            </div>
          </div>
        )}
      </div>

      <PrescriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPrescription={selectedPrescription} 
      />
    </div>
  );
}

export default MedicalHistory;
