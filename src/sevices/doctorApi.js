import doctorAxiosInstance from "../axios/doctorAxios";

const authDoctor = () => {
  return doctorAxiosInstance("doctorToken").get("/auth");
};

const doctorLogin = (values) => {
  return doctorAxiosInstance().post("/doctorLogin", { ...values });
};
const doctorSignup = (values) => {
  return doctorAxiosInstance().post("/doctorSignup", { ...values });
};

const sendOtp = (otp) => {
  return doctorAxiosInstance().post("/doctorOtp", { otp });
};

const doctorInfo = (formData) => {
  return doctorAxiosInstance().post("/doctorInfo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const getApprovelreason = () => {
  return doctorAxiosInstance("doctorWaitingToken").get("/getReason");
};
const editDoctor = (formData) => {
  console.log(formData, "oooooo");
  return doctorAxiosInstance("doctorToken").post("/editDoctor", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const getCategory = () => {
  return doctorAxiosInstance().get("/getDepartment");
};
const doctorSelectSlot = (selectedTime) => {
  return doctorAxiosInstance("doctorToken").post("/doctorSelectSlot", {
    selectedTime,
  });
};

const scheduledDoctorSlot = () => {
  console.log("uuuu");
  return doctorAxiosInstance("doctorToken").get("/getScheduledSlot");
};
const getNavProfile = () => {
  return doctorAxiosInstance("doctorToken").post("/getDoctorNav");
};
export {
  authDoctor,
  doctorLogin,
  doctorSignup,
  sendOtp,
  doctorInfo,
  getApprovelreason,
  editDoctor,
  getCategory,
  doctorSelectSlot,
  scheduledDoctorSlot,
  getNavProfile
};
