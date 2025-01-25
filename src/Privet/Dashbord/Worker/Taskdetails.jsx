import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import userMange from "../userMange";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import Swal from "sweetalert2";

const Taskdetails = () => {
  const task = useLoaderData();
  const [userData,refetch] = userMange(); // Load task data from the route
  const axiosSecure = useAxiosSecure();
  const [submissionDetails, setSubmissionDetails] = useState("");
//   console.log(userData);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock worker information (replace with actual logged-in worker data)
    const workerEmail = userData.email;
    const workerName = userData.userName;

    // Current date
    const currentDate = new Date().toISOString().split("T")[0];

    // Submission object
    const submission = {
      task_id: task._id,
      task_title: task.taskName,
      payable_amount: task.payableAmount,
      worker_email: workerEmail,
      submission_details: submissionDetails,
      worker_name: workerName,
      //   Buyer_name: task.taskowner, // Assuming taskowner is the Buyer_name
      Buyer_email: task.taskowner,
      current_date: currentDate,
      status: "pending",
    };
    

    // console.log("Submission Data:", submission);

    // Simulating an API call to save submission
    axiosSecure.post("/tasksubmit", submission).then((res) => {
      console.log(res.data);
      if (res.data.message) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-5">
      {/* Task Details */}
      <div className="bg-white border border-gray-200 rounded-lg shadow p-5 dark:bg-gray-800 dark:border-gray-700">
        <img
          className="w-full h-64 object-cover rounded-t-lg"
          src={task.taskImage}
          alt={task.taskName}
        />
        <h1 className="text-2xl font-bold mt-5">{task.taskName}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Task Details: {task.taskDetails}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Required Workers: {task.requiredWorkers}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Completion Date: {task.taskDate}
        </p>
        <p className="text-lg font-bold text-gray-900 dark:text-white">
          Payable Amount: ${task.payableAmount}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Buyer Email: {task.taskowner}
        </p>
      </div>

      {/* Submission Form */}
      <div className="mt-10 bg-white border border-gray-200 rounded-lg shadow p-5 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-5">Submit Your Work</h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="submissionDetails"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Submission Details:
          </label>
          <textarea
            id="submissionDetails"
            rows="4"
            className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm text-sm text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your work submission..."
            value={submissionDetails}
            onChange={(e) => setSubmissionDetails(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Taskdetails;
