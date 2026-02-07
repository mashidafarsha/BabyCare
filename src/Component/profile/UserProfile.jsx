import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../constants/constants";
import { getUserProfile } from "../../sevices/userApi";
import EditUserProfile from "./EditUserProfile";

function UserProfile() {
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    getUserProfileData();
  }, [load]);

  const getUserProfileData = async () => {
    let { data } = await getUserProfile();
    if (data.success) {
      setUser(data.user);
    }
  };

  const handleLoad = () => {
    setLoad(!load);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-md">
        {/* Background Decor */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="relative bg-white/80 backdrop-blur-lg border border-white shadow-2xl rounded-[3rem] overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            {/* Avatar Section */}
            <div className="relative inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-3xl overflow-hidden ring-4 ring-teal-50 shadow-inner">
                <img 
                  className="w-full h-full object-cover" 
                  src={user.image ? `${BaseUrl}/${user.image}` : "https://via.placeholder.com/150"} 
                  alt="Profile"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-teal-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-8 space-y-2">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight capitalize">
                {user.name || "User Name"}
              </h2>
              <p className="text-slate-500 font-medium text-sm tracking-wide">
                {user.email || "email@example.com"}
              </p>
            </div>

            {/* Quick Stats (Optional but looks good) */}
            <div className="flex justify-around mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Account</p>
                  <p className="text-sm font-bold text-teal-600">Active</p>
               </div>
               <div className="w-[1px] bg-slate-200"></div>
               <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Role</p>
                  <p className="text-sm font-bold text-blue-600">Patient</p>
               </div>
            </div>

            {/* Action Button */}
            <div className="mt-10">
              <label 
                htmlFor="user_profile" 
                className="inline-block w-full py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl cursor-pointer hover:bg-teal-600 hover:shadow-lg transition-all active:scale-95"
              >
                Edit Profile
              </label>
            </div>
          </div>
        </div>
      </div>
      <EditUserProfile handleLoad={handleLoad} />
    </div>
  );
}

export default UserProfile;