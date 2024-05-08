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
    console.log("RestApi.js 裡的 getFavorite 回傳值: ", res.data);

    return res.data;
  } catch (error) {
    console.error("[Get Favorite failed]: ", error.response.data.message);
  }
};

export const ChosenRestaurant = async ( id ) => {
  try {
    const res = await axiosInstance.get(`/restaurants/${id}`);
    console.log("RestApi.js 裡的 ChosenRestaurant 回傳值: ", res.data);
    return res.data;
  } catch (error) {
    console.error("[Get ChosenRestaurant failed]: ", error.response.data.message);
  }
}

export const LikeRestaurant = async ({ restaurantName, address, priceLevel, restaurantId, photo, location}) => {
  try {
    const res = await axiosInstance.post(`/favorite`, {
      restaurantName, address, priceLevel, restaurantId, photo, location
    });
    console.log("RestApi.js 裡的 LikeRestaurant 回傳值: ", res.data);
    return res.data;
  } catch (error) {
    console.error("[Get LikeRestaurant failed]: ", error.response.data.message);
  }
};

export const UnlikeRestaurant = async ( restaurantId ) => {
  try {
    const res = await axiosInstance.delete(`/favorite/${restaurantId.restaurantId}`);
    console.log("RestApi.js 裡的 UnlikeRestaurant 回傳值: ", res.data);
    return res.data;
  } catch (error) {
    console.error("[Get UnlikeRestaurant failed]: ", error.response.data.message);
  }
};