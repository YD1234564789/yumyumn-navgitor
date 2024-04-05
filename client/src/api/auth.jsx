import { useState, createContext } from "react"
import { Navigate, useLocation } from "react-router-dom";
import axios from 'axios';

export const AuthContext = createContext(0)

export function AuthContextProvider({children}){  
  const [auth, setAuth] = useState("");
  console.log("AuthContext.auth",auth)
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

//無認證跳到登入頁面，有認證維持當下頁面
export function RequireAuth ({children, auth}){
    let location = useLocation();
    if (!auth) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }else{
      return children
    }     
}

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`/login`, {
      email,
      password,
    });
    const { token } = data.data;
    if (token) {
      return { success: true, ...data.data };
    }
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
};