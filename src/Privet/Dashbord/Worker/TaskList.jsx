import React from "react";
import useTask from "../Buyer/useTask";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [task] = useTask();
  const navigate = useNavigate();

  const sortedTasks = task
    .sort((a, b) => a.payableAmount - b.payableAmount)
    .filter((item) => item.requiredWorkers > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
        Available Tasks
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTasks.map((item) => (
          <div
            key={item._id}
            className="bg-gradient-to-br from-white via-slate-50 to-gray-100 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Task Image */}
            <img
              className="w-full h-40 object-cover rounded-t-xl"
              src={
                item.taskImage ||
                "https://i.ibb.co.com/8s649yw/1-c-GLDPw-Rw7-ZX4-0-I3-F3nt-A.webp"
              }
              alt={`${item.taskName} Image`}
            />

            <div className="p-4 space-y-2 text-sm lg:text-base">
              <h5 className="text-lg lg:text-xl font-semibold text-gray-800 truncate">
                {item.taskName}
              </h5>
              <p className="text-gray-600">
                <span className="font-medium">Buyer:</span> {item.taskowner}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Completion Date:</span>{" "}
                {item.taskDate}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Required Workers:</span>{" "}
                {item.requiredWorkers}
              </p>
              <p className="text-gray-900 font-bold text-lg">
                ${item.payableAmount}
              </p>

              <button
                onClick={() =>
                  navigate(`/dashbord/taskdetails/${item._id}`)
                }
                className="w-full mt-3 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedTasks.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
