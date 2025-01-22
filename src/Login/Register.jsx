import React from "react";
import { useForm } from "react-hook-form";
import Socail from "./Socail";
import useAuth from "../Provider/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../Axios/useAxiosSecure";
import useaxiospublic from "../Axios/useaxiospublic";

const image_hostin_key = import.meta.env.VITE_IMAGEBB;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hostin_key}`;

const Register = () => {
  const axiosPublic = useaxiospublic();
  const { handlnewuser,setUser,updateUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.photo[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (res.data.success) {
        const hostedImageUrl = res.data.data.display_url;
        const coins = data.role === "Buyer" ? 50 : 10;
  
        const user = {
          email: data.email,
          userName: data.fullName,
          role: data.role,
          photo: hostedImageUrl,
          coins,
        };
  
        // Register the user
        const result = await handlnewuser(data.email, data.password);
        if (result.user) {
          setUser(result.user);
  
          // Update the user profile
          await updateUser({
            displayName: data.fullName,
            photoURL: hostedImageUrl,
          });
  
          // Save user data to the database
          const dbResponse = await axiosSecure.post("/users", user);
          if (dbResponse.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your your account has being created",
              showConfirmButton: false,
              timer: 1500,
            });
          }
  
          // Navigate to home or login
          navigate("/");
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
    <div className="w-full max-w-xl bg-green-200 mx-auto  rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
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
            placeholder="Enter your full name"
            {...register("fullName", { required: "Full name is required" })}
            className={`w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 ${
              errors.fullName
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-400"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>
        {/* photo file */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            photo
          </label>
          <input
            type="file"
            placeholder="Enter your full name"
            {...register("photo", { required: "give your photo" })}
            className={`w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 ${
              errors.fullName
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-400"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              // pattern: {
              //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              //   message: "Invalid email address",
              // },
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

        {/* Password */}
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

        {/* Confirm Password */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value, { password }) =>
                value === password || "Passwords do not match",
            })}
            className={`w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-400"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}Buyer
        </div> */}
        <div>
          <label className="block text-base font-medium text-gray-700">
            What do you want to be?
          </label>
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Worker"
                {...register("role", {
                  required: "Please select an option",
                })}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              <span>Worker</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Buyer"
                {...register("role", {
                  required: "Please select an option",
                })}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              <span>Buyer</span>
            </label>
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Register
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Log in
        </a>
      </p>
      <Socail></Socail>
    </div>
  );
};

export default Register;
