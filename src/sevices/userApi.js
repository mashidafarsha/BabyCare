import userAxiosInstance from "../axios/userAxios";

const authUser = () => {
  return userAxiosInstance("userToken").get("/auth");
};

const userSignup = (name, email, phone, password, cPassword) => {
  return userAxiosInstance().post("/userSignup", {
    name,
    email,
    phone,
    password,
    cPassword,
  });
};
const userOtpSubmit = (otp) => {
  return userAxiosInstance().post("/userOtpSubmit", { otp });
};

const userLogin = (email, password) => {
  return userAxiosInstance().post("/userLogin", { email, password });
};

const getBanner = () => {
  return userAxiosInstance("userToken").get("/getBanner");
};

const getDoctorsData = () => {
  return userAxiosInstance("userToken").get("/getdoctor");
};

const getDepartmentData = () => {
  return userAxiosInstance("userToken").get("/getDepartment");
};
const getPlans = () => {
  return userAxiosInstance("userToken").get("/getPlans");
};

const  categoryDoctors = (departmentNames) => {
  console.log(departmentNames,"cataegdryanabe");
  return userAxiosInstance("userToken").post("/getcategoryDoctor", {
    departmentNames,
  });
};

const getSelectedDoctorDetails=(doctorId)=>{
  return userAxiosInstance("userToken").post(`/getSelDoctorData/${doctorId}`);
}

const RazorPayPayment = (id, amount, offerAmount) => {
  return userAxiosInstance("userToken").post("/razorPayment", {
    id,
    amount,
    offerAmount,
  });
};

const verifyPayment = (response, id) => {
   
  return userAxiosInstance("userToken").post("/verifyPayment", {
    ...response,
    id,
  });
};

const getUserPlanDetails = (consultationFee) => {

return userAxiosInstance("userToken").post("/getSlectedPlan", {
consultationFee
});
};

const SlotBookingRazorpay= (totalAmount) => {
  console.log("hi");
  return userAxiosInstance("userToken").post("/slotBookingrazorPayment", {
  
    totalAmount,
 
  });
};

const verifySlotPayment = (response,userSelectTime,totalAmount,doctorId,doctorName,doctorDep) => {
 
return userAxiosInstance("userToken").post("/verifySlotPayment", {
  ...response,
  userSelectTime,totalAmount,doctorId,doctorName,doctorDep
});
};

const userBookingData = () => {
  return userAxiosInstance("userToken").get("/getBookingData");
};
const  cancelUserSlot = (bookingId) => {
  return userAxiosInstance("userToken").put(`/cancelUserBooking/${bookingId}`);
};

const  getUserProfile = () => {

  return userAxiosInstance("userToken").get("/getUserData");
};

const editUser = (formData) => {

  return userAxiosInstance("userToken").post("/editUser", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const getUserBookedSlot=(doctorId)=>{
 
  return userAxiosInstance("userToken").get(`/getUserBookedSlot/${doctorId}`);
}

const addUserMessage=({from,to,message})=>{
 
  return userAxiosInstance("userToken").post("/addMessage", {
    from,to,message
  });
  };

  const getMessages=({from,to})=>{
    return userAxiosInstance("userToken").post("/getAllMessage", {
      from,to    });
  }
  const checkUserAnyPlan=()=>{
    
    return userAxiosInstance("userToken").get("/checkUserPlan")
     
  }

export {
  authUser,
  userSignup,
  userOtpSubmit,
  userLogin,
  getBanner,
  getDoctorsData,
  getDepartmentData,
  getPlans,
  categoryDoctors,
  getSelectedDoctorDetails,
  RazorPayPayment,
  verifyPayment,
  getUserPlanDetails,
  SlotBookingRazorpay,
  verifySlotPayment,
  userBookingData,
  cancelUserSlot,
  getUserProfile,
  editUser,
  getUserBookedSlot,
  addUserMessage,
  getMessages,
  checkUserAnyPlan
  
};
