import { createContext, useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AuthContextProvider({ children }) {
   const navigate = useNavigate();
   const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      dateOfBirth: "",
      confirmPassword: "",
   });

   useEffect(() => {
      setIsLogin(!!localStorage.getItem("token"));
   }, []);

   const onLogin = async (data) => {
      try {
         const response = await axios.post(`${BASE_URL}/auth/login`, data);
         if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem("token", token);
            setIsLogin(true);
         }
      } catch (error) {
         console.error("Failed to login:", error);
         localStorage.removeItem("token");
         setIsLogin(false);
      }
   };

   const onSignUp = async (data) => {
      try {
         const response = await axios.post(`${BASE_URL}/auth/signup`, data);
         if (response.status === 201) {
            navigate("/login");
         }
      } catch (error) {
         console.error("Error at Signup:", error);
      }
   };

   const handleLogout = () => {
      localStorage.removeItem("token");
      setIsLogin(false);
      navigate("/login");
   };

   const fetchProfile = async () => {
      try {
         const response = await axios.get(`${BASE_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
         });
         return response.data;
      } catch (error) {
         console.error("Error:", error);
         return null;
      }
   };

   const contextValue = {
      isLogin,
      setIsLogin,
      formData,
      setFormData,
      onLogin,
      onSignUp,
      handleLogout,
      fetchProfile
   };

   return (
      <AuthContext.Provider value={contextValue}>
         {children}
      </AuthContext.Provider>
   );
}
