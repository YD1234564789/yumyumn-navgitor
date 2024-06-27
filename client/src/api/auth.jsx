import { useState, createContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import axios from 'axios';

export const AuthContext = createContext(0)

export function AuthContextProvider({children}){  
  const [auth, setAuth] = useState("");
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

//無認證跳到登入頁面，有認證維持當下頁面
export function RequireAuth ({auth}){
  return auth? <Outlet /> : <Navigate to="/login" />
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
    console.error('[Login Failed]:', error.response.data);
  }
};

export const signup = async ({ name, email, password, passwordCheck }) => {
  try {
    const { data } = await axios.post(`/signup`, {
      name,
      email,
      password,
      passwordCheck,
    });
    return data;
  } catch (error) {
    console.error('[Signup Failed]:', error.response.data);
  }
};