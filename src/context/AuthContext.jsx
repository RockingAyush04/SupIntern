import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // AUTOMATICALLY SWITCH BETWEEN LOCALHOST AND RENDER
  // If running "npm run dev", use localhost
  // If running on Vercel (Production), use Render URL
  const API_BASE_URL = import.meta.env.MODE === "development" 
    ? "http://localhost:4000" 
    : "https://supintern.onrender.com";

  // Login using backend API
  const login = async ({ email, password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        return true;
      }
      setUser(null);
      return false;
    } catch (err) {
      console.error("Login Error:", err);
      return { success: false, message: "Network or Server Error" };
    }
  };

  // Signup using backend API
  const signup = async ({ name, email, password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return { success: false, message: "Signup failed. Please try again." };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    navigate("/");
  };

  // Fetch all pending users
  const getPendingUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/pending`);
    return await response.json();
  };

  // Approve a user
  const approveUser = async (userId, role, supervisorId = null) => {
    const response = await fetch(`${API_BASE_URL}/api/users/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role, supervisorId }),
    });
    const data = await response.json();
    return data.success;
  };

  // Fetch all supervisors
  const getSupervisors = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/supervisors`);
    return await response.json();
  };

  // Fetch all interns of a supervisor
  const getInternsOfSupervisor = async (supervisorId) => {
    const response = await fetch(`${API_BASE_URL}/api/users/interns/${supervisorId}`);
    return await response.json();
  };

  // Fetch all users (optional for admin listing)
  const getAllUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/all`);
    return await response.json();
  };

  const getTasksForUser = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/api/tasks/user/${userId}`);
    return await response.json();
  };

  const addTask = async (task) => {
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return await response.json();
  };

  const editTask = async (taskId, task) => {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return await response.json();
  };

  const deleteTask = async (taskId) => {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: "DELETE",
    });
    return await response.json();
  };

  

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        getPendingUsers,
        approveUser,
        getSupervisors,
        getInternsOfSupervisor,
        getAllUsers,
        setUser,
        addTask,
        getTasksForUser,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}