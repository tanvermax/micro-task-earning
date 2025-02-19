import React from "react";
import useTask from "../Buyer/useTask";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [task] = useTask();
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-5">Available Tasks</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {task
        .sort((a, b) => a.payableAmount - b.payableAmount)
          .filter((item) => item.requiredWorkers > 0) // Filter tasks with requiredWorkers > 0
          .map((item) => (
            <div
              key={item._id}
              className="lg:w-full lg:max-w-sm w-32 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              {/* Task Image */}
              <img
                className="w-full h-32 object-cover rounded-t-lg"
                src={item.taskImage ? item.taskImage : `https://i.ibb.co.com/8s649yw/1-c-GLDPw-Rw7-ZX4-0-I3-F3nt-A.webp`}
                alt={`${item.taskName} Image`}
              />
              <div className="p-5">
                <h5 className="lg:text-xl text-[8px] font-semibold text-gray-900 dark:text-white">
                  {item.taskName}
                </h5>
                <p className="lg:text-sm text-[8px] text-gray-500 dark:text-gray-400">
                  Buyer: {item.taskowner}
                </p>
                <p className="lg:text-sm text-[8px] text-gray-500 dark:text-gray-400">
                  Completion Date: {item.taskDate}
                </p>
                <p className="lg:text-sm text-[8px] text-gray-500 dark:text-gray-400">
                  Required Workers: {item.requiredWorkers}
                </p>
                <p className="lg:text-lg text-[8px] font-bold text-gray-900 dark:text-white">
                  Payable Amount: ${item.payableAmount}
                </p>
                <button
                  onClick={() => navigate(`/dashbord/taskdetails/${item._id}`)}
                  className="mt-3 lg:text-sm text-[8px] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 dark:bg-[#db9647] dark:hover:bg-[#c57474] dark:focus:ring-blue-800"
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
