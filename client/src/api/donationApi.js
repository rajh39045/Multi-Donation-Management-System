import API from "./axiosInstance";

export const createDonation = (data) => {
  return API.post("/donations", data);
};

export const getMyDonations = () => {
  return API.get("/donations/my");
};