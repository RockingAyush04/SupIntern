import React, { createContext, useContext, useState } from "react";
import { users as initialUsers } from "../data/users";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(initialUsers);
  const [user, setUser] = useState(null);
  const navigate=useNavigate();

  // Login
  const login = ({ email, password }) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password && u.status === "active"
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    } else {
      setUser(null);
      return false;
    }
  };

  // Signup (pending status)
  const signup = ({ email, password, name }) => {
    if (users.some((u) => u.email === email)) {
      return { success: false, message: "Email already registered." };
    }
    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      role: null,
      status: "pending",
      supervisorId: null,
    };
    setUsers((prev) => [...prev, newUser]);
    return { success: true };
  };

  // Logout
  const logout = () => {
    setUser(null);
    navigate("/");
  }

  // Admin: Approve user and assign role/supervisor
  const approveUser = (userId, role, supervisorId = null) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              role,
              status: "active",
              supervisorId: role === "intern" ? supervisorId : null,
            }
          : u
      )
    );
  };

  // Admin: Pending users
  const getPendingUsers = () => users.filter((u) => u.status === "pending");

  // Admin: Supervisors
  const getSupervisors = () => users.filter((u) => u.role === "supervisor");

  // Admin: Interns of supervisor
  const getInternsOfSupervisor = (supervisorId) =>
    users.filter((u) => u.role === "intern" && u.supervisorId === supervisorId);

  // Admin: Supervisor with interns
  const getSupervisorsWithInterns = () =>
    getSupervisors().map((sup) => ({
      ...sup,
      interns: getInternsOfSupervisor(sup.id),
    }));

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        users,
        approveUser,
        getPendingUsers,
        getSupervisors,
        getInternsOfSupervisor,
        getSupervisorsWithInterns,
        setUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}