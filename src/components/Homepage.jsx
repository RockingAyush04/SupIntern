import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Sheet,
  Chip,
  Card,
} from "@mui/joy";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SecurityIcon from "@mui/icons-material/Security";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import supInternLogo from "../assets/supInternLOGO.png";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Sheet
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #09090b 0%, #1a1a2e 50%, #2e1065 100%)", // Deep black to purple
        px: 0,
        py: 0,
        display: "flex",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      {/* Topbar with Login/Signup */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, md: 6 },
          py: 2.5,
          bgcolor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          {/* <Box
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
             <HomeIcon sx={{ color: "#a78bfa", fontSize: 24 }} />
          </Box> */}
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
              letterSpacing: "-0.02em"
            }}
          >
            SupIntern
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="plain"
            sx={{
              fontWeight: 600,
              color: "#e2e8f0",
              "&:hover": { color: "#a78bfa", bgcolor: "rgba(255,255,255,0.05)" },
            }}
            onClick={() => navigate("/about")}
          >
            About
          </Button>
          <Button
            variant="outlined"
            size="md"
            startDecorator={<LoginIcon />}
            sx={{
              fontWeight: 600,
              color: "#e2e8f0",
              borderColor: "rgba(255,255,255,0.2)",
              "&:hover": {
                bgcolor: "rgba(167, 139, 250, 0.1)",
                borderColor: "#a78bfa",
                color: "#fff",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            variant="solid"
            size="md"
            startDecorator={<AppRegistrationIcon />}
            sx={{
              fontWeight: 600,
              bgcolor: "#7c3aed", // Violet-600
              color: "#fff",
              "&:hover": {
                bgcolor: "#6d28d9", // Violet-700
                color: "#fff",
              },
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          px: { xs: 2, md: 4 },
          pt: { xs: 4, md: 6   },
          pb: { xs: 6, md: 10 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 900,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Chip
            variant="outlined"
            size="md"
            startDecorator={<EmojiEventsIcon sx={{ color: "#fbbf24" }} />}
            sx={{
              mb: 3,
              px: 2,
              py: 0.5,
              fontSize: "0.95rem",
              fontWeight: 600,
              borderRadius: "xl",
              color: "#e2e8f0",
              borderColor: "rgba(167, 139, 250, 0.3)",
              bgcolor: "rgba(167, 139, 250, 0.1)",
            }}
          >
            The Future of Internship Management
          </Chip>

          <Box
            component="img"
            src={supInternLogo}
            alt="SupIntern Logo"
            sx={{
              maxWidth: "600px",
              width: "auto",
              height: "auto",
              maxHeight: "150px", // Reasonable visual limit while allowing "actual size" feel
              mb: 0,
              mixBlendMode: "screen", // Ensures text stands out if there's a black background
              transition: "transform 0.3s ease",
              "&:hover": {
                  transform: "scale(1.05)"
              }
            }}
          />

          <Typography
            level="h1"
            sx={{
              mb: 2,
              color: "#fff",
              fontSize: { xs: "2.5rem", md: "4.5rem" },
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Elevate Your <br />
            <span
              style={{
                background: "linear-gradient(to right, #c084fc, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Internship Program
            </span>
          </Typography>

          <Typography
            level="body-lg"
            sx={{
              mb: 5,
              color: "#94a3b8", // Slate-400
              fontSize: { xs: "1.1rem", md: "1.35rem" },
              maxWidth: 700,
              lineHeight: 1.6,
            }}
          >
            SupIntern is the all-in-one platform for effortless task tracking, supervisor approvals, and team transparency. Built for modern organizations.
          </Typography>

          {/* CTA Buttons */}
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3, mb: 8 }}>
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "lg",
                bgcolor: "#fff",
                color: "#000",
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#f1f5f9",
                  transform: "translateY(-2px)",
                  color: "#000",
                },
                transition: "all 0.2s",
              }}
              startDecorator={<AppRegistrationIcon />}
            >
              Get Started Free
            </Button>
            <Button
              variant="outlined"
              size="lg"
              onClick={() => navigate("/login")}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "lg",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.3)",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "rgba(167, 139, 250, 0.15)", // Purple tint
                  borderColor: "#a78bfa",
                  color: "#fff",
                },
              }}
              startDecorator={<LoginIcon />}
            >
              Existing User
            </Button>
          </Box>

          {/* Value Props Row */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              width: "100%",
              justifyContent: "center",
            }}
          >
            {[
              { title: "Streamlined Workflow", desc: "Instantly log and verify daily tasks.", icon: <AssignmentTurnedInIcon sx={{ fontSize: 32, color: "#a78bfa" }} /> },
              { title: "Real-time Analytics", desc: "Supervisors get instant insights.", icon: <FactCheckIcon sx={{ fontSize: 32, color: "#60a5fa" }} /> },
              { title: "Enterprise Security", desc: "Data protection you can trust.", icon: <SecurityIcon sx={{ fontSize: 32, color: "#34d399" }} /> },
            ].map((item, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  width: 280,
                  p: 3,
                  bgcolor: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "xl",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    borderColor: "rgba(167, 139, 250, 0.5)",
                    boxShadow: "0 10px 40px -10px rgba(124, 58, 237, 0.3)",
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography level="h4" sx={{ color: "#fff", mb: 1, fontWeight: 700 }}>
                  {item.title}
                </Typography>
                <Typography level="body-md" sx={{ color: "#94a3b8" }}>
                  {item.desc}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 3,
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          bgcolor: "rgba(0,0,0,0.2)",
        }}
      >
        <Typography level="body-sm" sx={{ color: "#64748b" }}>
          &copy; {new Date().getFullYear()} SupIntern. Built for excellence.
        </Typography>
        <Typography level="body-xs" sx={{ color: "#475569", mt: 1 }}>
          Developed by <a href="https://github.com/RockingAyush04" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none" }}>Ayush Padhy</a>
        </Typography>
      </Box>
    </Sheet>
  );
}