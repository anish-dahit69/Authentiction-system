import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, loading } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange", // enables real-time validation
  });

  const onSubmit = async (data) => {
    // console.log("Registration Data:", data);
    // Reset the form after successful submission

    try {
      await registerUser(data);
      reset();
      navigate("/verify-otp");
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-outfit mb-4 text-center text-primary">
          Register
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-medium"
            >
              Name
            </label>
            <input
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "At least 2 characters" },
                maxLength: { value: 15, message: "At most 15 characters" },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only letters and spaces allowed",
                },
              })}
              className="w-full border p-2 rounded"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        {/* login Account Link */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
