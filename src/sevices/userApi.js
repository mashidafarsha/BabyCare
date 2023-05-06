import userAxiosInstance from "../axios/userAxios";

const authUser = () => {
    return adminAxiosInstance("userToken").get("/auth");
  };

const userSignup=(name,email,phone,password,cPassword)=>{

    return userAxiosInstance().post("/userSignup",{name,email,phone,password,cPassword})
}
const userOtpSubmit=(otp)=>{
    return userAxiosInstance().post("/userOtpSubmit",{otp})
}

const userLogin=(email,password)=>{
    return userAxiosInstance().post("/userLogin",{email,password})
}

const getBanner=()=>{
    return userAxiosInstance("userToken").get("/getBanner")
}

const getDoctorsData=()=>{
   
    return userAxiosInstance("userToken").get("/getdoctor")
  
}

const getDepartmentData=()=>{
    return userAxiosInstance("userToken").get("/getDepartment")
}
const getPlans = () => {

    return userAxiosInstance("userToken").get("/getPlans");
  }
export{authUser,userSignup,userOtpSubmit,userLogin,getBanner,getDoctorsData,getDepartmentData,getPlans}