import adminAxiosInstance from "../axios/adminAxios";

const adminLogin = (values) => {
  return adminAxiosInstance("adminToken").post("/adminLogin", { ...values });
};

const authAdmin = () => {
  return adminAxiosInstance("adminToken").get("/auth");
};

const addCategory = (formData) => {
  return adminAxiosInstance("adminToken").post("/addCategory", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const getCategory = () => {
  return adminAxiosInstance("adminToken").get("/category");
};

const deletedepartment = (categoryId) => {
  return adminAxiosInstance("adminToken").put(`/deleteCategory/${categoryId}`);
};

const editDepartment = (id, depname, depdescr,image) => {
  return adminAxiosInstance("adminToken").post("/editCategory", {
    id: id,
    categoryName: depname,
    description: depdescr,
    image:image
  },{
    headers: { "Content-Type": "multipart/form-data" },
  });
};
const getRegisterDoctor = () => {
  return adminAxiosInstance("adminToken").get("/getDoctor");
};
const acceptDoctor = (id) => {
  return adminAxiosInstance("adminToken").post(`/acceptDoctor/${id}`);
};
const rejectDoctor = (id, reason) => {
  return adminAxiosInstance("adminToken").post("/rejectDoctor", {
    id: id,
    reason: reason,
  });
};

const getBanner = () => {
  return adminAxiosInstance("adminToken").get("/getBanner");
};

const addBannerData = (formData) => {
  
  return adminAxiosInstance("adminToken").post("/addBanner", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const editBannerData = (id, bannerName, description,image) => {
    console.log(id, bannerName, description,image);
  return adminAxiosInstance("adminToken").post(
    "/editBanner",
    { id, bannerName, description,image},
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

const getApprovedDoctor = () => {
  return adminAxiosInstance("adminToken").get("/getApprovedDoctor");
};

const getAllUserData = () => {
  return adminAxiosInstance("adminToken").get("/getAllUser");
};

const bannerDelete = (Id) => {
  return adminAxiosInstance("adminToken").put(`/deleteBanner/${Id}`);
};

const addOurPlan=(formData)=>{
  return adminAxiosInstance("adminToken").post("/addPlans", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
const getPlans = () => {
  return adminAxiosInstance("adminToken").get("/getPlans");
};

const editOurPlan=(formData)=>{
  return adminAxiosInstance("adminToken").post("/editPlans", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
const deletePlans = (planId) => {
  return adminAxiosInstance("adminToken").put(`/deletePlan/${planId}`);
};
const deleteDoctor = (doctorId) => {
  return adminAxiosInstance("adminToken").put(`/blockDoctor/${doctorId}`);
};

const getAllBookingData = () => {
  return adminAxiosInstance("adminToken").get("/getAllBookingData");
};

const AllBookingDataForChart = () => {
  return adminAxiosInstance("adminToken").get("/getChartBookingData");
};


export {
 authAdmin,
  adminLogin,
  addCategory,
  getCategory,
  deletedepartment,
  editDepartment,
  getRegisterDoctor,
  acceptDoctor,
  rejectDoctor,
  getBanner,
  addBannerData,
  editBannerData,
  getApprovedDoctor,
  getAllUserData,
  bannerDelete,
  addOurPlan,
  getPlans,
  editOurPlan,
  deletePlans,
  deleteDoctor,
  getAllBookingData,
  AllBookingDataForChart
};
