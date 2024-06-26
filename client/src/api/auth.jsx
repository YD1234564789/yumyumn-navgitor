import { useState, createContext } from "react"
import { Navigate, useLocation } from "react-router-dom";
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
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
export function RequireAuth ({children, auth}){
    let location = useLocation();
    const path = useLocation().pathname
    if (!auth) {
      if (path === "/signup"){
        return children
      }else{
        return <Navigate to="/login" state={{ from: location }} replace />;
      }      
    }else{
      return children
    }     
}

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`/login`, {
      email,
      password,
    }); 
    const { token } = response.data.data
    if (token) {  
      return { success: true, token}
    } else {
      console.error('[Login Failed]: Unexpected response structure', response.data);
      return { success: false, message:'Unexpected response structure' };
    }
  } catch (error) {
    console.error('[Login Failed]:', error.response?.data || error.message);
    return { success: false, message: 'An login error occurred' };
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