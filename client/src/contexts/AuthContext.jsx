import React,{useState, useContext} from 'react'
import {createContext} from 'react'
const AuthContext=createContext();


export default function AuthProvider({children}) {
    const [token, setToken]=useState(localStorage.getItem('token'))
    const Logout=()=>
    {
        setToken("");
        localStorage.removeItem("token")
    }
    const isLoggedIn=!!token
    const storeToken=(serverToken)=>
    {
        localStorage.setItem('token', serverToken)
        setToken(serverToken)
    }
  return (
    <AuthContext.Provider value={{storeToken, Logout, isLoggedIn, token}}>
        {children}
    </AuthContext.Provider>
  )
}
export const useAuthContext=()=>useContext(AuthContext);
