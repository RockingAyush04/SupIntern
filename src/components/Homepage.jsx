import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Sheet,
  List,
  ListItem,
  ListItemDecorator,
  Divider,
  Chip,
  Card,
  CardContent,
} from "@mui/joy";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import GroupsIcon from "@mui/icons-material/Groups";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SecurityIcon from "@mui/icons-material/Security";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Sheet
      sx={{
        minHeight: "100vh",
        // New: login page style gradient background
        background: "linear-gradient(to right, #a78bfa 0%, #3b82f6 100%)",
        px: 0,
        py: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Topbar with Login/Signup */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 2,
          bgcolor: "rgba(255,255,255,0.10)",
          borderBottom: "1.5px solid rgba(255,255,255,0.16)",
          boxShadow: "sm",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Typography
          level="h6"
          component="div"
          sx={{
            fontWeight: 700,
            color: "#fff",
            letterSpacing: ".01em",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
          >
            SupIntern
          </Typography>
          <Box>
         <Button
            variant="solid"
            color="primary"
            size="md"
            startDecorator={<LoginIcon />}
            sx={{
              mr: 2,
              fontWeight: 600,
              bgcolor: "#fff",
              color: "#3b82f6",
              border: "1.5px solid #3b82f6",
              "&:hover": {
                bgcolor: "#e0e7ff",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        <Button
          variant="solid"
          color="primary"
          size="md"
          startDecorator={<AppRegistrationIcon />}
          sx={{
              
              fontWeight: 600,
              bgcolor: "#fff",
              color: "#3b82f6",
              border: "1.5px solid #3b82f6",
              "&:hover": {
                bgcolor: "#e0e7ff",
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
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          px: { xs: 1, md: 3 },
          py: { xs: 2, md: 6 },
          minHeight: 550,
          // Remove: previous gradient, since body already has it
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 760,
            bgcolor: "rgba(255,255,255,0.90)",
            borderRadius: "2xl",
            boxShadow: "xl",
            p: { xs: 3, md: 6 },
            mx: "auto",
            mt: { xs: 4, md: 4 },
            mb: { xs: 2, md: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backdropFilter: "blur(10px)",
            border: "1.5px solid #e0e7ff",
          }}
        >
          <Chip
            color="primary"
            variant="soft"
            size="lg"
            startDecorator={<EmojiEventsIcon />}
            sx={{
              fontWeight: 700,
              fontSize: "1.15rem",
              mb: 2,
              px: 2.5,
              letterSpacing: ".03em",
              bgcolor: "primary.100",
              color: "primary.800",
              boxShadow: "sm",
            }}
          >
            Productivity. Transparency. Growth.
          </Chip>
          <Typography
            level="h1"
            fontWeight="xl"
            sx={{
              mb: 2,
              color: "primary.900",
              textAlign: "center",
              letterSpacing: "0.03em",
              fontSize: { xs: "2.2rem", md: "2.8rem" },
              lineHeight: 1.1,
              textShadow: "0 1px 12px #e3ebfc",
              fontFamily: "inherit",
            }}
          >
            <span style={{ color: "#3b82f6" }}>Intern Task Tracker</span>
            <br />
            <span style={{ fontWeight: 400, color: "#4c51bf" }}>
              Track. Manage. Succeed.
            </span>
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              mb: 3,
              color: "neutral.700",
              textAlign: "center",
              fontSize: { xs: "1.08rem", md: "1.18rem" },
              maxWidth: 600,
            }}
          >
            Empowering organizations to seamlessly monitor, manage, and maximize intern productivity with a modern, collaborative platform for interns, supervisors, and admins.
          </Typography>

          {/* CTA Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
            <Button
              variant="solid"
              color="primary"
              size="lg"
              onClick={() => navigate("/signup")}
              sx={{
                minWidth: 130,
                fontWeight: 700,
                fontSize: "1.1rem",
                boxShadow: "md",
                letterSpacing: ".01em",
                bgcolor: "#3b82f6",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#2563eb",
                },
              }}
              startDecorator={<AppRegistrationIcon />}
            >
              Get Started
            </Button>
            <Button
              variant="soft"
              color="primary"
              size="lg"
              onClick={() => navigate("/login")}
              sx={{
                minWidth: 130,
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: ".01em",
                bgcolor: "rgba(55, 65, 81, 0.08)",
                color: "#3b82f6",
                "&:hover": {
                  bgcolor: "rgba(55, 65, 81, 0.13)",
                },
              }}
              startDecorator={<LoginIcon />}
            >
              Login
            </Button>
          </Box>

          <Divider sx={{ mb: 3, width: "100%" }} />

          {/* Features Section */}
          <Typography
            level="h4"
            sx={{
              color: "#4c51bf",
              fontWeight: 600,
              mb: 1,
              textAlign: "center",
              letterSpacing: ".01em",
            }}
          >
            Key Features
          </Typography>
          <List
            sx={{
              "--List-gap": "1.2rem",
              "--ListItem-radius": "8px",
              "--ListItem-paddingY": "0.4rem",
              "--ListItemDecorator-size": "2.1rem",
              mb: 2,
              px: 1,
            }}
          >
            <ListItem>
              <ListItemDecorator>
                <AssignmentTurnedInIcon color="primary" fontSize="large" />
              </ListItemDecorator>
              <Typography level="body-lg">
                <b>Interns:</b> Effortlessly log daily tasks, track hours, and update progress with ease.
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <SupervisorAccountIcon color="success" fontSize="large" />
              </ListItemDecorator>
              <Typography level="body-lg">
                <b>Supervisors:</b> Review, verify, and download intern reports. Monitor timelines with clarity.
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <FactCheckIcon color="warning" fontSize="large" />
              </ListItemDecorator>
              <Typography level="body-lg">
                <b>Admins:</b> Seamlessly approve users, assign supervisors, and maintain workflow control.
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <GroupsIcon color="info" fontSize="large" />
              </ListItemDecorator>
              <Typography level="body-lg">
                <b>Collaboration:</b> Foster transparency, real-time updates, and effective teamwork.
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <SecurityIcon sx={{ color: "#a05fe6" }} fontSize="large" />
              </ListItemDecorator>
              <Typography level="body-lg">
                <b>Data Security:</b> Your information is safe, private, and always protected.
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <CheckCircleIcon sx={{ color: "#43a047" }} fontSize="large" />
              </ListItemDecorator>
              <Typography level="body-lg">
                <b>Intuitive Interface:</b> Clean, responsive design for all user roles.
              </Typography>
            </ListItem>
          </List>
        </Box>

        {/* Value Proposition Cards with Blur */}
        <Box
          sx={{
            mt: { xs: 3, md: 5 },
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 2, md: 4 },
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <Card
            variant="soft"
            sx={{
              minWidth: 180,
              maxWidth: 260,
              minHeight: 110,
              p: 2.5,
              borderRadius: "2xl",
              bgcolor: "rgba(255,255,255,0.80)",
              boxShadow: "lg",
              backdropFilter: "blur(16px)",
              border: "1.5px solid #e3e8f3",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "box-shadow 0.2s, transform 0.2s",
              "&:hover": {
                boxShadow: "xl",
                transform: "translateY(-4px) scale(1.04)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 0 }}>
              <Typography
                level="title-lg"
                color="primary"
                fontWeight={700}
                sx={{ mb: 0.5, letterSpacing: ".01em" }}
              >
                Simple & Fast
              </Typography>
              <Typography level="body-md" color="neutral">
                Log, monitor, and verify in seconds.
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="soft"
            sx={{
              minWidth: 180,
              maxWidth: 260,
              minHeight: 110,
              p: 2.5,
              borderRadius: "2xl",
              bgcolor: "rgba(243,255,243,0.80)",
              boxShadow: "lg",
              backdropFilter: "blur(16px)",
              border: "1.5px solid #e3f1e8",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "box-shadow 0.2s, transform 0.2s",
              "&:hover": {
                boxShadow: "xl",
                transform: "translateY(-4px) scale(1.04)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 0 }}>
              <Typography
                level="title-lg"
                color="success"
                fontWeight={700}
                sx={{ mb: 0.5, letterSpacing: ".01em" }}
              >
                Collaborative
              </Typography>
              <Typography level="body-md" color="neutral">
                Built for teams at every level.
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="soft"
            sx={{
              minWidth: 180,
              maxWidth: 260,
              minHeight: 110,
              p: 2.5,
              borderRadius: "2xl",
              bgcolor: "rgba(255,251,240,0.80)",
              boxShadow: "lg",
              backdropFilter: "blur(16px)",
              border: "1.5px solid #f3eedc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "box-shadow 0.2s, transform 0.2s",
              "&:hover": {
                boxShadow: "xl",
                transform: "translateY(-4px) scale(1.04)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 0 }}>
              <Typography
                level="title-lg"
                color="warning"
                fontWeight={700}
                sx={{ mb: 0.5, letterSpacing: ".01em" }}
              >
                Transparent
              </Typography>
              <Typography level="body-md" color="neutral">
                Every action is tracked and clear.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box
        sx={{
          py: 2.5,
          textAlign: "center",
          fontSize: "1rem",
          color: "neutral.100",
          borderTop: "1.5px solid rgba(255,255,255,0.16)",
          backgroundColor: "transparent",
          letterSpacing: ".01em",
        }}
      >
        &copy; {new Date().getFullYear()} Intern Task Tracker. All rights reserved.
      </Box>
    </Sheet>
  );
}