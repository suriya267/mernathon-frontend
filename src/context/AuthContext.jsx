import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { getAuthToken, setAuthToken } from "../utils/localStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async () => {
    const url = currentState === "Login" ? "/login" : "/signup";

    try {
      const { name, ...rest } = form;
      const loginSignupForm = currentState === "Login" ? rest : form
      const response = await axiosInstance.post(`/auth${url}`, loginSignupForm);

      setAuthToken(response.data.token)

      console.log("response.data.token", response.data.token);

      if (currentState === "Login") {
        console.log("getAuthToken()", getAuthToken());

        if (getAuthToken()) {
          navigate("/");
          alert("Login successful");
        } else {
          alert(data.message || "Login failed");
        }
      } else {
        alert("Signup successful. Please log in.");
        setCurrentState("Login");
        setForm({ email: "", password: "" });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  const getUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await axiosInstance.get("/auth/user");
      return response.data.user;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch user profile";
      throw new Error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentState,
        setCurrentState,
        form,
        setForm,
        onChange,
        onSubmitHandler,
        getUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
