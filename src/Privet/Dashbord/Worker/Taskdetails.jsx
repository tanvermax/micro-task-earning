import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import userMange from "../userMange";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import { toast } from "react-toastify";
import { URL } from "../../../constans"; // Gemini API endpoint

const Taskdetails = () => {
  const task = useLoaderData();
  const [userData, refetch] = userMange();
  const axiosSecure = useAxiosSecure();

  const [submissionDetails, setSubmissionDetails] = useState("");
  const [question, setQuestion] = useState("How can I best complete this task?");
  const [answer, setAnswer] = useState("");

  // --- Handle Task Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    const workerEmail = userData.email;
    const workerName = userData.userName;
    const currentDate = new Date().toISOString().split("T")[0];

    const submission = {
      task_id: task._id,
      task_title: task.taskName,
      payable_amount: task.payableAmount,
      worker_email: workerEmail,
      submission_details: submissionDetails,
      worker_name: workerName,
      Buyer_email: task.taskowner,
      current_date: currentDate,
      status: "pending",
    };

    axiosSecure.post("/tasksubmit", submission).then((res) => {
      if (res.data.message) {
        toast.success(res.data.message);
      }
      axiosSecure.post("/newnotificatio", {
        workermessage: `Your submission for the task "${task.taskName}" has been requested to owner.`,
        woekermail: userData.email,
        data: new Date(),
      });
    });
  };

  // --- Ask AI for guidance ---
  const askAI = async () => {
    setAnswer(""); // reset previous

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `I am a worker. The task is: "${task.taskName}".
                     Details: ${task.taskDetails}.and date is ${task.taskDate}.
                     Question: ${question}.
                     Please explain the best step-by-step way from 1st  to last
                      to complete this task effectively, anwser in short. and also tell
                       me what tools i need to complete this task. and
                        what to write in submission details.`,
            },
          ],
        },
      ],
    };

    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    response = await response.json();

    const text = response.candidates[0].content.parts[0]?.text || "No answer found";

    // Typing effect
    let i = 0;
    const words = text.split(" ");
    const interval = setInterval(() => {
      setAnswer((prev) => prev + " " + words[i]);
      i++;
      if (i >= words.length) clearInterval(interval);
    }, 100);
  };

  return (
   <div className="flex  lg:flex-row gap-10">
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
            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    {/* AI Assistant for Worker */}
      <div className="mt-10 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white max-w-[400px] rounded-lg shadow p-5">
        <h2 className="text-xl font-bold mb-3">🤖 Task Helper AI</h2>
        <p className="text-sm mb-3">Ask AI how to best complete this task.</p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded-lg text-black"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={askAI}
            className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
          >
            Ask
          </button>
        </div>

        <div className="bg-white/20 p-4 rounded-lg max-h-[61vh] overflow-y-auto">
          <p className="whitespace-pre-wrap text-left">
            {answer || "✨ AI response will appear here"}
          </p>
        </div>
      </div>
   </div>
  );
};

export default Taskdetails;
