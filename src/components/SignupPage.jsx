import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/joy/Snackbar";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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

  const onSubmit = async (data) => {
    const res = await signup(data);
    if (res.success) {
      setMessage("Signup successful! Await admin approval.");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setMessage(res.message);
    }
  };

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500">
        <p className="text-white font-medium m-4 text-2xl h-1/2">SupIntern App</p>
      </div>
      <div
        className="flex-1 flex items-center justify-center bg-gray-100"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold mb-3">Create Account</h1>
          <h2 className="text-xl font-medium mb-6">Sign up to get started</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Snackbar
              open={!!message}
              onClose={() => setMessage("")}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              sx={{ mb: 0, ml: 1, padding: 0 }}
            >
              <Alert
                variant="outlined"
                color="success"
                sx={{
                  backgroundColor: "white",
                  borderColor: "green",
                  borderWidth: 2,
                  borderStyle: "solid",
                  minWidth: 300,
                  height: 40,
                  px: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
                endDecorator={
                  <IconButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    onClick={() => setMessage("")}
                    aria-label="close"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              >
                <p className="font-medium text-lg p-4">{message}</p>
              </Alert>
            </Snackbar>

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
            >
              Sign Up
            </button>

            <div className="flex mt-6">
              <p className="mr-2">Already have an account?</p>
              <button
                type="button"
                className="text-purple-700 font-medium cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;