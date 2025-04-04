
"use client";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:4000/api/user";

export const loginUser  = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });

    if (response.data.token) {
      const { token, userId, username, role } = response.data;

      try {
        
        Cookies.set("token", token, { expires: 1, secure: true, sameSite: "Strict" });
      } catch (error) {
        console.error("Failed to set token in cookies:", error);
      }

      
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("role", role);

      return { success: true, message: "Login successful!", role };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Server error, try again!" };
  }
};

export const registerUser = async (email, password, username) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      email,
      password,
      username,
    });

    return { success: true, message: response.data.message };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { success: false, message: error.response.data.message };
    }
    return { success: false, message: "Server error. Please try again!" };
  }
};


export const logoutUser = () => {
  Cookies.remove("token");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  window.location.href = "/login";
};
