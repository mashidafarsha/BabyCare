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

const RazorPayPayment = (id, amount, offerAmount) => {
  return userAxiosInstance("userToken").post("/razorPayment", {
    id,
    amount,
    offerAmount,
  });
};

const verifyPayment = (response, id) => {
    console.log(response,id,"kkkkkkkkk");
  return userAxiosInstance("userToken").post("/verifyPayment", {
    ...response,
    id,
  });
};

const getSelectedPlan = (planId,consultationFee) => {
  
return userAxiosInstance("userToken").post("/getSlectedPlan", {
planId,consultationFee
});
};

const SlotBookingRazorpay= (totalAmount) => {
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
  console.log(formData, "oooooo");
  return userAxiosInstance("userToken").post("/editUser", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const getUserBookedSlot=(doctorId)=>{
 
  return userAxiosInstance("userToken").get(`/getUserBookedSlot/${doctorId}`);
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
  RazorPayPayment,
  verifyPayment,
  getSelectedPlan,
  SlotBookingRazorpay,
  verifySlotPayment,
  userBookingData,
  cancelUserSlot,
  getUserProfile,
  editUser,
  getUserBookedSlot
  
};
