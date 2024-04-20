import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

export const SearchApi = async ({ type, distance, rating, priceLevel, latitude, longitude }) => {
  try {
    const res = await axiosInstance.post(`/restaurants`, {
      type, distance, rating, priceLevel, latitude, longitude,
    });
    console.log("SearchApi.js 裡的 SearchApi 回傳值: ", res.data);
    return res.data;
  } catch (error) {
    console.error("[Get SearchApi failed]: ", error.response.data.message);
  }
};