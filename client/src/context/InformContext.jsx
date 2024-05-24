import { useState, createContext } from "react";

export const InformContext = createContext(0)

export function InformContextProvider({children}){   

  //使用者定位
  const [userlocation, setUserlocation] = useState({lat: 23.553118, lng: 121.0211024})

  //搜尋條件
  const [searchr, setSearchr] = useState({type:"" , distance:"100", rating:"1",priceLevel:3, lat:userlocation.lat, lng:userlocation.lng, zoom:7 })

  //搜尋結果
  const [restaurantsResult, setRestaurantsResult] = useState ([])

  //喜愛清單
  const [favoriteList, setfavoriteList ] =useState()

  //地圖中心點
  const [mapCenter, setMapCenter] = useState({ lat: 23.553118, lng: 121.0211024 })

  return (
    <InformContext.Provider value={{userlocation, setUserlocation, searchr, setSearchr, restaurantsResult, setRestaurantsResult, favoriteList, setfavoriteList, mapCenter, setMapCenter }}>
      {children}
    </InformContext.Provider>
  )
}