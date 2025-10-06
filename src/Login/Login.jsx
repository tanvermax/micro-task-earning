import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Socail from "./Socail";
import useAuth from "../Provider/useAuth";
import loginIllustration from "../assets/undraw_deliveries_qutl.svg"; // replace with your image path

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
    setLoginError("");
    loginwithemail(data.email, data.password)
      .then(() => {
        navigate("/");
        // window.location.reload(false);
      })
      .catch((error) => {
        const code = error.code;
        if (code === "auth/invalid-credential") {
          setLoginError("The password is incorrect.");
        } else if (code === "auth/user-not-found") {
          setLoginError("No user found with this email.");
        } else if (code === "auth/too-many-requests") {
          setLoginError("Too many failed attempts. Please try again later.");
        } else {
          setLoginError(error.message);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 shadow-xl rounded-2xl overflow-hidden bg-white max-w-5xl w-full">
        {/* Left Side Image */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block bg-blue-50 p-10"
        >
          <img
            src={loginIllustration}
            alt="Login illustration"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Right Side Form */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back!
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {loginError && (
              <p className="text-red-500 text-sm text-center mt-2">{loginError}</p>
            )}

            {/* Forgot Password */}
            <div className="flex justify-end text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center justify-between">
            <span className="border-b w-1/5"></span>
            <span className="text-xs text-gray-500 uppercase">or</span>
            <span className="border-b w-1/5"></span>
          </div>

          {/* Social Login */}
          <div className="mt-4">
            <Socail />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
