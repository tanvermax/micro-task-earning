import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Axios/useAxiosSecure";

const Taskupdate = () => {
    const axiosSecure = useAxiosSecure();
  const loadtask = useLoaderData() || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const updatedFields = {
        taskName: data.task_title,
        taskDetails: data.task_detail,
        submissinInfo: data.submission_info,
      };
    axiosSecure.put(`/task/${loadtask._id}`,updatedFields )
    .then((res) => {
        if (res.data.modifiedCount > 0) {
          console.log("Task updated successfully!");
          alert("Task updated successfully!");
        } else {
          console.log("No changes were made to the task.");
          alert("No changes were made to the task.");
        }
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        alert("An error occurred while updating the task.");
      });
  };




  return (
    <div>
      <h1>updated your task info</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Task Title */}
          <div className="mb-4 ">
            <input
              type="text"
              defaultValue={loadtask.taskName}
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
              defaultValue={loadtask.taskDetails}
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
          {/* <div className="mb-4">
            <label
              htmlFor="required_workers"
              className="block text-sm font-medium text-gray-700"
            >
              Required Workers
            </label>
            <input
              type="number"
              id="required_workers"
              disabled
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
          </div> */}

          {/* Payable Amount */}
          {/* <div className="mb-4">
            <label
              htmlFor="payable_amount"
              className="block text-sm font-medium text-gray-700"
            >
              Payable Amount
            </label>
            <input
              type="number"
              disabled
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
          </div> */}

          {/* Completion Date */}
          {/* <div className="mb-4">
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
          </div> */}

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
              defaultValue={loadtask.submissinInfo}
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
          {/* <div className="mb-4">
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
          </div> */}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              update task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Taskupdate;
