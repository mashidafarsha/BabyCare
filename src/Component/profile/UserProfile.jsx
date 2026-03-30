import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../constants/constants";
import { getUserProfile } from "../../sevices/userApi";
import EditUserProfile from "./EditUserProfile";
import { User, Mail, Shield, Activity, Settings, Phone, Calendar, MapPin, Edit3 } from "lucide-react";
import MedicalHistory from "./MedicalHistory";
import { updateHealthStats } from "../../sevices/userApi";
import Swal from "sweetalert2";

function UserProfile() {
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState("");
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    getUserProfileData();
  }, [load]);

  const getUserProfileData = async () => {
    let { data } = await getUserProfile();
    if (data.success) {
      setUser(data.user);
      setVisitCount(data.visitCount || 0);
    }
  };

  const handleUpdateStats = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Update Health Stats',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Blood Pressure (e.g. 120/80)" value="${user.healthProfile?.bloodPressure || ''}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Heart Rate (bpm)" type="number" value="${user.healthProfile?.heartRate || ''}">` +
        `<input id="swal-input3" class="swal2-input" placeholder="Blood Sugar (mg/dL)" type="number" value="${user.healthProfile?.bloodSugar || ''}">` +
        `<input id="swal-input4" class="swal2-input" placeholder="Weight (kg)" type="number" value="${user.healthProfile?.weight || ''}">` +
        `<input id="swal-input5" class="swal2-input" placeholder="Height (cm)" type="number" value="${user.healthProfile?.height || ''}">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          bloodPressure: document.getElementById('swal-input1').value,
          heartRate: document.getElementById('swal-input2').value,
          bloodSugar: document.getElementById('swal-input3').value,
          weight: document.getElementById('swal-input4').value,
          height: document.getElementById('swal-input5').value,
        }
      }
    });

    if (formValues) {
      try {
        const { data } = await updateHealthStats(formValues);
        if (data.success) {
          Swal.fire('Success', 'Health stats updated!', 'success');
          getUserProfileData();
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to update stats', 'error');
      }
    }
  };

  const handleLoad = () => {
    setLoad(!load);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-blue-600 h-24"></div>
              <div className="px-8 pb-8 -mt-12">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white">
                    <img 
                      className="w-full h-full object-cover" 
                      src={user.image ? `${BaseUrl}/${user.image}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                      alt="User Profile"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">{user.name || "Guest User"}</h2>
                  <p className="text-sm font-medium text-slate-500">Patient ID: TRU-{user._id?.slice(-6).toUpperCase()}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail size={18} className="text-blue-600" />
                    <span className="text-sm truncate">{user.email || "No email provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Shield size={18} className="text-blue-600" />
                    <span className="text-sm font-bold text-blue-600">
                      {user?.plans?.length > 0 ? "Premium Member" : "Basic Member"}
                    </span>
                  </div>
                </div>

                <label 
                  htmlFor="user_profile" 
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl cursor-pointer transition-all active:scale-95"
                >
                  <Settings size={18} /> Edit Profile
                </label>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Visits</p>
                <p className="text-2xl font-bold text-blue-600">{visitCount}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Healthy</p>
                <p className="text-2xl font-bold text-green-500">Stable</p>
              </div>
            </div>
          </div>

          {/* Right Column: Health Overview & History */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Health Overview</h3>
                    <p className="text-sm text-slate-500 font-medium">Your latest clinical data and activity</p>
                  </div>
                </div>
                <button 
                  onClick={handleUpdateStats}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-lg transition-all"
                >
                  <Edit3 size={14} /> Update Stats
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Blood Pressure", val: user?.healthProfile?.bloodPressure || "120/80", unit: "mmHg", color: "text-blue-600" },
                  { label: "Heart Rate", val: user?.healthProfile?.heartRate || "72", unit: "bpm", color: "text-red-500" },
                  { label: "Blood Sugar", val: user?.healthProfile?.bloodSugar || "90", unit: "mg/dL", color: "text-green-500" }
                ].map((stat, i) => (
                  <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-tight">{stat.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-bold ${stat.color}`}>{stat.val}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{stat.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical History Section */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
               <MedicalHistory />
            </div>
          </div>
        </div>
      </div>
      <EditUserProfile handleLoad={handleLoad} />
    </div>
  );
}

export default UserProfile;