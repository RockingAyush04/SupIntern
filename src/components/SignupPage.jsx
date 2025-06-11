import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');

  const onSubmit = (data) => {
    const res = signup(data);
    if (res.success) {
      setMessage('Signup successful! Await admin approval.');
      setTimeout(() => navigate('/'), 1500);
    } else {
      setMessage(res.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2">Name</label>
          <input className="w-full mb-3 p-2 border rounded"
            {...register("name", { required: "Name is required" })} />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}

          <label className="block mb-2">Email</label>
          <input className="w-full mb-3 p-2 border rounded"
            {...register("email", { required: "Email is required" })} />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          <label className="block mb-2">Password</label>
          <input type="password" className="w-full mb-3 p-2 border rounded"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })} />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}

          <button className="w-full bg-blue-600 text-white py-2 rounded mt-4" type="submit">Sign Up</button>
        </form>
        {message && <div className="mt-4 text-green-700">{message}</div>}
      </div>
    </div>
  );
}

export default SignupPage;