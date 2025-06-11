import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const onSubmit = (data) => {
    setError('');
    const success = login({ email: data.email, password: data.password });
    if (!success) setError("Invalid email or password.");
  };

  function signUp(e) {
    e.preventDefault();
    navigate('/signup');
  }

  function forgotPassword(e) {
    e.preventDefault();
    alert("Forgot Password functionality is not implemented yet.");
  }

  if (user && !showSuccess) return <></>;

  return (
    <div className="flex w-full h-screen flex-row">
      <div className="flex-1 justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500">
        <p className="text-white font-medium m-4 text-2xl h-1/2">Intern Task Tracker</p>
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold mb-3">Welcome Back!</h1>
          <h2 className="text-xl font-medium mb-6">Please enter your details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-blue-600 mt-1"
              >
                {showPassword ? "Hide" : "Reveal"}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div className='flex justify-end'>
              <button className="text-purple-600 font-medium mb-6 cursor-pointer" onClick={forgotPassword}>Forgot Password</button>
            </div>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer">Login</button>
            <div className="flex mt-6">
              <p className='mr-2'>Don't have an account?</p>
              <button type="button" className='text-purple-700 font-medium cursor-pointer' onClick={signUp}>Sign up</button>
            </div>
          </form>
        </div>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4 text-center border-green-600 border-4">
            <p className="text-green-600 text-2xl font-semibold">Login Successful!</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default LoginPage;