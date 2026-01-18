import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Snackbar,
  IconButton,
  Box,
} from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import supInternLogo from "../assets/supInternLOGO.png";

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (data) => {
    const res = await signup(data);
    if (res.success) {
      setSuccess(true);
      setMessage("Signup successful! Await admin approval.");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setSuccess(false);
      setMessage(res.message);
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
            }}
          />
          <Typography level="h3" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>
            Create Account
          </Typography>
          <Typography level="body-sm" sx={{ color: "#94a3b8" }}>
            Sign up to get started with SupIntern
          </Typography>
        </Box>

        <FormControl error={!!errors.name}>
          <FormLabel sx={{ color: "#e2e8f0" }}>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
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
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
          />
          {errors.name && (
            <Typography level="body-xs" color="danger" sx={{ mt: 0.5 }}>
              {errors.name.message}
            </Typography>
          )}
        </FormControl>

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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
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
              "::placeholder": { color: "#64748b" },
            }}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          {errors.password && (
            <Typography level="body-xs" color="danger" sx={{ mt: 0.5 }}>
              {errors.password.message}
            </Typography>
          )}
        </FormControl>

        <FormControl error={!!errors.confirmPassword}>
          <FormLabel sx={{ color: "#e2e8f0" }}>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="Confirm your password"
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
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <Typography level="body-xs" color="danger" sx={{ mt: 0.5 }}>
              {errors.confirmPassword.message}
            </Typography>
          )}
        </FormControl>

        <Button
          type="submit"
          size="lg"
          variant="solid"
          startDecorator={<AppRegistrationIcon />}
          sx={{
            mt: 2,
            bgcolor: "#7c3aed", // Violet-600
            color: "#fff",
            "&:hover": { bgcolor: "#6d28d9" },
            fontWeight: 600,
          }}
        >
          Sign Up
        </Button>

        <Typography level="body-sm" sx={{ color: "#94a3b8", textAlign: "center", mt: 2 }}>
          Already have an account?{" "}
          <Link
            component="button"
            onClick={() => navigate("/login")}
            sx={{ color: "#a78bfa", fontWeight: 600, "&:hover": { color: "#c4b5fd" } }}
          >
            Login
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

      {/* Snackbar */}
      <Snackbar
        open={!!message}
        onClose={() => setMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        color={success ? "success" : "danger"}
        variant="solid"
        endDecorator={
          <IconButton onClick={() => setMessage("")} size="sm" variant="soft" color={success ? "success" : "danger"}>
            <CloseIcon />
          </IconButton>
        }
      >
        {message}
      </Snackbar>
    </Sheet>
  );
}

export default SignupPage;