import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Socail from "./Socail";
import useAuth from "../Provider/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginwithemail } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    setLoginError(""); // Clear any previous errors
    loginwithemail(data.email, data.password)
      .then((res) => {
        navigate("/");
        window.location.reload(false);
      })
      .catch((error) => {
        
        const errorCode = error.code;
        const errorMessage = error.message;

        // Handle specific error codes
        if (errorCode === "auth/invalid-credential") {
          setLoginError("The password is incorrect.");
        } else if (errorCode === "auth/user-not-found") {
          setLoginError("No user found with this email.");
        } else if (errorCode === "auth/too-many-requests") {
          setLoginError(
            "Access to this account has been temporarily disabled due to too many failed login attempts. Please try again later."
          );
        } else {
          setLoginError(errorMessage);
        }

        console.error(errorCode, errorMessage);
      });
  };

  return (
    <div className="lg:w-full lg:max-w-xl bg-[#ddbd9d] lg:rounded-lg shadow-lg lg:p-8 p-10 lg:mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Welcome Back!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
            className={`w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-400"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-400"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Display Login Error */}
        {loginError && (
          <p className="text-red-500 text-sm text-center mt-2">{loginError}</p>
        )}

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Log In
        </button>
      </form>

      {/* Divider */}
      <div className="mt-6 flex items-center justify-between">
        <span className="border-b w-1/5 lg:w-1/4"></span>
        <span className="text-xs text-gray-500 uppercase">or login with</span>
        <span className="border-b w-1/5 lg:w-1/4"></span>
      </div>

      {/* Social Logins */}
      <Socail></Socail>
    </div>
  );
};

export default Login;
