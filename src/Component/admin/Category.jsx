import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../constants/constants";
import AddCategory from "../../Component/admin/AddCategory";
import EditCategory from "../../Component/admin/EditCategory";
import { getCategory, deletedepartment } from "../../sevices/adminApi";
import Swal from "sweetalert2";
import { Plus, Edit3, Trash2, Stethoscope, Search, MoreVertical, Terminal, Activity, Layers, ArrowUpRight, ShieldCheck, Microscope } from "lucide-react";

function Category() {
  const [department, setDepartment] = useState([]);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [load, setLoad] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    getAllDepartment();
  }, [load]);

  const handleLoad = () => {
    setLoad(!load);
  };

  const getAllDepartment = async () => {
    setLoading(true);
    setIsSyncing(true);
    try {
      let { data } = await getCategory();
      if (data) {
        setDepartment(data.department);
      }
    } catch (error) {
      console.error("Clinical department synchronization failed:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setIsSyncing(false), 500);
    }
  };

  const deleteCategory = (categoryId) => {
    try {
      Swal.fire({
        title: "Decommission Speciality?",
        text: "This clinical department and all associated mappings will be archived.",
        icon: "warning",
        background: "#0f172a",
        color: "#f8fafc",
        showCancelButton: true,
        confirmButtonColor: "#EF4444",
        cancelButtonColor: "#334155",
        confirmButtonText: "Confirm Decommission",
        customClass: {
          popup: 'rounded-[3rem] border border-white/5 shadow-2xl',
          title: 'font-black uppercase tracking-tighter italic text-3xl',
          confirmButton: 'rounded-2xl font-black uppercase tracking-widest text-[10px] px-10 py-5',
          cancelButton: 'rounded-2xl font-black uppercase tracking-widest text-[10px] px-10 py-5'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          let { data } = await deletedepartment(categoryId);
          if (data.success) {
            Swal.fire({
              icon: "success",
              title: "Speciality Archived",
              text: "The clinical department has been successfully decommissioned.",
              background: "#0f172a",
              color: "#f8fafc",
              timer: 2000,
              showConfirmButton: false,
              borderRadius: "2rem"
            });
            getAllDepartment();
          }
        }
      });
    } catch (error) {
       console.error("Decommissioning sequence interrupted:", error);
    }
  };

  const filteredDepartments = department?.filter(dep => 
    dep.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* Cinematic Architecture Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-slate-200/60 pb-12 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full border border-white/5 shadow-2xl">
             <Terminal size={12} className="text-blue-500 animate-pulse" />
             <span className="text-[9px] font-black text-white uppercase tracking-[0.4em] italic leading-none">Clinical Architecture Control</span>
          </div>
          <div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
              Speciality <span className="text-blue-600">Ops</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] italic mt-6 border-l-4 border-blue-600 pl-8 max-w-xl">
              Mapping institutional clinical departments and defining the architectural specialities within the TRUE CARE healthcare cluster.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10">
           <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Scan Speciality Node..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2.5rem] focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-400 transition-all text-sm font-black text-slate-800 shadow-sm placeholder:text-slate-300 italic uppercase tracking-widest"
              />
           </div>
           <div className="flex items-center gap-3">
              <button 
                onClick={getAllDepartment}
                className={`p-5 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 group relative overflow-hidden`}
              >
                 <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                 <Activity size={20} className={`relative z-10 ${isSyncing ? "animate-spin" : "group-hover:rotate-12 transition-transform"}`} />
              </button>
              <label
                htmlFor="add-category"
                className="bg-blue-600 hover:bg-slate-900 text-white px-10 py-5 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-blue-100 transition-all active:scale-95 flex items-center gap-3 cursor-pointer italic group/add relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/add:translate-y-0 transition-transform duration-500"></div>
                <div className="relative z-10 flex items-center gap-3">
                   <Plus size={18} />
                   Add Speciality
                </div>
              </label>
           </div>
        </div>
      </div>

      <AddCategory handleLoad={handleLoad} load={load} />

      {/* Main Architectural Ledger */}
      <div className="bg-white rounded-[4rem] border border-slate-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-48"></div>
        
        {loading ? (
          <div className="p-20 space-y-6">
             {[1,2,3,4].map(i => (
               <div key={i} className="flex gap-10 items-center animate-pulse">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl"></div>
                  <div className="flex-1 h-12 bg-slate-50 rounded-2xl"></div>
                  <div className="w-20 h-14 bg-slate-50 rounded-2xl"></div>
                  <div className="w-32 h-12 bg-slate-50 rounded-2xl"></div>
               </div>
             ))}
          </div>
        ) : filteredDepartments?.length > 0 ? (
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Sequence Node</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Departmental Artifact</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Clinical Iconography</th>
                  <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic text-right">Operational Scale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDepartments.map((dep, index) => (
                  <tr key={dep._id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-12 py-8">
                       <div className="w-12 h-12 rounded-[1.2rem] bg-slate-900 text-white flex items-center justify-center font-black italic shadow-xl group-hover:bg-blue-600 group-hover:rotate-12 transition-all">
                          {String(index + 1).padStart(2, '0')}
                       </div>
                    </td>
                    <td className="px-12 py-8">
                      <div className="flex items-center gap-6">
                        <div className="bg-blue-600/5 p-4 rounded-[1.5rem] text-blue-600 border border-blue-100 shadow-inner group-hover:scale-110 transition-transform">
                           <Microscope size={24} />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-lg uppercase tracking-tight italic">{dep.categoryName}</p>
                          <div className="flex items-center gap-2 mt-1.5 px-3 py-1 bg-white border border-slate-100 rounded-full w-fit">
                             <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                             <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">Core Speciality Node</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-8">
                       <div className="relative group/asset cursor-pointer w-24 h-16">
                          <div className="absolute -inset-2 bg-blue-600/20 rounded-[1.8rem] blur opacity-0 group-hover/asset:opacity-100 transition-opacity"></div>
                          <div className="w-full h-full rounded-[1.4rem] border-2 border-white shadow-xl overflow-hidden bg-slate-100 group-hover/asset:scale-110 transition-transform duration-700 relative z-10">
                             <img
                               className="w-full h-full object-cover"
                               src={dep.image.startsWith('http') ? dep.image : `${BaseUrl}/${dep.image}`}
                               alt={dep.categoryName}
                             />
                          </div>
                       </div>
                    </td>
                    <td className="px-12 py-8">
                      <div className="flex items-center justify-end gap-3">
                        <label
                          htmlFor="editCategory"
                          onClick={() => setCategory(dep)}
                          className="p-5 rounded-[1.8rem] bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all cursor-pointer shadow-sm active:scale-95 group/edit"
                        >
                          <Edit3 size={20} className="group-hover/edit:rotate-12 transition-transform" />
                        </label>
                        <button
                          onClick={() => deleteCategory(dep._id)}
                          className="p-5 rounded-[1.8rem] bg-white border border-slate-100 text-slate-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm active:scale-95 group/del"
                        >
                          <Trash2 size={20} className="group-hover/del:-translate-y-1 transition-transform" />
                        </button>
                        <button className="p-5 bg-white text-slate-300 border border-slate-100 rounded-[1.8rem] hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
                           <MoreVertical size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-32 flex flex-col items-center justify-center text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]"></div>
             <div className="relative z-10">
               <div className="bg-slate-50 p-12 rounded-[4rem] text-slate-200 mb-10 border border-slate-100 shadow-inner group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
                  <Stethoscope size={80} />
               </div>
               <h3 className="font-black text-slate-900 uppercase tracking-tighter text-4xl italic">Institutional Void</h3>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] mt-6 max-w-sm mx-auto italic">No clinical specialities have been defined within the TRUE CARE architectural matrix.</p>
               <label htmlFor="add-category" className="mt-12 flex items-center gap-3 mx-auto px-10 py-5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all italic cursor-pointer">
                  <Plus size={16} /> Provision First Speciality
               </label>
             </div>
          </div>
        )}
      </div>

      {/* Institutional Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden h-48 flex flex-col justify-between shadow-2xl shadow-blue-900/10 group">
            <Layers size={64} className="absolute right-0 bottom-0 -mb-4 -mr-4 text-white opacity-5 group-hover:scale-125 transition-transform" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Clinical Depth</p>
            <h4 className="text-5xl font-black italic tracking-tighter tabular-nums">{department.length} Nodes</h4>
         </div>
         <div className="bg-white rounded-[3rem] p-10 border border-slate-100 flex flex-col justify-between h-48 group shadow-sm">
            <ShieldCheck size={48} className="text-blue-500 opacity-20 group-hover:scale-110 transition-transform" />
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic leading-none mb-2">Architectural Integrity</p>
               <div className="flex items-center gap-2">
                  <span className="text-4xl font-black text-slate-900 italic tracking-tighter">Unified</span>
                  <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">Certified</div>
               </div>
            </div>
         </div>
         <div className="bg-white rounded-[3rem] p-10 border border-slate-100 flex flex-col items-center justify-center text-center h-48 group shadow-sm">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic mb-4">Functional Spectrum</h5>
            <div className="flex items-center gap-2">
               {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="w-1.5 h-6 bg-blue-600 rounded-full group-hover:scale-y-125 transition-transform" style={{ transitionDelay: `${i*50}ms` }}></div>)}
            </div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-4">Full Operational Capacity</p>
         </div>
      </div>
      
      <EditCategory category={category} handleLoad={handleLoad} />
    </div>
  );
}

export default Category;
