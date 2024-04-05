import { useState, createContext } from "react";

export const InformContext = createContext(0)

export function InformContextProvider({children}){   
    const [userlocation, setUserlocation] = useState({lat: 23.553118, lng: 121.0211024})
    const [searchr, setSearchr] = useState({type:"" , distance:"", rating:"",priceLevel:"", lat:"", lng:"" })
    return (
        <InformContext.Provider value={{userlocation, setUserlocation, searchr, setSearchr }}>
          {children}
        </InformContext.Provider>
      )
}