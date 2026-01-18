import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate("/"); 
  }

  // Determine dashboard path based on role
  const getDashboardPath = () => {
    switch (user?.role) {
      case "supervisor": return "/supervisor";
      case "intern": return "/intern";
      case "admin": return "/admin";
      default: return "/";
    }
  };

  return (
    <>
      <Box
        component="nav"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 4 },
          py: 1.5,
          bgcolor: "rgba(9, 9, 11, 0.6)", // More transparent, relying on global dark bg
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 1200,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Logo / Home Link */}
        <Link to={getDashboardPath()} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Box
            sx={{
              p: 1,
              bgcolor: "rgba(124, 58, 237, 0.2)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.05)" }
            }}
          >
             <Home sx={{ color: "#a78bfa", fontSize: 24 }} />
          </Box>
          <Typography
            level="h4"
            sx={{
              fontWeight: 800,
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.5rem",
              background: "linear-gradient(45deg, #fff, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: { xs: "none", sm: "block" },
              letterSpacing: "-0.02em"
            }}
          >
            SupIntern
          </Typography>
        </Link>

        {/* Right Side Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Box sx={{ textAlign: "right", display: { xs: "none", md: "block" }, mr: 1 }}>
                <Typography level="body-xs" sx={{ color: "#94a3b8", mb: -0.5 }}>
                  Signed in as
                </Typography>
                <Typography level="body-sm" sx={{ color: "#e2e8f0", fontWeight: 600 }}>
                   {user?.name || user?.email || "User"}
                </Typography>
              </Box>

              <Button
                variant="soft"
                color="neutral"
                size="sm"
                startDecorator={<ExitToAppIcon />}
                onClick={handleLogout}
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "#f87171",
                  borderColor: "transparent",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "rgba(239, 68, 68, 0.15)",
                    color: "#f87171",
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="plain"
                component={Link}
                to="/login"
                startDecorator={<LoginIcon />}
                size="sm"
                sx={{
                  color: "#cbd5e1",
                  fontWeight: 600,
                  "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.08)" }
                }}
              >
                Login
              </Button>
              <Button
                variant="solid"
                component={Link}
                to="/signup"
                startDecorator={<AppRegistrationIcon />}
                size="sm"
                sx={{
                  bgcolor: "#7c3aed",
                  color: "#fff",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#6d28d9" },
                  boxShadow: "0 0 10px rgba(124, 58, 237, 0.4)"
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Outlet />
    </>
  );
}

export default NavBar;