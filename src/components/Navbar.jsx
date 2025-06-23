import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate("/"); // Redirect to home or login page after logout
  }

  return (
    <>
      <nav className="flex items-center bg-blue-900 shadow px-6 py-3">
        <Link
          to={
            user?.role === "supervisor"
              ? "/supervisor"
              : user?.role === "intern"
              ? "/intern"
              : user?.role === "admin"
              ? "/admin"
              : "/"
          }
          aria-label="Home"
          className="flex items-center gap-1 text-gray-100 hover:text-blue-300 transition"
        >
          <Home fontSize="medium" className="text-gray-100" />
          <span className="hidden sm:inline font-semibold">Home</span>
        </Link>

        <div className="flex-grow" />

        {user ? (
          <>
            <div className="hidden sm:block mr-6 text-gray-100 font-medium">
              Welcome, {user?.name || user?.email || "User"}
            </div>

            <Link
              to={`/${user.role}/profile`}
              aria-label="Profile"
              className="flex items-center gap-1 mr-4 text-gray-100 hover:text-blue-300 transition"
            >
              <Person fontSize="medium" className="text-gray-100" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="flex items-center gap-1 text-red-400 hover:text-red-200 font-semibold transition cursor-pointer"
            >
              <ExitToAppIcon fontSize="medium" className="text-red-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="text-gray-100 hover:text-blue-300 transition mr-4"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded font-semibold hover:bg-blue-100 transition"
            >
              Login
            </Link>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;