import React from "react";
import useTask from "../Buyer/useTask";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [task] = useTask();
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-5">Available Tasks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {task
          .filter((item) => item.requiredWorkers > 0) // Filter tasks with requiredWorkers > 0
          .map((item) => (
            <div
              key={item._id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              {/* Task Image */}
              <img
                className="w-full h-48 object-cover rounded-t-lg"
                src={item.taskImage}
                alt={`${item.taskName} Image`}
              />
              <div className="p-5">
                <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {item.taskName}
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Buyer: {item.taskowner}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completion Date: {item.taskDate}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Required Workers: {item.requiredWorkers}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  Payable Amount: ${item.payableAmount}
                </p>
                <button
                  onClick={() => navigate(`/dashbord/taskdetails/${item._id}`)}
                  className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskList;
