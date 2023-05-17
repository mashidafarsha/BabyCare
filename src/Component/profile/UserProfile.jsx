import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getUserProfile } from "../../sevices/userApi";
import EditUserProfile from "./EditUserProfile";
function UserProfile() {
  const [load, setLoad] = useState(false);
  const [user,setUser]=useState("")
  useEffect(() => {
    getUserProfileData();
  }, [load]);
 
  const getUserProfileData = async () => {
    let { data } = await getUserProfile();
    if(data.success){
      setUser(data.user)
    }
  };

  const handleLoad = () => {
    setLoad(!load);
  };
 
  return (
    <div>
      <div className="flex items-start justify-center w-full mt-8 ">
        <div className="shadow-xl card w-96 bg-[#7493a863] rounded-box bg-gradient-to-r from-teal-400">
          <figure className="px-10 pt-10">
            <div className="avatar">
              <div className="w-40 rounded-xl">
                <img className=""  src={`http://localhost:4000/${user.image}`} />
              </div>
            </div>
          </figure>
          <div className="items-center text-center card-body">
            <h2 className="card-title">{user.name}</h2>
            <p>{user.email}</p>
            <div className="card-actions">
              <label htmlFor="user_profile" className="btn">
                Edit your profile
              </label>
            </div>
          </div>
        </div>
      </div>
      <EditUserProfile handleLoad={handleLoad}/>
    </div>
  );
}

export default UserProfile;
