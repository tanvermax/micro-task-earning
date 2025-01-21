import { useForm } from "react-hook-form";
import useAuth from "../../../Provider/useAuth";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Addtask = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location= useLocation();
const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (user?.email) {
      axiosSecure(`/users?email=${user.email}`).then((res) => {
        setUserData(res.data);
      });
    }
  }, [user?.email]);

  console.log(userData.coins); // Initial coins value

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const totalCost = data.required_workers * data.payable_amount;
    console.log(`Total Cost: ${totalCost}, User Coins: ${userData.coins}`);

    if (userData.coins >= totalCost) {
      // User has enough coins
      const taskitem = {
        taskowner: user.email,
        taskName: data.task_title,
        taskDetails: data.task_detail,
        requiredWorkers: data.required_workers,
        payableAmount: data.payable_amount,
        taskDate: data.completion_date,
        submissinInfo: data.submission_info,
        taskImage: data.task_image_url,
      };

      axiosSecure.post("/task", taskitem).then((res) => {
        if (res.data.insertedId) {
          // Deduct the coins
          const updatedCoins = userData.coins - totalCost; // Calculate updated coins
          axiosSecure.patch(`/users/coins/${userData._id}`, {
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
                window.location.reload(false);
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
      navigate('/dashbord/purchase')
    }
  };

  return (
    <div className=" border shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ">
      <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create a Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Task Title */}
          <div className="mb-4 ">
            <label
              htmlFor="task_title"
              className="block text-sm font-medium text-gray-700"
            >
              Task Title
            </label>
            <input
              type="text"
              id="task_title"
              {...register("task_title", {
                required: "Task title is required",
              })}
              className="border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., Watch my YouTube video and make a comment"
            />
            {errors.task_title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.task_title.message}
              </p>
            )}
          </div>

          {/* Task Detail */}
          <div className="mb-4">
            <label
              htmlFor="task_detail"
              className="block text-sm font-medium text-gray-700"
            >
              Task Detail
            </label>
            <textarea
              id="task_detail"
              {...register("task_detail", {
                required: "Task detail is required",
              })}
              className=" border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              rows="4"
              placeholder="Provide a detailed description of the task"
            ></textarea>
            {errors.task_detail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.task_detail.message}
              </p>
            )}
          </div>

          {/* Required Workers */}
          <div className="mb-4">
            <label
              htmlFor="required_workers"
              className="block text-sm font-medium text-gray-700"
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
              className="border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., 100"
            />
            {errors.required_workers && (
              <p className="text-red-500 text-sm mt-1">
                {errors.required_workers.message}
              </p>
            )}
          </div>

          {/* Payable Amount */}
          <div className="mb-4">
            <label
              htmlFor="payable_amount"
              className="block text-sm font-medium text-gray-700"
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
              className="border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., 10"
            />
            {errors.payable_amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.payable_amount.message}
              </p>
            )}
          </div>

          {/* Completion Date */}
          <div className="mb-4">
            <label
              htmlFor="completion_date"
              className="block text-sm font-medium text-gray-700"
            >
              Completion Date
            </label>
            <input
              type="date"
              id="completion_date"
              {...register("completion_date", {
                required: "Completion date is required",
              })}
              className="border mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.completion_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.completion_date.message}
              </p>
            )}
          </div>

          {/* Submission Info */}
          <div className="mb-4">
            <label
              htmlFor="submission_info"
              className="block text-sm font-medium text-gray-700"
            >
              Submission Info
            </label>
            <input
              type="text"
              id="submission_info"
              {...register("submission_info", {
                required: "Submission info is required",
              })}
              className="border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., Screenshot/Proof"
            />
            {errors.submission_info && (
              <p className="text-red-500 text-sm mt-1">
                {errors.submission_info.message}
              </p>
            )}
          </div>

          {/* Task Image URL */}
          <div className="mb-4">
            <label
              htmlFor="task_image_url"
              className="block text-sm font-medium text-gray-700"
            >
              Task Image URL
            </label>
            <input
              type="url"
              id="task_image_url"
              {...register("task_image_url", {
                required: "Task image URL is required",
              })}
              className="border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., https://example.com/image.jpg"
            />
            {errors.task_image_url && (
              <p className="text-red-500 text-sm mt-1">
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
