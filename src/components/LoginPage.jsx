import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {
  Sheet,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Snackbar,
  Alert,
  IconButton,
  Box,
} from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import supInternLogo from "../assets/supInternLOGO.png";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      setShowSuccess(true);
      const timeout = setTimeout(() => {
        setShowSuccess(false);
        if (user.role === "admin") navigate("/admin");
        else if (user.role === "supervisor") navigate("/supervisor");
        else if (user.role === "intern") navigate("/intern");
        else navigate("/");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    console.log("Login form submitted with data:", { email: data.email, password: "[REDACTED]" }); // Log attempt
    setError("");
    try {
      const result = await login({ email: data.email, password: data.password });
      console.log("Login result:", result); // Log result
      
      if (!result || (typeof result === 'object' && result?.success === false)) {
         setError(result?.message || "Invalid email or password.");
      }
    } catch (e) {
      console.error("Unexpected error in LoginPage onSubmit:", e);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <Sheet
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #09090b 0%, #1a1a2e 50%, #2e1065 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 4,
          borderRadius: "xl",
          bgcolor: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "lg",
        }}
      >
        <Box sx={{ mb: 1, textAlign: "center" }}>
          <Box
            component="img"
            src={supInternLogo}
            alt="SupIntern Logo"
            sx={{
              width: 80,
              height: "auto",
              mx: "auto",
              mb: 2,
              borderRadius: "12px",
              // mixBlendMode: "screen", // optional, can remove if it looks weird against the blurred card
            }}
          />
          <Typography level="h3" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>
            Welcome Back
          </Typography>
          <Typography level="body-sm" sx={{ color: "#94a3b8" }}>
            Sign in to continue to SupIntern
          </Typography>
        </Box>

        <FormControl error={!!errors.email}>
          <FormLabel sx={{ color: "#e2e8f0" }}>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            variant="outlined"
            size="lg"
            sx={{
              bgcolor: "rgba(0,0,0,0.2)",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.2)",
              "&:hover": { borderColor: "#a78bfa" },
              "&:focus-within": { borderColor: "#a78bfa", "--Input-focusedHighlight": "#a78bfa" },
              "::placeholder": { color: "#64748b" },
            }}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <Typography level="body-xs" color="danger" sx={{ mt: 0.5 }}>
              {errors.email.message}
            </Typography>
          )}
        </FormControl>

        <FormControl error={!!errors.password}>
          <FormLabel sx={{ color: "#e2e8f0" }}>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            variant="outlined"
            size="lg"
            sx={{
              bgcolor: "rgba(0,0,0,0.2)",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.2)",
              "&:hover": { borderColor: "#a78bfa" },
              "&:focus-within": { borderColor: "#a78bfa", "--Input-focusedHighlight": "#a78bfa" },
              "::placeholder": { color: "#64748b" }
            }}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <Typography level="body-xs" color="danger" sx={{ mt: 0.5 }}>
              {errors.password.message}
            </Typography>
          )}
        </FormControl>

        <Button
          type="submit"
          size="lg"
          variant="solid"
          startDecorator={<LoginIcon />}
          sx={{
            mt: 2,
            bgcolor: "#7c3aed",
            color: "#fff",
            "&:hover": { bgcolor: "#6d28d9" },
            fontWeight: 600,
          }}
        >
          Login
        </Button>

        <Typography level="body-sm" sx={{ color: "#94a3b8", textAlign: "center", mt: 2 }}>
          Don't have an account?{" "}
          <Link
            component="button"
            onClick={() => navigate("/signup")}
            sx={{ color: "#a78bfa", fontWeight: 600, "&:hover": { color: "#c4b5fd" } }}
          >
            Sign up
          </Link>
        </Typography>

          <Button
            variant="plain"
            size="sm"
            startDecorator={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              fontWeight: 600,
              color: "#e2e8f0",alignSelf: "center", mt: 1,
              "&:hover": { color: "#a78bfa", bgcolor: "rgba(255,255,255,0.05)" },
            }}
            >
              Back to Home
          </Button>
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        color="danger"
        variant="solid"
        endDecorator={
          <IconButton onClick={() => setError("")} size="sm" variant="soft" color="danger">
            <CloseIcon />
          </IconButton>
        }
      >
        {error}
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
         open={showSuccess}
         anchorOrigin={{ vertical: "top", horizontal: "center" }}
         color="success"
         variant="solid"
       >
         Login Successful! Redirecting...
       </Snackbar>
    </Sheet>
  );
}

export default LoginPage;
