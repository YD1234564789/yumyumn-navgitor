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

export const getFavorite = async () => {
  try {
    const res = await axiosInstance.get(`/favorites`);
    console.log("tweets.js 裡的 getFavorite 回傳值: ", res);
    return res.data;
  } catch (error) {
    console.error("[Get Favorite failed]: ", error.response.data.message);
  }
};