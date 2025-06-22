// import React from "react";
// import { useAuth } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   function handleLogout() {
//     logout();
//     navigate("/");
//   }

//   return (
//     <nav className="flex items-center justify-between px-8 py-4 bg-blue-600 text-white">
//       <Link to="/" className="font-bold text-xl">Intern Task Tracker</Link>
//       <div>
//         {user && user.role === "intern" && <Link to="/intern" className="mr-4">Intern Dashboard</Link>}
//         {user && user.role === "supervisor" && <Link to="/supervisor" className="mr-4">Supervisor Dashboard</Link>}
//         {user && user.role === "admin" && <Link to="/admin" className="mr-4">Admin Dashboard</Link>}
//         {!user && <Link to="/signup" className="mr-4">Sign Up</Link>}
//         {user && <button onClick={handleLogout} className="bg-white text-blue-600 px-3 py-1 rounded">Logout</button>}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import {Outlet} from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';


function NavBar() {
  const {user,logout} = useAuth();
  return (
  <>
    <nav className="flex items-center bg-blue-900 shadow px-6 py-3">
      <Link
        to={
          user?.role === "supervisor"
            ? "/supervisor"
            : user?.role === "intern"
            ? "/intern"
            : "/admin"
        }
        aria-label="Home"
        className="flex items-center gap-1 text-gray-100 hover:text-blue-300 transition"
      >
        <Home fontSize="medium" className="text-gray-100" />
        <span className="hidden sm:inline font-semibold">Home</span>
      </Link>

      <div className="flex-grow" />

      <div className="hidden sm:block mr-6 text-gray-100 font-medium">
        Welcome, {user.name}
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
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
        aria-label="Logout"
        className="flex items-center gap-1 text-red-400 hover:text-red-200 font-semibold transition cursor-pointer"
      >
        <ExitToAppIcon fontSize="medium" className="text-red-400" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </nav>

    <Outlet />
  </>
);

}


export default NavBar;