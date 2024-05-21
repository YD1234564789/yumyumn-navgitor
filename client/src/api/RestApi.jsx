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

//我的最愛列表
export const getFavorite = async () => {
  try {
    const res = await axiosInstance.get(`/favorites`);
    console.log("RestApi.js 裡的 getFavorite 回傳值: ", res.data);

    return res.data;
  } catch (error) {
    console.error("[Get Favorite failed]: ", error.response.data.message);
  }
};

//點清單裡的更多後，會顯示餐廳的更多內容
export const ChosenRestaurant = async ( id ) => {
  try {
    const res = await axiosInstance.get(`/restaurants/${id}`);
    console.log("RestApi.js 裡的 ChosenRestaurant 回傳值: ", res.data);
    return res.data;
  } catch (error) {
    console.error("[Get ChosenRestaurant failed]: ", error.response.data.message);
  }
}

//把搜尋的餐廳加入我的最愛
export const LikeRestaurant = async ({ restaurantName, address, priceLevel, restaurantId, photo, location, userRatingsTotal,
  rating }) => {
  try {
    const res = await axiosInstance.post(`/favorite`, {
      restaurantName, address, priceLevel, restaurantId, photo, location, userRatingsTotal, rating
    });
    console.log("RestApi.js 裡的 LikeRestaurant 回傳值: ", res.data);
    return res.data;
  } catch (error) {
    console.error("[Get LikeRestaurant failed]: ", error.response.data.message);
  }
};

//把餐廳從我的最愛中移除
export const UnlikeRestaurant = async ( restaurantId ) => {
  try {
    const res = await axiosInstance.delete(`/favorite/${restaurantId.restaurantId}`);
    console.log("RestApi.js 裡的 UnlikeRestaurant 回傳值: ", res.data);
    return res.data;
  } catch (error) {
    console.error("[Get UnlikeRestaurant failed]: ", error.response.data.message);
  }
};

//修改備註
export const ChangeComment = async ( {restaurantId, comment} ) => {
  try {
    const res = await axiosInstance.post(`/comments/${restaurantId}`,{comment});
    console.log("RestApi.js 裡的 ChangeComment 回傳值: ", res.data);
    return res.data;
  } catch (error) {
    console.error("[Get ChangeComment failed]: ", error.response.data.message);
  }
};