import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Sheet,
  List,
  ListItem,
  ListItemDecorator,
  Button,
  Grid,
} from "@mui/joy";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import GroupsIcon from "@mui/icons-material/Groups";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SecurityIcon from "@mui/icons-material/Security";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <Sheet
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #09090b 0%, #1a1a2e 50%, #2e1065 100%)",
        color: "#fff",
        p: { xs: 2, md: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1000 }}>
        {/* Back Button */}
        <Button
          variant="plain"
          startDecorator={<ArrowBackIcon />}
         sx={{
            fontWeight: 600,
            color: "#e2e8f0",
            "&:hover": { color: "#a78bfa", bgcolor: "rgba(255,255,255,0.05)" },
          }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>

        {/* Header */}
        <Typography
          level="h1"
          sx={{
            color: "#fff",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            fontWeight: 800,
            mb: 2,
            textAlign: "center",
          }}
        >
          About <span style={{ color: "#a78bfa" }}>SupIntern</span>
        </Typography>

        <Typography
          level="body-lg"
          sx={{
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 700,
            mx: "auto",
            mb: 8,
            fontSize: "1.2rem",
          }}
        >
          SupIntern is designed to bridge the gap between interns and organizations, providing a transparent, efficient, and secure way to manage productivity.
        </Typography>

        {/* Key Features Grid */}
        <Typography level="h2" sx={{ color: "#fff", mb: 4, textAlign: "center" }}>
          Key Features
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              icon: <AssignmentTurnedInIcon sx={{ fontSize: 40, color: "#60a5fa" }} />,
              title: "Interns",
              desc: "Effortlessly log daily tasks, track hours, and update progress with ease.",
            },
            {
              icon: <SupervisorAccountIcon sx={{ fontSize: 40, color: "#34d399" }} />,
              title: "Supervisors",
              desc: "Review, verify, and download intern reports. Monitor timelines with clarity.",
            },
            {
              icon: <FactCheckIcon sx={{ fontSize: 40, color: "#fbbf24" }} />,
              title: "Admins",
              desc: "Seamlessly approve users, assign supervisors, and maintain workflow control.",
            },
            {
              icon: <GroupsIcon sx={{ fontSize: 40, color: "#a78bfa" }} />,
              title: "Collaboration",
              desc: "Foster transparency, real-time updates, and effective teamwork.",
            },
            {
              icon: <SecurityIcon sx={{ fontSize: 40, color: "#f87171" }} />,
              title: "Data Security",
              desc: "Your information is safe, private, and always protected.",
            },
            {
              icon: <CheckCircleIcon sx={{ fontSize: 40, color: "#22d3ee" }} />,
              title: "Intuitive Interface",
              desc: "Clean, responsive design for all user roles.",
            },
          ].map((item, index) => (
            <Grid key={index} xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  bgcolor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "xl",
                  height: "100%",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.06)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography level="h3" sx={{ color: "#fff", mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography level="body-lg" sx={{ color: "#94a3b8" }}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Developer Section */}
        <Box sx={{ mt: 8, textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.1)", pt: 6, pb: 2, width: "100%" }}>
          <Typography level="h3" sx={{ color: "#fff", mb: 3 }}>
            Meet the Developer
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
            <Button
              component="a"
              href="https://github.com/RockingAyush04"
              target="_blank"
              variant="outlined"
              size="lg"
              startDecorator={<GitHubIcon />}
              sx={{
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                "&:hover": { borderColor: "#a78bfa", bgcolor: "rgba(167, 139, 250, 0.1)" }
              }}
            >
              GitHub
            </Button>
            <Button
              component="a"
              href="https://www.linkedin.com/in/ayushpadhy/"
              target="_blank"
              variant="outlined"
              size="lg"
              startDecorator={<LinkedInIcon />}
              sx={{
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                "&:hover": { borderColor: "#0077b5", bgcolor: "rgba(0, 119, 181, 0.1)" }
              }}
            >
              LinkedIn
            </Button>
            <Button
              component="a"
              href="mailto:ayushpadhy1309@gmail.com"
              target="_blank"
              variant="outlined"
              size="lg"
              startDecorator={<EmailIcon />}
              sx={{
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                "&:hover": { borderColor: "#60a5fa", bgcolor: "rgba(96, 165, 250, 0.1)" }
              }}
            >
              Contact Me
            </Button>
          </Box>
        </Box>
      </Box>
    </Sheet>
  );
}
