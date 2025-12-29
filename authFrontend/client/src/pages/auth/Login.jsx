import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange", // enables real-time validation
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      reset();
      navigate("/home");
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-outfit mb-4 text-center text-primary">
          Login
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border p-2 rounded"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "At least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                  message:
                    "Must contain uppercase, lowercase, number & special character",
                },
              })}
              className="w-full border p-2 rounded relative"
            />

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* Create Account Link */}
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
