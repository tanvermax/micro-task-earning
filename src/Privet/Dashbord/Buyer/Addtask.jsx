import { useForm } from "react-hook-form";
import useAuth from "../../../Provider/useAuth";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useaxiospublic from "../../../Axios/useaxiospublic";

const image_hostin_key = import.meta.env.VITE_IMAGEBB;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hostin_key}`;
const Addtask = () => {
  const { user } = useAuth();
  const axiosPublic = useaxiospublic();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (user?.email) {
      axiosSecure(`/users?email=${user.email}`).then((res) => {
        setUserData(res.data);
      });
    }
  }, [user?.email]);

  // console.log(userData.coins); // Initial coins value

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.task_image_url[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(data);

    // console.log("Registration Data:", data);
    if (res.data.success) {
      const totalCost = data.required_workers * data.payable_amount;
      // console.log(`Total Cost: ${totalCost}, User Coins: ${userData.coins}`);

      if (userData.coins >= totalCost) {
        // User has enough coins

        const taskitem = {
          taskowner: user.email,
          ownername: user.displayName,
          taskName: data.task_title,
          taskDetails: data.task_detail,
          requiredWorkers: parseInt(data.required_workers),
          payableAmount: parseInt(data.payable_amount),
          taskDate: data.completion_date,
          submissinInfo: data.submission_info,
          taskImage: res.data.data.display_url,
        };
        // console.log(taskitem);

        axiosSecure.post("/task", taskitem).then((res) => {
          if (res.data.insertedId) {
            // Deduct the coins
            const updatedCoins = userData.coins - totalCost; // Calculate updated coins
            axiosSecure
              .patch(`/users/coins/${userData._id}`, {
                email: user.email,
                coins: updatedCoins,
              })
              .then((updateRes) => {
                if (updateRes.data.success) {
                  // Update userData state with the new coins value
                  setUserData((prevData) => ({
                    ...prevData,
                    coins: updatedCoins, // Update coins after deduction
                  }));

                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task added successfully!",
                    text: "Your coins have been deducted.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  // window.location.reload(false);
                }
              });
          }
        });
      } else {
        // Insufficient coins
        Swal.fire({
          icon: "error",
          title: "Not available Coin.  Purchase Coin",
          text: "You do not have enough coins to create this task. Please top up your account.",
        });
        navigate("/dashbord/purchase");
      }
    };
  
  }

  return (
    <div className=" border rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ">
      <div className=" mx-auto p-6  rounded-lg shadow-md">
        <h2 className="lg:text-2xl text-[8px] font-bold mb-4">Create a Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Task Title */}
          <div className="mb-4 ">
            <label
              htmlFor="task_title"
              className="block lg:lg:text-sm text-[12px] ] font-medium "
            >
              Task Title
            </label>
            <input
              type="text"
              id="task_title"
              {...register("task_title", {
                required: "Task title is required",
              })}
              className="border lg:p-3 p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:lg:text-sm text-[12px] "
              placeholder="e.g., Watch my YouTube video and make a comment"
            />
            {errors.task_title && (
              <p className="text-red-500 lg:lg:text-sm text-[12px]  mt-1">
                {errors.task_title.message}
              </p>
            )}
          </div>

          {/* Task Detail */}
          <div className="mb-4">
            <label
              htmlFor="task_detail"
              className="block lg:lg:text-sm text-[12px]  font-medium "
            >
              Task Detail
            </label>
            <textarea
              id="task_detail"
              {...register("task_detail", {
                required: "Task detail is required",
              })}
              className=" border lg:p-3 p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:lg:text-sm text-[12px] "
              rows="4"
              placeholder="Provide a detailed description of the task"
            ></textarea>
            {errors.task_detail && (
              <p className="text-red-500 lg:text-sm text-[12px] mt-1">
                {errors.task_detail.message}
              </p>
            )}
          </div>

          {/* Required Workers */}
          <div className="mb-4">
            <label
              htmlFor="required_workers"
              className="block lg:text-sm text-[12px] font-medium "
            >
              Required Workers
            </label>
            <input
              type="number"
              id="required_workers"
              {...register("required_workers", {
                required: "Number of workers is required",
                min: 1,
              })}
              className="border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-sm text-[12px]"
              placeholder="e.g., 100"
            />
            {errors.required_workers && (
              <p className="text-red-500 lg:text-sm text-[12px] mt-1">
                {errors.required_workers.message}
              </p>
            )}
          </div>

          {/* Payable Amount */}
          <div className="mb-4">
            <label
              htmlFor="payable_amount"
              className="block lg:text-sm text-[12px] font-medium "
            >
              Payable Amount
            </label>
            <input
              type="number"
              id="payable_amount"
              {...register("payable_amount", {
                required: "Payable amount is required",
                min: 1,
              })}
              className="border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-sm text-[12px]"
              placeholder="e.g., 10"
            />
            {errors.payable_amount && (
              <p className="text-red-500 lg:text-sm text-[12px] mt-1">
                {errors.payable_amount.message}
              </p>
            )}
          </div>

          {/* Completion Date */}
          <div className="mb-4">
            <label
              htmlFor="completion_date"
              className="block lg:text-sm text-[12px] font-medium "
            >
              Completion Date
            </label>
            <input
              type="date"
              id="completion_date"
              {...register("completion_date", {
                required: "Completion date is required",
              })}
              className="border mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-sm text-[12px]"
            />
            {errors.completion_date && (
              <p className="text-red-500 lg:text-sm text-[12px] mt-1">
                {errors.completion_date.message}
              </p>
            )}
          </div>

          {/* Submission Info */}
          <div className="mb-4">
            <label
              htmlFor="submission_info"
              className="block lg:text-sm text-[12px] font-medium "
            >
              Submission Info
            </label>
            <input
              type="text"
              id="submission_info"
              {...register("submission_info", {
                required: "Submission info is required",
              })}
              className="border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-sm text-[12px]"
              placeholder="e.g., Screenshot/Proof"
            />
            {errors.submission_info && (
              <p className="text-red-500 lg:text-sm text-[12px] mt-1">
                {errors.submission_info.message}
              </p>
            )}
          </div>

          {/* Task Image URL */}
          <div className="mb-4">
            <label
              htmlFor="task_image_url"
              className="block lg:text-sm text-[12px] font-medium "
            >
              Task Image URL
            </label>
            <input
              type="file"
              id="task_image_url"
              {...register("task_image_url", {
                required: "Task image URL is required",
              })}
              className="border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-sm text-[12px]"
              placeholder="e.g., https://example.com/image.jpg"
            />
            {errors.task_image_url && (
              <p className="text-red-500 lg:text-sm text-[12px] mt-1">
                {errors.task_image_url.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addtask;
