import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-blue-600 text-white">
      <Link to="/" className="font-bold text-xl">Intern Task Tracker</Link>
      <div>
        {user && user.role === "intern" && <Link to="/intern" className="mr-4">Intern Dashboard</Link>}
        {user && user.role === "supervisor" && <Link to="/supervisor" className="mr-4">Supervisor Dashboard</Link>}
        {user && user.role === "admin" && <Link to="/admin" className="mr-4">Admin Dashboard</Link>}
        {!user && <Link to="/signup" className="mr-4">Sign Up</Link>}
        {user && <button onClick={handleLogout} className="bg-white text-blue-600 px-3 py-1 rounded">Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;