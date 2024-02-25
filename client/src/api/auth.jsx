import { useState, createContext } from "react"
import { Navigate, useLocation } from "react-router-dom";
import axios from 'axios';

export const AuthContext = createContext(0)

export function AuthContextProvider({children}){  
    const [Auth, setAuth] = useState(1);
    return (
        <AuthContext.Provider value={{Auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

//無認證跳到登入頁面，有認證跳到首頁
export function RequireAuth ({children, auth}){
    let location = useLocation();
    if (!auth) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }else{
      return children
    }     
}




const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });

    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
};