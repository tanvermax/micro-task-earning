import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import Socail from "./Socail";
import useAuth from "../Provider/useAuth";
import useAxiosSecure from "../Axios/useAxiosSecure";
import useaxiospublic from "../Axios/useaxiospublic";

import registerImg from "../assets/undraw_pin-to-board_eoie.svg"; // Replace with your image

const image_hostin_key = import.meta.env.VITE_IMAGEBB;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hostin_key}`;

const Register = () => {
  const { handlnewuser, setUser, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useaxiospublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.photo[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const hostedImageUrl = res.data.data.display_url;
        const coins = data.role === "buyer" ? 50 : 10;

        const user = {
          email: data.email,
          userName: data.fullName,
          role: data.role,
          photo: hostedImageUrl,
          coins,
        };

        const result = await handlnewuser(data.email, data.password);
        if (result.user) {
          setUser(result.user);
          await updateUser({
            displayName: data.fullName,
            photoURL: hostedImageUrl,
          });

          const dbRes = await axiosSecure.post("/users", user);
          console.log("Account created successfully!")
          if (dbRes.data.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Account created successfully!",
              showConfirmButton: false,
              timer: 1500,
              position: "top-end",
            });
          }

          // window.location.reload(false);
          navigate("/dashbord/workeraccountsetting");
        }
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white shadow-2xl rounded-2xl overflow-hidden max-w-6xl w-full">
        {/* Image Side */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex items-center justify-center bg-blue-50 p-8"
        >
          <img
            src={registerImg}
            alt="Register Illustration"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Form Side */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName", { required: "Full name is required" })}
                placeholder="Your full name"
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="you@example.com"
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
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  // minLength: {
                  //   value: 8,
                  //   message: "At least 8 characters",
                  // },
                  // pattern: {
                  //   value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/,
                  //   message:
                  //     "Must include a letter, number, and special character",
                  // },
                })}
                placeholder="••••••••"
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                What do you want to be?
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="worker"
                    {...register("role", { required: "Select a role" })}
                    className="text-blue-600"
                  />
                  <span>Worker</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="buyer"
                    {...register("role", { required: "Select a role" })}
                    className="text-blue-600"
                  />
                  <span>Buyer</span>
                </label>
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>

          {/* Social Login */}
          <div className="mt-4">
            <Socail />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
